import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthPayload } from './auth.payload';
import {
  NotFoundException,
  UnAuthorizedException,
} from 'src/common/exceptions/http.exceptions';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from '../dto/login.request.dto';
import { isSamePassword } from 'src/common/utils';
import { AuthRepository } from '../repositories/auth.repository';
import { LoggedInResultDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<AuthPayload> {
    const isValidatedUser = await this.authRepository.findOne({
      email,
    });
    // inspect if user is exists or not.
    if (!isValidatedUser) {
      throw new NotFoundException();
    }
    // inspect if user's password is validated or not
    const isValidatedPassword = await isSamePassword(
      password,
      isValidatedUser.password,
    );
    if (!isValidatedPassword) {
      throw new UnAuthorizedException();
    }
    // return AuthPayload
    const { name } = isValidatedUser;
    return new AuthPayload(name, email);
  }

  public async login(dto: LoginRequestDto): Promise<LoggedInResultDto> {
    // validate
    const { email, password } = dto;
    const payload: AuthPayload = await this.validateUser(email, password);
    // create access-token
    const plainObjectFromPayload = payload.toJson();
    const accessToken = this.jwtService.sign(plainObjectFromPayload, {
      secret: this.configService.get<string>('security.jwt.secret'),
      expiresIn: this.configService.get<number>('security.jwt.expiresIn'),
    });
    // return logined information (using dto?)
    return {
      ...plainObjectFromPayload,
      accessToken,
    };
  }
}

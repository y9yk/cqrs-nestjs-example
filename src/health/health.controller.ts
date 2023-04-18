import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { Connection } from 'mongoose';

@ApiTags('Health Checking')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    // db
    private db: MongooseHealthIndicator,
    @InjectConnection('eventstore')
    private eventStoreConnection: Connection,
    @InjectConnection('service')
    private serviceConnection: Connection,
  ) {}

  @ApiOperation({ summary: '서비스 상태 확인' })
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.db.pingCheck('eventstore-db-connection', {
          connection: this.eventStoreConnection,
          timeout: 1500, // timeout 1500ms
        }),
      () =>
        this.db.pingCheck('service-db-connection', {
          connection: this.serviceConnection,
          timeout: 1500, // timeout 1500ms
        }),
    ]);
  }
}

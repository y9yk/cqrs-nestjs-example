import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return `Hello there! This project is event-sourcing-cqrs-nestjs-example.`;
  }
}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/auth.user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async findUsers() {
    return this.appService.findAll();
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.appService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: CreateUserDto) {
    return this.appService.login(loginDto);
  }
}

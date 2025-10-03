import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUser, RegisterUser } from './dto';


@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly authClient: ClientProxy,
  ) { }

  @Post('register-user')
  registerUser(@Body() dto: RegisterUser) {
    return this.authClient.send('register-user', dto);
  }

  @Post('login')
  login(@Body() dto: LoginUser) {
    return this.authClient.send('login-user', dto);
  }

  @Get('verify-user')
  verifyUser() {
    return this.authClient.send('validate-user', {});
  }


}

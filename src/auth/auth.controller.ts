import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';


@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly authClient: ClientProxy,
  ) { }

  @Post('register-user')
  registerUser() {
    return this.authClient.send('register-user', {});
  }

  @Post('login')
  login() {
    return this.authClient.send('login-user', {});
  }

  @Get('verify-user')
  verifyUser() {
    return this.authClient.send('validate-user', {});
  }


}

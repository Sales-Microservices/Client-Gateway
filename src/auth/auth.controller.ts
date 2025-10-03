import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUser, RegisterUser } from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decoratos';
import { CurrentUser } from './interfaces/currents-user.interface';


@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly authClient: ClientProxy,
  ) { }

  @Post('register-user')
  registerUser(@Body() dto: RegisterUser) {
    return this.authClient.send('register-user', dto).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  @Post('login')
  login(@Body() dto: LoginUser) {
    return this.authClient.send('login-user', dto).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }
  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(@User() user: CurrentUser, @Token() token: string) {


    // return this.authClient.send('auth.verify.user', {});
    return { user, token }
  }


}

import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/factories/publicRoute.factory';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('/auth/sign-in')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  async login(@Body() loginInput: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginInput.email,
      loginInput.password,
    );
    const payload = this.authService.login(user);
    return payload;
  }
}

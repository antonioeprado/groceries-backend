import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { HashService } from './hash.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException();
    const { password, ...result } = user;
    const isValid = await this.hashService.compareHash(pass, password);
    if (!isValid) throw new UnauthorizedException();
    return result;
  }

  login(user: Omit<User, 'password'>) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      name: user.name,
      id: user.id,
      profile_picture: user.picture,
      email: user.email,
      created_at: user.createdAt,
    };
  }
}

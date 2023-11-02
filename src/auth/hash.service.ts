import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }

  compareHash(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}

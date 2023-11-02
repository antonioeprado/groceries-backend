import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany({});
  }

  findAllByName(name: string) {
    return this.prisma.user.findMany({
      where: { name: { contains: name, mode: 'insensitive' } },
    });
  }

  findById(id: number) {
    return this.prisma.user.findFirstOrThrow({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prisma.user.findFirstOrThrow({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}

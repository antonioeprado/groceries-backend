import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/factories/publicRoute.factory';
import { HashService } from 'src/auth/hash.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
  ) {}

  @Public()
  @Post('sign-up')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await this.hashService.hashPassword(
        createUserDto.password,
      );
      const newUser = { ...createUserDto, password: hashedPassword };
      await this.usersService.create(newUser);
    } catch (error) {
      throw new ConflictException('User already exists.');
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/search')
  async findAllByName(@Query('user') user: string) {
    const result = await this.usersService.findAllByName(user);
    const usersArray = result.map((user) => {
      return {
        id: user.id,
        name: user.name,
        profile_picture: user.picture,
        email: user.email,
        created_at: user.createdAt,
      };
    });
    return usersArray;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findById(+id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(+id, updateUserDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.usersService.remove(+id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}

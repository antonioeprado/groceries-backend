import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { FamiliesService } from './families.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';

@Controller('families')
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}

  @Post()
  create(@Body() createFamilyDto: CreateFamilyDto) {
    return this.familiesService.create(createFamilyDto);
  }

  @Get()
  findAll() {
    return this.familiesService.findAll();
  }

  @Get('/user/:userId')
  async findAllUserFamilies(@Param('userId') userId: string) {
    const userFamilies = await this.familiesService.findAllByUserId(+userId);
    if (userFamilies.length === 0) throw new NotFoundException();
    return userFamilies;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userFamily = await this.familiesService.findOneByUserId(+id);
    if (!userFamily) throw new NotFoundException();
    return userFamily;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFamilyDto: UpdateFamilyDto) {
    return this.familiesService.update(+id, updateFamilyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familiesService.remove(+id);
  }
}

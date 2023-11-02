import { Injectable } from '@nestjs/common';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FamiliesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createFamilyDto: CreateFamilyDto) {
    return this.prisma.family.create({
      data: {
        ...createFamilyDto,
        Members: {
          create: { memberId: createFamilyDto.ownerId, pending: false },
        },
      },
    });
  }

  findAll() {
    return this.prisma.family.findMany();
  }

  findAllByUserId(memberId: number) {
    return this.prisma.family.findMany({
      where: { Members: { some: { AND: { memberId, pending: false } } } },
      select: { name: true, id: true, ownerId: true },
    });
  }

  findOne(id: number) {
    return this.prisma.family.findFirst({ where: { id } });
  }

  findOneByUserId(id: number) {
    return this.prisma.family.findUnique({ where: { ownerId: id } });
  }

  update(id: number, updateFamilyDto: UpdateFamilyDto) {
    return this.prisma.family.update({ where: { id }, data: updateFamilyDto });
  }

  remove(id: number) {
    return this.prisma.family.delete({ where: { id } });
  }
}

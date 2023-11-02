import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findAllByUserId(userId: number) {
    return this.prisma.product.findMany({
      where: { memberId: userId },
      include: {
        Member: {
          select: {
            Member: { select: { name: true } },
            Family: { select: { name: true, id: true } },
          },
        },
      },
    });
  }

  findAllByFamilyId(familyId: number) {
    return this.prisma.product.findMany({
      where: { familyId },
      include: {
        Member: {
          select: {
            Member: { select: { name: true } },
          },
        },
        List: {
          select: {
            Owner: { select: { Family: { select: { id: true, name: true } } } },
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.product.findFirst({ where: { id } });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}

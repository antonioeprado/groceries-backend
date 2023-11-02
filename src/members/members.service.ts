import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}
  create(createMemberDto: CreateMemberDto) {
    return this.prisma.member.create({
      data: { ...createMemberDto, pending: true },
    });
  }

  findAll() {
    return this.prisma.member.findMany();
  }

  findAllByFamilyId(familyId: number) {
    return this.prisma.member.findMany({
      where: {
        familyId,
        Member: { Member: { none: { pending: { equals: true } } } },
      },
      select: { Member: { select: { name: true, picture: true } } },
    });
  }

  findAllByMemberId(memberId: number) {
    return this.prisma.member.findMany({
      where: { AND: { memberId, pending: true } },
      select: {
        id: true,
        Family: {
          select: {
            name: true,
            Owner: { select: { name: true, picture: true } },
          },
        },
      },
    });
  }

  findOneByMemberId(memberId: number, familyId: number) {
    return this.prisma.member.findFirst({
      where: { AND: { memberId, familyId } },
    });
  }

  findOne(id: number) {
    return this.prisma.member.findFirst({ where: { id } });
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return this.prisma.member.update({ where: { id }, data: updateMemberDto });
  }

  remove(id: number) {
    return this.prisma.member.delete({ where: { id } });
  }
}

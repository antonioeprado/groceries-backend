import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Get('/family/:id')
  findAllFamilyMembers(@Param('id') id: string) {
    return this.membersService.findAllByFamilyId(+id);
  }

  @Get('/invite')
  findInvite(
    @Query('memberId') memberId: string,
    @Query('familyId') familyId: string,
  ) {
    return this.membersService.findOneByMemberId(+memberId, +familyId);
  }

  @Get('/invite/pending/:memberId')
  async findPendingInvites(@Param('memberId') memberId: string) {
    const result = await this.membersService.findAllByMemberId(+memberId);
    const invitesArray = result.map((invite) => {
      return {
        inviteId: invite.id,
        owner: invite.Family.Owner.name,
        ownerPicture: invite.Family.Owner.picture,
        familyName: invite.Family.name,
      };
    });

    return invitesArray;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilyDto } from './create-family.dto';

export class UpdateFamilyDto extends PartialType(CreateFamilyDto) {
  name?: string | undefined;
  protect?: boolean | undefined;
}

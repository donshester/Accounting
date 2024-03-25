import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly headId?: string;

  @IsString()
  readonly departmentInfo: string;

  @IsArray()
  @IsUUID(4, { each: true })
  readonly employeeIds: string[];
}

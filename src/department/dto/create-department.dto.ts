import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsString()
  readonly departmentInfo: string;
}

import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray, IsUUID, ArrayNotEmpty
} from "class-validator";

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly headId: string;

  @IsDate()
  readonly createdDate: Date;

  @IsString()
  readonly departmentInfo: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID(4, { each: true })
  readonly employeeIds: string[];
}

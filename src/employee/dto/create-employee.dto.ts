import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly surname: string;

  @IsNotEmpty()
  readonly post: string;

  @IsBoolean()
  readonly isHead: boolean;

  @IsNumber()
  readonly departmentId: number;
}

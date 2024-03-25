import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Matches(/^[a-zA-Z]+$/, { message: 'firstName must contain only letters' })
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Matches(/^[a-zA-Z]+$/, { message: 'surname must contain only letters' })
  readonly surname: string;

  @IsNotEmpty()
  @IsString()
  readonly post: string;

  @IsUUID(4)
  @IsOptional()
  readonly departmentId?: string;
}

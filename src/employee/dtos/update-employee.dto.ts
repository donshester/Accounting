import {
  Allow,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsUUID()
  @Allow()
  departmentId?: string | null;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly post?: string;
}

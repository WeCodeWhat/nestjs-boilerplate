import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DTOErrorMessage } from 'src/constants/dto-error-message';

export class CreateUserDto {
  @IsEmail(
    {
      ignore_max_length: true,
    },
    {
      message: DTOErrorMessage.emailFormat,
    },
  )
  readonly email: string;

  @IsString()
  @MinLength(5, {
    message: DTOErrorMessage.passwordMinLengthExceed,
  })
  @MaxLength(100, {
    message: DTOErrorMessage.passwordMaxLengthExceed,
  })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  readonly firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  readonly lastName: string;
}

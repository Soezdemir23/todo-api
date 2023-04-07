import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisteredUserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  // should have a regex to match at least one number, one uppercase, one lowercase
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, {
    message: 'Password too weak, choose a stronger one between 6-12 characters',
  })
  password: string;
}

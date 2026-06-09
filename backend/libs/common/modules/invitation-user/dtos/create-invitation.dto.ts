
import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { Role } from '@prisma/client';;

export class CreateUserInvitationDto {
  @IsEmail()
  email: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
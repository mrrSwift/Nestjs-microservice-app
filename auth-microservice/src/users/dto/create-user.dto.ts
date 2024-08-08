import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
export class CreateUserDTO {
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsStrongPassword({minLength:8,minNumbers:0,minLowercase:0,minSymbols:0,minUppercase:0},{message:'Short Password'})
    password:string;

    @IsNotEmpty()
    @IsString()
    fullName:string;
}

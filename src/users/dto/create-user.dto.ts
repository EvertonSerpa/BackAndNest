import { IsString, Length, IsEmail, IsNotEmpty, MaxLength, MinLength, } from "class-validator";
// DTO - DATA TRANSFER OBJECT
export class CreateUserDto {
    @IsString({ message: 'Informe um nome válido '})
    @MinLength(2, { message: 'Informe um valor maior que 2' })
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Informe um endereço de email valido ' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @Length(6, 32)
    @IsString({ message: 'Informe uma senha válida '})
    password: string;

    @Length(6, 32)
    @IsString({ message: 'Informe uma confirmação de uma  senha válida '})
    passwordConfirmation: string;
}

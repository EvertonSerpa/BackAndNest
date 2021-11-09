import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, AuthResponse } from './dto/login.dto';
// Quando é um decorator customizado importamos ele sem as chaves {}
import AuthUser from './auth-user.decorator';
import { User } from '.prisma/client';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  // Qualquer usuario pode tentar fazer login
  @Post('login')
  login(@Body() data: LoginDto): Promise<AuthResponse> {
    return this.service.login(data);
  }

  // Decoretor
  @Get('me')
    @UseGuards(AuthGuard())
  me(@AuthUser() user: User): User {
    return user;
  }
}

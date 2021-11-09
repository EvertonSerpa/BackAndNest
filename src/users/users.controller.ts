// É o ponto de entrada da tua aplicação, é onde tuas requisições entrão
import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { User } from '.prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserRole } from './enum/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';


@Controller('user')
export class UsersController {
  constructor(private service: UsersService) {}

  // [POST] criando a rota create-user
  // Qualquer usuario não logado pode criar um novo usuario no serviço
  @Post('register')
  createUser(@Body() data: CreateUserDto): Promise<User> {
    delete data.passwordConfirmation;
    return this.service.create(data, UserRole.USER);
  }

   // [POST] criando a rota create-admin
  // Apenas um admin logado pode criar outro usuario admin
  @Post('create-admin')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(),RolesGuard)
  createAdmin(@Body() data: CreateUserDto): Promise<User> {
    delete data.passwordConfirmation;
    return this.service.create(data, UserRole.ADMIN);
  }

  // [GET] criando a rota que procura por ID
  // Apenas um usuario comum logado pode buscar um outro usuario pelo ID
  @Get('find/:id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string): Promise<User> {
    return this.service.findOne(id);
  }

   // [GET] criando a rota que LISTA tudo
  @Get('find-all')
  @UseGuards(AuthGuard())
  findMany() {
      return this.service.findMany();
  }

  // [DELETE] criando a que exclui por ID
  // Um usuario admin logado pode deletar a conta de outro usuario
  @Delete('delete/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  deleteOne(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.deleteOne(id);
  }
}

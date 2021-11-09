import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client'; //PRISMA + O NOME DA TABELA AO LADO
import { PrismaService } from 'src/prisma.service'; //ENTRAR E SAIR DO BANCO
import { UserRole } from './enum/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async create(data: Prisma.UserCreateInput, role: UserRole): Promise<User> {
    const userExists = await this.db.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw new ConflictException('Email já está cadastrado');
    }

    const salt = 10;
    const hashePassword = await bcrypt.hash(data.password, salt);

    const user = await this.db.user.create({
      data: {
        ...data,
        role: role,
        password: hashePassword,
      },
    });

    delete user.password;
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('ID não encontrado na base de dados');
    }

    delete user.password;
    return user;
  }

  async findMany() {
    const user = await this.db.user.findMany();
    const newUser = user.map(({ password, ...resto }) => resto);
    return newUser;
  }

  async deleteOne(id: string): Promise<{ message: string }> {
    await this.db.user.delete({
      where: { id },
    });

    return {
      message: 'Item deletado com sucesso',
    };
  }
}

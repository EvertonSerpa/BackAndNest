
import { Body, Controller, Post, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { Movie } from '.prisma/client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';
import { UserRole } from 'src/users/enum/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from '@prisma/client';
import AuthUser from 'src/auth/auth-user.decorator';

@Controller('movies')
export class MoviesController {
  constructor(private service: MoviesService) {}

  // Um usuario admin logado pode criar um filme
  @Post('create')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  createMovie(@Body() data: CreateMovieDto): Promise<Movie> {
    return this.service.create(data);
  }
  
  //  Qualquer usuario logado pode listar os filmes
  @Get('find-all')
  @UseGuards(AuthGuard())
  findMany(): Promise<Movie[]> {
      return this.service.findMany();
  }

   //  Qualquer usuario logado pode listar o filme pelo seu ID
  @Get('find/:id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.service.findOne(id);
  }

  // Um usuario ADMIN logado pode deletar um filme
  @Delete('delete/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  deleteOne(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.deleteOne(id);
  }

  // Usuario logado pode curtir um filme
  @Get('like/:id')
  @UseGuards(AuthGuard())
  likeMovie(
    @AuthUser() user: User,
    @Param('id') movieId: string,
  ):Promise<User> {
    return null;
  }
}
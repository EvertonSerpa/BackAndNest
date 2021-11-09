// Usamos a strategy no pacote que foi instalado do password.
// Como vamos identificar o usuario dono do token. 
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; import { from } from 'rxjs';
import { jwtConstants } from './jwt.constants';


// extends erda tudo da class pai
// super está relacionado a acessar metodos e atributos do pai

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private db: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { email: string }) {
    const user = await this.db.user.findUnique({
      where: { email: payload.email },
    });
    return user;
  }
}




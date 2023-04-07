import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { jwtSecret } from 'environment_variables_for_jwt';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/User/Entity/user.entity';
import { Repository } from 'typeorm';

export class JwtCustomStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { username: string }) {
    const { username } = payload;
    const user = await this.repo.findOne({ where: { username } });
    // i will never get used to this. I always am never sure about the return value
    if (!user) throw new UnauthorizedException();
    return user;
  }
}

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/User/Entity/user.entity';
import { Repository } from 'typeorm';
import * as ag2 from 'argon2';
import { RegisteredUserDTO } from 'src/User/dto/user.dto';
import { UserLoginDTO } from './dto/userLogin.dto';

import * as cr from 'crypto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwt: JwtService,
  ) {}

  async registerUser(registeredUserDTO: RegisteredUserDTO) {
    const { username, password } = registeredUserDTO;
    // no need to additionally salt the password and set the saltLength
    // because argon2 does that for us with a saltLength of 16
    const hashed = await ag2.hash(password, {
      hashLength: 40,
      salt: cr.randomBytes(32),
    });
    const user = new UserEntity();
    user.username = username;
    user.passwordHashedSalted = hashed;

    // check if the username is already taken and throw an error if it is, else save the user
    try {
      const userExists = await this.userRepo.findOne({ where: { username } });
      if (userExists) {
        throw new BadRequestException(
          'User already exists. Please choose a different username',
        );
      }
      await this.userRepo.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong while registering the user',
      );
    }
  }
  // try to be vague about the error message to prevent brute force attacks
  async loginUser(userLoginDTO: UserLoginDTO) {
    const { username, password } = userLoginDTO;
    try {
      const user = await this.userRepo.findOne({ where: { username } });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials!');
      }

      const isMatch = await ag2.verify(user.passwordHashedSalted, password);
      // always the same with the ambigious !isMatch. Never really works when you need it to.
      if (isMatch === false) {
        throw new UnauthorizedException('Invalid credentials!');
      }
      const jwtPayload = { username };
      const jwtToken = await this.jwt.signAsync(jwtPayload, {
        expiresIn: '1d',
        algorithm: 'HS512',
      });
      // this returns the token to the user, I pasted it into jwt.io and it works!
      return { token: jwtToken };
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong while logging in',
      );
    }
  }

  async getUsers() {
    return this.userRepo.find();
  }
}

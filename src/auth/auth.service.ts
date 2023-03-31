import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/User/Entity/user.entity';
import { Repository } from 'typeorm';
import * as ag2 from 'argon2';
import { RegisteredUserDTO } from 'src/User/dto/user.dto';
import { UserLoginDTO } from './dto/userLogin.dto';

import * as cr from 'crypto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
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

    try {
      return await this.userRepo.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        "Something went wrong, user wasn't created!",
      );
    }
  }

  async loginUser(userLoginDTO: UserLoginDTO) {
    console.log(userLoginDTO);
    return userLoginDTO;
  }
}

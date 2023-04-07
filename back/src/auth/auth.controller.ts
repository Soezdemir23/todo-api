import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { RegisteredUserDTO } from 'src/User/dto/user.dto';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto/userLogin.dto';
// http://localhost:3000/api/auth
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // test to see how many users are in the database
  @Get('users')
  getUsers() {
    return this.authService.getUsers();
  }

  @Post('register')
  registration(@Body(ValidationPipe) reqDTO: RegisteredUserDTO) {
    return this.authService.registerUser(reqDTO);
  }

  @Post('login')
  sigin(@Body(ValidationPipe) loginDTO: UserLoginDTO) {
    return this.authService.loginUser(loginDTO);
  }
}

import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RegisteredUserDTO } from 'src/User/dto/user.dto';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto/userLogin.dto';
// http://localhost:3000/api/auth
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  registration(@Body(ValidationPipe) reqDTO: RegisteredUserDTO) {
    return this.authService.registerUser(reqDTO);
  }

  @Post('login')
  sigin(@Body(ValidationPipe) loginDTO: UserLoginDTO) {
    return this.authService.loginUser(loginDTO);
  }
}

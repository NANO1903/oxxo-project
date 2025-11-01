import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiAuth()
@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    example: {
      userEmail: "user@email.com",
      userPassword: "userPassword",
      userRoles: ["EMPLOYEE"]
    } as CreateUserDto
  })
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }
  
  @ApiResponse({
    status: 201,
    example: {
      userEmail: "user@email.com",
      userPassword: "userPassword"
    } as LoginUserDto
  })
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }
  
  @ApiResponse({
    status: 201,
    example: {
      userEmail: "user@email.com",
      userPassword: "userPassword",
      userRoles: ["EMPLOYEE"]
    } as UpdateUserDto
  })
  @Patch('/:email')
  updateUser(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(email, updateUserDto);
  }
}

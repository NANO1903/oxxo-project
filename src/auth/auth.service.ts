import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';
import * as bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  registerUser(createUserDto: CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    return this.userRepository.save(createUserDto);
  }

  async loginUser(createUserDto: CreateUserDto){
    const user = await this.userRepository.findOne({
      where: {
        userEmail: createUserDto.userEmail
      }
    });

    if (!user) throw new NotFoundException('User not found');

    const match = await bcrypt.compare(createUserDto.userPassword, user.userPassword);
    if(!match) throw new UnauthorizedException("No estás autorizado para esta operación");
    const token = jwt.sign(JSON.stringify(user), "SECRET KEY");
    return token;
  }
}

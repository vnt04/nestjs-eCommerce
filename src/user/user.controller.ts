import { UserService } from './user.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from 'src/database/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers(): Promise<{ numberOfUsers: number; listUsers: User[] }> {
    return this.userService.getAllUsers();
  }

  @Post()
  register(@Body() body: CreateUserDTO): Promise<User> {
    const { name, email, password } = body;
    return this.userService.create(name, email, password);
  }

  @Get(':id')
  getUserById(@Param('id') id: number): Promise<User | null> {
    return this.userService.getUserById(id);
  }
}

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // GET - Get all users
  async getAllUsers(): Promise<{ numberOfUsers: number; listUsers: User[] }> {
    try {
      const listUsers = await this.userRepository.find();
      return {
        numberOfUsers: listUsers.length,
        listUsers,
      };
    } catch (error) {
      console.log('Error getting users:', error);
      throw new HttpException('Failed to get users.', HttpStatus.NOT_FOUND);
    }
  }

  // POST - Create user
  async create(name: string, email: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.save({
        name,
        email,
        password,
      });
      return user;
    } catch (error) {
      console.log('Error creating user:', error);
      throw new HttpException('Failed to create user.', HttpStatus.BAD_REQUEST);
    }
  }

  // GET - Get user by Id
  async getUserById(id: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!user) {
        throw new NotFoundException(`User with ID: ${id} does not found.`);
      }
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

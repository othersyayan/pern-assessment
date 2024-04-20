import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dtos/auth.user.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findAll() {
    const users = await this.em.findAll(User);
    return users;
  }

  async register(createUserDto: CreateUserDto) {
    const duplicateUser = await this.em.findOne(User, {
      username: createUserDto.username,
    });

    if (duplicateUser) {
      throw new UnauthorizedException('Please use another username!');
    }

    const userCreated = this.em.create(User, {
      username: createUserDto.username,
      password: await bcrypt.hash(createUserDto.password, 12),
    });

    await this.em.persistAndFlush(userCreated);

    return userCreated;
  }

  async login(loginDto: CreateUserDto) {
    const user = await this.em.findOne(User, { username: loginDto.username });
    if (!user) {
      throw new UnauthorizedException('User not found!');
    }

    const passwordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      userId: user.uuid,
      username: user.username,
    });
    return { token };
  }
}

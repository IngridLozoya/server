import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './users/user.entity';

@Module({
  providers: [UsersService],
  controllers:[
    UsersController
  ],
  imports:[
    TypeOrmModule.forFeature([UserEntity])
  ]
})
export class UsersModule {}

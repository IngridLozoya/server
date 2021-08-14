import { Body, Controller,Delete,Get, HttpStatus, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { customName } from 'src/custoName';
import { UsersService } from './users.service';
import { UserEntity } from './users/user.entity';

@Controller('users')
export class UsersController {

    constructor(private service:UsersService){

    }

@Get()
getAllUsers(){
    return this.service.getAllUsers();
}

@Get('.id')
getUser(@Param()params){
    return this.service.getUser(params.id);

}

@Post()
addUser(@Body()user:UserEntity){
    return this.service.createUser(user);
}

@Post('udpload')
@UseInterceptors(
    FileInterceptor('image',{
        storage:diskStorage({
            destination:'./avatars',
            filename:customName
        })
    })
)
async uploadFile(@Body()user:UserEntity,@UploadedFile()file){

    await this.service.createUser(JSON.parse(JSON.stringify(user)));

    const response={
        originalName:file.originalName,
        finalName:file.filename
    }
    return{
        status:HttpStatus.OK,
        message:"image has been uploaded",
        data:response
    }
}

@Put()
updateUser(@Body()user:UserEntity){
    this.service.updateUser(user);
}

@Delete('.id')
deleteUser(@Param()params){
    this.service.deleteUser(params.id);
}



}



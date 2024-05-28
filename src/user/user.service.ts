import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
    constructor() {}

    login(body: LoginDto){
        console.log(body);
        const isSuccess = true;
        //todo: check account on db, -> email, password ....
        if(isSuccess)
            return {
                status: 'success',
                token: 'ABCkjgtyyty'
            };
        // not found
        throw new NotFoundException(`Email doesn't exists`);
    }
}

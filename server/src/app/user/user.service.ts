import { Inject, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CONNECTION } from '../../public/tenancy/tenancy.provider';
import { UserDto } from './dto/user.dto';
@Injectable()
export class UserService {
  // constructor(@InjectRepository(User) private _userRepository: Repository<User>) { }

  private readonly _userRepository: Repository<User>;

constructor (
  @Inject(CONNECTION) connection: Connection,
) {
  this._userRepository = connection.getRepository(User);
}

  getAll(): Promise<User[]> {
    return this._userRepository.find({
    });
  }

  async getById(id: number): Promise<User> {
    try {
    const user = await this._userRepository.findOneOrFail({
      where: { id },
    });
    return user
    } catch (error) {
      console.log(error);
    }
  }

   create(userDto : User){
    const user = new User();
    user.name = userDto.name;
    user.email = userDto.email;
    user.phoneNumber = userDto.phoneNumber;
    // const result = await this._userRepository.create(user);
    return this._userRepository.save(user);
  }

  editAccount(UserAccount : UserDto){
    
  }
}


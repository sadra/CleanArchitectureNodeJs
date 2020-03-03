import UserDto from '../Dto/User.dto';
import ISigninUseCase from './ISignin.usecase';
import IUserReadOnlyRepository from '../repositories/IUserReadOnly.repository';
import User from '@pbb/domain/User';

export default class SigninUseCase implements ISigninUseCase {
  private userReadOnlyRepository: IUserReadOnlyRepository;

  constructor(userReadOnlyRepository: IUserReadOnlyRepository) {
    this.userReadOnlyRepository = userReadOnlyRepository;
  }

  public async signin(userDto: UserDto): Promise<UserDto> {
    let user = new User(
      userDto.id,
      userDto.name,
      userDto.email,
      userDto.password,
      userDto.type
    );
    return await this.userReadOnlyRepository.fetch(user);
  }
}

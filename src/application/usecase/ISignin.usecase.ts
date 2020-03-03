import UserDto from '../Dto/User.dto';

export default interface ISigninUseCase {
  signin(userDto: UserDto): Promise<UserDto>;
}

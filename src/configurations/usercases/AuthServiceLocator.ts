import SigninUseCase from '@pbb/application/usecase/Signin.usecase';
import { inject, injectable } from 'inversify';
import { TYPES } from '@pbb/constants/Types';
import IUserReadOnlyRepository from '@pbb/application/repositories/IUserReadOnly.repository';

@injectable()
export default class AuthServiceLocator {
  constructor(
    @inject(TYPES.IUserReadOnlyRepository)
    private userReadOnlyRepository: IUserReadOnlyRepository
  ) {}

  public getSigningUseCase() {
    return new SigninUseCase(this.userReadOnlyRepository);
  }
}

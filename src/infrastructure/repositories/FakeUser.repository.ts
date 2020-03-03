import IUserReadOnlyRepository from '@pbb/application/repositories/IUserReadOnly.repository';
import User from '@pbb/domain/User';
import { injectable } from 'inversify';

@injectable()
export default class FakeUserRepository implements IUserReadOnlyRepository {
  fetch(user: User): Promise<User> {
    return null;
  }
}

import {
  interfaces,
  controller,
  httpPost,
  request,
  response
} from 'inversify-express-utils';
import ISigninUseCase from '@pbb/application/usecase/ISignin.usecase';
import { inject } from 'inversify';
import { TYPES } from '@pbb/constants/Types';
import AuthServiceLocator from '@pbb/configurations/usercases/AuthServiceLocator';
import * as express from 'express';
import UserDto from '@pbb/application/Dto/User.dto';

@controller('/auth')
export default class AuthController implements interfaces.Controller {
  private readonly ISigninUseCase: ISigninUseCase;

  constructor(
    @inject(TYPES.AuthServiceLocator)
    private authServiceLocator: AuthServiceLocator
  ) {
    this.ISigninUseCase = authServiceLocator.getSigningUseCase();
  }

  @httpPost('/signin')
  public async signin(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const userDto: UserDto = req.body;
    return this.ISigninUseCase.signin(userDto)
      .then((foundUserDto: UserDto) => res.status(200).json(foundUserDto))
      .catch(error => res.status(400).json({ error: error.message }));
  }
}

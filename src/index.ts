import 'reflect-metadata';
import { Container } from 'inversify';
import AuthServiceLocator from './configurations/usercases/AuthServiceLocator';
import { TYPES } from './constants/Types';
import IUserReadOnlyRepository from './application/repositories/IUserReadOnly.repository';
import FakeUserRepository from './infrastructure/repositories/FakeUser.repository';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as express from 'express';
import * as bodyParser from 'body-parser';

const container = new Container();

container
  .bind<AuthServiceLocator>(TYPES.AuthServiceLocator)
  .to(AuthServiceLocator);
container
  .bind<IUserReadOnlyRepository>(TYPES.IUserReadOnlyRepository)
  .to(FakeUserRepository);

const server = new InversifyExpressServer(container);
server.setConfig((application: express.Application) => {
  application.use(bodyParser.urlencoded({ extended: true }));
  application.use(bodyParser.json());
});

const app = server.build();

const port = 5000 || process.env.PORT;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

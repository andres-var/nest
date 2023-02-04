import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UsersServiceMock } from './mocks/users.service.mock';
import { userFindOneStub } from './stubs';
import { UsersController } from '../users.controller';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useFactory: UsersServiceMock,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('Find One User', () => {
    it('user found by id', async () => {
      const user = await usersController.findOne('63ae58e65e64ede680c94b99');

      expect(user).toEqual({ ...userFindOneStub });
    });

    it('user not found by id', async () => {
      const user = await usersController.findOne('2');

      expect(user).not.toEqual({ ...userFindOneStub });
    });
  });

  //   describe('Create User', () => {
  //     it('create', async () => {
  //       const user = await usersController.create();

  //       expect(user).toEqual({ ...userFindOneStub });
  //     });

  //     it('not create ', async () => {
  //       const user = await usersController.findOne('63ae58e65e64ede680c94b98');

  //       expect(user).not.toEqual({ ...userFindOneStub });
  //     });
  //   });
});

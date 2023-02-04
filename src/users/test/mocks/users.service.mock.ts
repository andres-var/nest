import { Role } from 'src/users/constants/role.enum';
import { userFindOneStub } from '../stubs/users-find-one.stub';
import { User } from 'src/users/entities/user.entity';

export const UsersServiceMock = jest.fn(() => ({
  create: jest.fn(() => ({ ...userFindOneStub })),

  update: jest.fn(() => ({ ...userFindOneStub })),

  remove: jest.fn(() => ({ ...userFindOneStub })),

  findOne: jest.fn((id: string) => {
    const user: Partial<User> = {
      _id: id as any,
      email: 'test@exmaple.com',
      alias: '@test',
      isActive: true,
      lastName: 'unknown',
      name: 'test',
      phone: '33-00-00-00-00',
      roles: [Role.ADMINISTRATOR],
    };

    return user;
  }),

  findAll: jest.fn(() => [userFindOneStub]),

  findOneByEmail: jest.fn((email: string) => {
    const user: Partial<User> = {
      _id: '63ae58e65e64ede680c94b99' as any,
      email: email,
      alias: '@test',
      isActive: true,
      lastName: 'unknown',
      name: 'test',
      phone: '33-00-00-00-00',
      roles: [Role.ADMINISTRATOR],
    };

    return user;
  }),
}));

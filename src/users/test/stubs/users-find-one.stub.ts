import { Role } from 'src/users/constants/role.enum';
import { User } from 'src/users/entities/user.entity';

export const userFindOneStub: Partial<User> = {
  _id: '63ae58e65e64ede680c94b99' as any,
  email: 'test@exmaple.com',
  alias: '@test',
  isActive: true,
  lastName: 'unknown',
  name: 'test',
  phone: '33-00-00-00-00',
  roles: [Role.ADMINISTRATOR],
};

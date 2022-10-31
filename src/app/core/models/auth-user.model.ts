import { DataType } from './data-type.model';
import { Roles } from './roles.model';

export interface AuthUser extends DataType {
  email: string;
  roles: Roles;
}

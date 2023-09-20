import { User } from "./user";
import { UserService } from "./user.service";

export class UserController {
  constructor(private userService: UserService) {}

  add(username: string): User {
    if (!(username.trim() !== "" && username.trim().length > 15)) {
    }

    return this.userService.add(username.trim());
  }

  getById(id: number): User | null {
    // is the id a decimal ?
    // is the id a negative number ?
    // other checks...
    return this.userService.getById(id);
  }
}

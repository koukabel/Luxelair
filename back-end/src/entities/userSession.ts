import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { randomBytes } from "crypto";

import User from "./user";

@Entity()
class UserSession extends BaseEntity {
  @PrimaryColumn({ length: 32 })
  id!: string;

  @ManyToOne(() => User, (user) => user.sessions)
  user!: User;

  constructor(user?: User) {
    super();

    if (user) {
      this.id = randomBytes(16).toString("hex");
      this.user = user;
    }
  }

  static async saveNewSession(user: User): Promise<UserSession> {
    const newSession = new UserSession(user);
    const savedSession = await newSession.save();
    return savedSession;
  }

  static async getSessionById(id: string): Promise<UserSession> {
    const userSession = await UserSession.findOneBy({ id: id });
    if (!userSession) {
      throw new Error("UserSession does not exist");
    }
    return userSession;
  }
}

export default UserSession;

import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { editOrCreateUser, signIn } from "../resolvers/UserResolver";
import Booking from "./booking";
import { compare, hash } from "bcrypt";
import UserSession from "./userSession";

@Entity("user")
@ObjectType()
class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  firstName!: string;

  @Column()
  @Field()
  lastName!: string;

  @Column({ unique: true })
  @Field()
  email!: string;

  // @Column()
  // role!: string;

  @Column()
  hashedPassword!: string;

  @Column({ nullable: true, default: "" })
  @Field()
  phoneNumber?: string;

  @Column({ nullable: true, default: "" })
  @Field()
  location?: string;

  @Column({ nullable: true, default: "" })
  @Field()
  city?: string;

  @Column({ nullable: true, default: "" })
  @Field()
  description?: string;

  @OneToMany(() => UserSession, (session) => session.user)
  sessions!: UserSession[];

  @ManyToMany(() => Booking, (booking) => booking.users)
  @JoinTable()
  bookings!: Booking[];

  constructor(user?: editOrCreateUser) {
    super();
    if (user) {
      this.email = user.email;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.hashedPassword = user.password;
    }
  }

  static async getUsers(): Promise<User[]> {
    const users = await User.find();
    return users;
  }

  static async createNewUser(userInfo: editOrCreateUser): Promise<User> {
    userInfo.password = await hash(userInfo.password, 8);

    const newUser = new User(userInfo);
    const savedUser = await newUser.save();
    return savedUser;
  }

  static async editUserInfo(
    id: string,
    { password, ...userInfo }: editOrCreateUser
  ): Promise<User> {
    const userToUpdate = await User.findOneBy({ id: id });
    if (!userToUpdate) {
      throw new Error("User does not exist");
    }
    await User.update(id, {
      hashedPassword: await hash(password, 8),
      ...userInfo,
    });
    await userToUpdate?.reload();
    return userToUpdate;
  }

  static async getUser({ email, password }: signIn): Promise<User> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }
    const isMatch = await compare(password, user.hashedPassword);
    if (!isMatch) {
      throw new Error("INVALID_CREDENTIALS");
    }
    return user;
  }

  static async login({
    email,
    password,
  }: signIn): Promise<{ user: User; session: UserSession }> {
    const user = await this.getUser({ email, password });
    const session = await UserSession.saveNewSession(user);
    return { user, session };
  }

  static async getUserWithSessionId(sessionId: string): Promise<User | null> {
    const session = await UserSession.findOne({
      where: { id: sessionId },
      relations: { user: true },
    });
    if (!session) {
      return null;
    }
    return session.user;
  }

  static async getUserById(id: string): Promise<User> {
    const user = await User.findOneBy({ id: id });
    if (!user) {
      throw new Error("User does not exist");
    }
    return user;
  }
}

export default User;

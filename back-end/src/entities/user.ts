import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  In,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CreateUser, UpdateUser, signIn } from "../resolvers/UserResolver";
import Booking from "./booking";
import { compare, hash } from "bcrypt";
import UserSession from "./userSession";
import Ad from "./ad";
import Payment from "./payment";

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
  @Field()
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

  @JoinTable()
  @ManyToMany(() => Booking, (booking) => booking.users, { eager: true })
  @Field(() => [Booking])
  bookings!: Booking[];

  @OneToMany(() => Ad, (ad) => ad.user)
  @Field(() => [Ad])
  ads!: Ad[];

  @OneToOne(() => Payment, payment => payment.user)
  @Field(() => Payment)
  payment!: Payment;
}
  
  constructor(user?: CreateUser) {
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

  static async createNewUser(userInfo: CreateUser): Promise<User> {
    userInfo.password = await hash(userInfo.password, 10);

    const newUser = new User(userInfo);
    const savedUser = await newUser.save();
    return savedUser;
  }

  static async editUserInfo(
    id: string,
    { ...userInfo }: UpdateUser
  ): Promise<User> {
    const userToUpdate = await User.findOneBy({ id: id });
    if (!userToUpdate) {
      throw new Error("User does not exist");
    }
    await User.update(id, userInfo);
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

  static async getBookingsByUser(userId: string): Promise<Booking[]> {
    const user = await User.findOneBy({ id: userId });
    if (!user) {
      throw new Error("User does not exist");
    }

    const bookings = await Booking.find({
      where: { users: user },
      relations: ["ad"],
    });

    return bookings;
  }

  static async getAdsByUser(userId: string): Promise<Ad[]> {
    const user = await User.findOneBy({ id: userId });
    if (!user) {
      throw new Error("User does not exist");
    }

    const ads = await Ad.find({ where: { user: user } });
    return ads;
  }
}

export default User;

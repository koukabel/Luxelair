import { Field, ID, ObjectType} from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { editOrCreateUser } from "../resolvers/UserResolver";
import { hash } from "bcrypt";
import Booking from "./booking";


@Entity('user') 
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

   @ManyToMany(() => Booking, booking => booking.users)
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


        static async editUserInfo(id: string, userInfo: editOrCreateUser) : Promise<User> { 
          const userToUpdate = await User.findOneBy({id: id})
          if (!userToUpdate) {
              throw new Error('User does not exist');
          }
          await User.update(id, userInfo);
          await userToUpdate?.reload();
          return userToUpdate;
        }
    }; 


export default User;



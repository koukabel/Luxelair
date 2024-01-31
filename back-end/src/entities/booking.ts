import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import Ad  from "./ad";
import User from "./user";

@Entity()
@ObjectType()
class Booking extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    @Field(() => ID)
    id!: string;

    @Column()
    @Field()
    checkinDate!: Date;

    @Column()
    @Field()
    checkoutDate!: Date;

    @Column()
    @Field()
    price!: number;

    // Voir après pour mettre un enum pour mettre plusieurs status
    @Column({default: false})
    @Field()
    status!: boolean;

    @Column({default: new Date})
    @Field()
    datePayment!: Date;

    @Column({default: false })
    @Field()
    statusPayment!: boolean;

    @ManyToMany(() => Ad, (ad) => ad.bookings)
    ads!: Ad[];
    
    @ManyToMany(() => User, (user) => user.bookings)
    users!: User[];
    static checkinDate: Date | number; 
    static checkoutDate: Date | number;
    
    constructor(booking?: Partial<Booking>) {
        super();
        if (booking) {
            if (!booking.checkinDate) {
                throw new Error('La date de départ est obligatoire')
            }
            this.checkinDate = booking.checkinDate;
            if (!booking.checkoutDate) {
                throw new Error('La date d\'arrivée est obligatoire')
            }
            this.checkoutDate = booking.checkoutDate
            if (!booking.price) {
                throw new Error('Le prix est obligatoire')
            }
        }

        
    }



    // static async getBookingsByUser(): Promise<Booking[]> {
    //     const bookings = await Booking.find()
    //     return bookings;
    // }

    // static async saveNewBooking(): Promise<Booking[]> {

    // }
// Méthode qui calcule la différence en jours entre deux dates et multiplie par le prix
static async totalPrice(): Promise<void> {
	const dateCheckin = new Date("2024-01-31").getTime();
	const dateCheckout = new Date("2024-02-02").getTime();
  
    const prixParjour = 1000;

	const differenceEnMillisecondes = dateCheckout - dateCheckin;

	const differenceEnJours = differenceEnMillisecondes / (24 * 60 * 60 * 1000);

	const prixTotal = differenceEnJours * prixParjour;

	console.log(Math.round(prixTotal * 100) / 100);
    console.log("hi")
}

    // static async totalPrice(): Promise<void> {
    //     const dateCheckin = new Date(checkin).getTime();
	//     const dateCheckout = new Date(checkout).getTime();

	//     const differenceEnMillisecondes = dateCheckout - dateCheckin;
	//     const differenceEnJours = differenceEnMillisecondes / (24 * 60 * 60 * 1000);

	// const prixTotal = differenceEnJours * prixParJour;

	// return Math.round(prixTotal * 100) / 100;
        
    
}

export default Booking; 
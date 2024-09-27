import { ObjectType, Field, ID, Float } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Like,
  ILike,
  ManyToOne,
} from "typeorm";
import { editOrCreateAd } from "../resolvers/AdResolver";
import Booking from "./booking";
import { Between } from "typeorm";
import User from "./user";
import { getCache } from "../cache";

export enum HousingTypeEnum {
  Chalet = "Chalet",
  Appartement = "Appartement",
  Maison = "Maison",
  Chateau = "Chateau",
  Bateau = "Bateau",
  Tour = "Tour",
  Duplex = "Duplex",
  Studio = "Studio",        
  Loft = "Loft",           
  Villa = "Villa",          
  Penthouse = "Penthouse",  
  Yourte = "Yourte",        
  Igloo = "Igloo",          
  Riad = "Riad"          
}


export enum EquipmentTypeEnum {
  Climatisation = "Climatisation",
  Pool = "Piscine",
  Parking = "Parking",
  Balcon = "Balcon",
  Jacuzzi = "Jacuzzi",
  Rooftop = "Rooftop",
  Sauna = 'Sauna',
  Hammam = "Hammam",
  Domotique = "Domotique",
  Ascenseur = "Ascenseur",
  Gym = 'Gym',
  Cheminee = "Cheminee", 
  Veranda="Veranda"
}

@Entity()
@ObjectType()
class Ad extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  title!: string;

  @Column()
  @Field()
  description!: string;

  @Column()
  @Field(() => Float)
  price!: number;

  @Column()
  @Field()
  location!: string;

  @Column({ default: "" })
  @Field()
  image!: string;

  @Column("simple-array", { nullable: true }) //  "simple-array" is a type for string arrays
  @Field(() => [String], { nullable: true }) // Return an array of strings
  equipements!: string[];

  @Column({
    type: "enum",
    enum: HousingTypeEnum,
    default: null,
  })
  @Field(() => HousingTypeEnum, { nullable: true })
  housingType!: HousingTypeEnum;

  @ManyToOne(() => User, (user) => user.ads)
  @Field(() => User)
  user!: User;

  @ManyToOne(() => Booking, (booking) => booking.ad)
  @Field(() => [Booking])
  bookings!: Booking[];

  constructor(ad?: Partial<Ad>) {
    super();
    if (ad) {
      if (!ad.title) {
        throw new Error("Le titre ne peut pas être vide");
      }
      this.title = ad.title;
      if (!ad.description) {
        throw new Error("La description ne peut pas être vide");
      }
      this.description = ad.description;
      if (!ad.price) {
        throw new Error("Le prix ne peut pas être vide");
      }
      this.price = ad.price;

      if (!ad.location) {
        throw new Error("L'adresse ne peut pas être vide");
      }
      this.location = ad.location;

      if (ad.image !== undefined) {
        this.image = ad.image;
      }

      if (ad.equipements === undefined || ad.equipements.length === 0) {
        throw new Error(
          "Les équipements sélectionnés ne peuvent pas être vides"
        );
      }
      this.equipements = ad.equipements;

      if (!ad.housingType) {
        throw new Error("Le type ne peut pas être vide");
      }
      this.housingType = ad.housingType;
    }
  }

  static async getAds(): Promise<Ad[]> {
    const ads = await Ad.find({ relations: ["user"] });
    return ads;
  }

  static async getAdById(id: string): Promise<Ad> {
    const ad = await Ad.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!ad) {
      throw new Error("Ad does not exist ");
    }
    return ad;
  }

  static async searchAd(location: string): Promise<Ad[]> {
    const cache = await getCache();
    const cachedResult = await cache.get(location);
    if (cachedResult) {
      return JSON.parse(cachedResult);
    }
    const adLocation = await Ad.find({
      where: { location: ILike(`%${location}%`) },
      relations: ["user"],
    });
    if (adLocation.length === 0) {
      throw new Error("Location does not exist");
    }
    cache.set(location, JSON.stringify(adLocation));
    return adLocation;
  }

  static async filterAdByType(housingType: HousingTypeEnum): Promise<Ad[]> {
    const searchHouseType = await Ad.find({
      where: { housingType },
    });

    if (searchHouseType.length === 0) {
      throw new Error("Ad does not exist");
    }
    return searchHouseType || [];
  }

  static async filterAdByPrice(
    minimum: number,
    maximum: number
  ): Promise<Ad[]> {
    const searchPrice = await Ad.find({
      where: {
        price: Between(minimum, maximum),
      },
    });

    if (searchPrice.length === 0) {
      throw new Error("No ads found within the given price range");
    }
    return searchPrice;
  }

  static async filterAdByEquipments(equip: string): Promise<Ad[]> {
    let searchResult: Ad[] = await Ad.find({
      where: {
        equipements: Like(`%${equip}%`),
      },
    });

    if (searchResult.length === 0) {
      throw new Error("No ads found with the given equipment");
    }
    return searchResult;
  }

  static async createAd(adInformations: editOrCreateAd): Promise<Ad> {
    const newAd = new Ad(adInformations);
    const user = await User.getUserById(adInformations.userId);
    const newRole = "Host";
    if (!user.roles.includes(newRole)) {
      user.roles.push(newRole);
      await User.save(user);
    }
    newAd.user = user;
    const savedAd = await newAd.save();
    return savedAd;
  }

  static async updateAd(
    id: string,
    adInformations: editOrCreateAd
  ): Promise<Ad> {
    const adToUpdate = await Ad.getAdById(id);
    if (!adToUpdate) {
      throw new Error("Ad does not exist");
    }
    Object.assign(adToUpdate, adInformations);

    if (adInformations.userId) {
      adToUpdate.user = await User.getUserById(adInformations.userId);
    }
    await adToUpdate.save();
    adToUpdate.reload();
    return adToUpdate;
  }

  static async deleteAd(id: string): Promise<void> {
    const ad = await Ad.getAdById(id);
    if (!ad) {
      throw new Error("Ad does not exist");
    }
    await Ad.delete(id);
  }
}

export default Ad;

import { ObjectType, Field, ID, Float } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  Like,
  ILike,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { editOrCreateAd } from "../resolvers/AdResolver";
import Booking from "./booking";
import { Between, In } from "typeorm";
import User from "./user";

export enum HousingTypeEnum {
  Chalet = "Chalet",
  Appartement = "Appartement",
  Maison = "Maison",
  Hotel_particulier = "Hôtel particulier",
  Chateau = "Chateau",
  Logement_sur_l_eau = "Logement sur l'eau",
  Bateau = "Bateau",
  Tour = "Tour",
  Duplex = "Duplex",
}

export enum EquipmentTypeEnum {
  Ustensiles = "Ustensiles",
  Vaisselle = "Couverts_et_verres",
  Micro_ondes = "Micro_ondes",
  Refrigerateur = "Refrigerateur",
  Cuisiniere = "Cuisiniere",
  Bouilloire = "Bouilloire",
  Cafetiere = "Cafetiere",
  Grille_pain = "Grille_pain",
  Literie = "Literie",
  Serviettes_de_bain = "Serviettes_de_bain",
  Papier_toilette = "Papier_toilette",
  Savon = "Savon",
  Shampooing = "Shampooing",
  Seche_cheveux = "Seche_cheveux",
  Lave_linge = "Lave_linge",
  Seche_linge = "Seche_linge ",
  Detecteurs_fumee_monoxyde = "Detecteur_de_fumee_et_de_monoxyde_de_carbone",
  Extincteur = "Extincteur",
  Television = "Television",
  WiFi = "WiFi",
  Climatisation = "Climatisation",
  Chauffage = "Chauffage",
  Fer_planche_a_repasser = "Fer_et_place_a_repasser",
  Canapes = "Canapes",
  Fauteuils = "Fauteuils",
  Tables = "Tables_et_chaises",
  Espace_travail = "Espace_de_travail",
  Placards = "Placards",
  Pool = "Piscine",
  Parking = "Parking",
  Ascenseur = "Ascenseur",
  Balcon = "Balcon",
  Jacuzzi = "Jacuzzi",
  Rooftop = "Rooftop",
  Piste_datterissage = "Piste_datterissage",
  Court_de_tennis = "Court_de_tennis",
  Chef_prive = "Chef_prive",
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

  @ManyToOne(() => User, (user) => user.ads, {
    eager: true,
  })
  @Field(() => User)
  user!: User;

  @OneToMany(() => Booking, (booking) => booking.ad)
  @Field(() => Booking)
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
    const ads = await Ad.find();
    return ads;
  }

  static async getAdById(id: string): Promise<Ad> {
    const ad = await Ad.findOneBy({ id: id });
    if (!ad) {
      throw new Error("Ad does not exist");
    }
    return ad;
  }

  static async searchAd(location: string): Promise<Ad[]> {
    const adLocation = await Ad.find({
      where: { location: ILike(`%${location}%`) },
    });
    if (adLocation.length === 0) {
      throw new Error("Location does not exist");
    }
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
    newAd.user = user;
    const savedAd = await newAd.save();
    return savedAd;
  }

  static async updateAd(id: string, adInformations: Ad): Promise<Ad> {
    const adToUpdate = await Ad.findOneBy({ id: id });
    if (!adToUpdate) {
      throw new Error("Ad does not exist");
    }
    await Ad.update(id, adInformations);
    await adToUpdate?.reload();
    return adToUpdate;
  }

  static async deleteAd(id: string): Promise<void> {
    const { affected } = await Ad.delete(id);
    if (affected === 0) {
      throw new Error(`Ad with ID ${id} does not exist.`);
    }
  }
}

export default Ad;

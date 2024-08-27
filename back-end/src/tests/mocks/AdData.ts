import Ad, { HousingTypeEnum } from "../../entities/ad";

export const createAds = async (userId: string) => {
  const ads = await Promise.all([
    Ad.createAd({
      title: "Chalet de montagne",
      description: "Magnifique chalet au cœur des Alpes",
      price: 200,
      location: "Annecy",
      equipements: ["WiFi", "Chauffage", "Piscine"],
      housingType: HousingTypeEnum.Chalet,
      image: "",
      userId: userId,
    }),
    Ad.createAd({
      title: "Appartement en ville",
      description: "Appartement moderne en centre-ville",
      price: 150,
      location: "Paris",
      equipements: ["WiFi", "Climatisation", "Parking"],
      housingType: HousingTypeEnum.Appartement,
      image: "",
      userId: userId,
    }),
    Ad.createAd({
      title: "Maison de campagne",
      description: "Belle maison dans la campagne française",
      price: 300,
      location: "Avignon",
      equipements: ["WiFi", "Jardin", "Piscine"],
      housingType: HousingTypeEnum.Maison,
      image: "",
      userId: userId,
    }),
  ]);

  return ads;
};

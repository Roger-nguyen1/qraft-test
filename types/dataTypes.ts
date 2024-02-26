type Availability = {
  maxDuration: number;
  maxDistance: number;
};

export type DataCarType = {
  id: number;
  pictureUrl: string;
  brand: string;
  model: string;
  pricePerDay: number;
  pricePerKm: number;
  availability: Availability;
};

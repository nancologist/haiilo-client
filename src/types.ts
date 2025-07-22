export type Offer = {
  quantity: number;
  price: number;
}

export type Item = {
  id: number;
  name: string;
  price: number;
  offer: Offer | null;
}

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

export type ItemScanEvent = {
  itemId: number;
  itemName: string;
}

export type OrderItem = {
  itemId: number;
  itemName: string;
  quantity: number;
}

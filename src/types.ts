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

export type ItemsFetchState = {
  items: Item[] | null
  loading: boolean;
  error: string | null;
}

export type PriceUpdateState = {
  succeeded: boolean,
  error: string | null;
}

export type CheckoutPostState = {
  sum: number | undefined;
  loading: boolean;
  error: string | null;
}

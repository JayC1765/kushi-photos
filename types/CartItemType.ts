export type CartItemType = {
  id: string | null;
  name: string;
  description: string | null;
  image: string;
  currency: string;
  unit_amount: number;
  quantity: number;
};

export type CartItemBareType = {
  name: string;
  unit_amount: number;
  quantity: number;
};

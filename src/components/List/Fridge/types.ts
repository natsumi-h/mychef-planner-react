export type FridgeItems = FridgeItemType[] | [];

export type FridgeItemType = {
  id: string;
  fields: FridgeItemFields;
};

export type FridgeItemFields = {
  ingredient: string;
  userId: string;
};

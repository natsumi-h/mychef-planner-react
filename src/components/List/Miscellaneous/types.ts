export type MyItems = MyItemType[] | [];

export type MyItemType = {
  id: string;
  fields: MyItemFields;
};

export type MyItemFields = {
  ingredient: string;
  userId: string;

};

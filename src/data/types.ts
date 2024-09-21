// src/data/types.ts

export type MenuItem = {
  name: string;
  type: string;
  nazwa: string;
  price: number;
  vegan: boolean;
  alergeny: string | null;
  allergenes: string | null;
  składniki: string;
  ingridients: string;
};

export type MenuSelectionItem = {
  label: string;
  value: string;
};

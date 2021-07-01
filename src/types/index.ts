export type ProductData = {
  readonly id: string;
  readonly name?: string;
  readonly price?: number;
  readonly main_image?: string;
  readonly description?: string;
  readonly user?: string;
};

export type FormInputs = {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly main_image: string;
  readonly description: string;
};

export interface store {
  info: {
    name: string;
    address: string;
    phone: string;
  };

  menu: {
    categories: [
      {
        name: string;
        description: string;
      }
    ];
    optionGroups: [];
    item: [
      {
        name: string;
        price: string;
        description: string;
        categories: [];
        optionGroups: [];
      }
    ];
  };
}

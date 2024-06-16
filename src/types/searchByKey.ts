import { TViewWarehouse } from './warehouseList';

export type TSearchWarehouse = {
  message: string;
  data: {
    list: TViewWarehouse[];
  };
};

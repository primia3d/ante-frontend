import { TViewWarehouse } from '@/types/warehouseList';
import axios from 'axios';

type Params = {
  page: number;
  perPage: number;
  sortType: string;
  search: string;
};

type TSearchByKeyResponse = {
  message: string;
  data: {
    list: TViewWarehouse[];
  };
  currentPage: number;
  token: string;
};

export const getSearchWarehouseByKey = async ({ page, perPage, search, sortType }: Params) => {
  try {
    const { data } = await axios.get<TSearchByKeyResponse>(
      `/warehouse/search?page=${page}&perPage=${perPage}&sortType=${sortType}&search=${search}`,
    );
    return data;
  } catch (error) {
    console.log('Search Failed', error);
    throw error;
  }
};

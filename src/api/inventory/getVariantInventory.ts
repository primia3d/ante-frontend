import { TInventory } from "@/types/assetManagement";
import axios from "axios";

type Params = {
    page: number;
    perPage: number;
    generalInventoryId: string;
}

type TVariantListResponse = {
    message: string;
    data: TInventory[];
    currentPage: number;
    token: string;
}

export const getVariantList = async ({ page, perPage, generalInventoryId }: Params) => {
    try {

      const { data } = await axios.get<TVariantListResponse>(
        `/inventory/get-variant?page=${page}&perPage=${perPage}&generalInventoryId=${generalInventoryId}`
      );
      return data.data; 
    } catch (error) {
      console.error('Error fetching data: ', error);
      throw error;
    }
  };
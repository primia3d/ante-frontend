import { TViewWarehouse } from '@/types/warehouseList';
import axios from 'axios';

type Params = {
    page: number;
    perPage: number;
}

type TViewWarehousesResponse = {
    message: string;
    data: TViewWarehouse[];
    currentPage: number;
    token: string;
};

export const fetchWarehouses = async (params: Params): Promise<TViewWarehouse[]> => {
    try {
        const { data } = await axios.get<TViewWarehousesResponse>(`/warehouse`, {
            params: { page: params.page, perPage: params.perPage }
        });
        console.log(data);
        return data.data;
        
    } catch (error) {
        console.error('Error fetching warehouses:', error);
        throw error; 
    }
}

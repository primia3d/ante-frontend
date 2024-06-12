import axios from 'axios';
import { TViewWarehouse } from '@/types/warehouseList';
import { ACCOUNT_ID } from '@/constants/common';

type Params = {
    page: number;
    perPage: number;
    createdById: string;
}

type TViewWarehousesResponse = {
    message: string;
    data: TViewWarehouse[];
    currentPage: number;
    token: string;
};

export const fetchWarehouses = async (params: Params) => {
    try {
        const { data } = await axios.get<TViewWarehousesResponse>(`/warehouse?page=1&perPage=10&createdById=${ACCOUNT_ID}`);
        console.log(data);
        return data.data;
        
    } catch (error) {
        console.error('Error fetching warehouses:', error);
        throw error; 
    }
}

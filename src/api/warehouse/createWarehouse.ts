import axios from 'axios';

import { AddWarehouse } from '@/types/warehouse';

type TParams = {
    name: string;
    location: string;
    size: number;
    storageCapacity: number;
};

type TCreateWarehouseResponse = {
    message: string;
    data: AddWarehouse;
    token: string;
}

export const createWarehouse = async (params: TParams) => {
    return axios.post<TCreateWarehouseResponse>(`/warehouse`, params);
};
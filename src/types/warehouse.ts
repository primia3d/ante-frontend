export type AddWarehouse = {
    message: string;
    data: {
        id: string;
        name: string;
        location: string;
        size: number;
        storageCapacity: number;
    };
    createdAt: {
        dateTime: string;
        time: string;
        date: string;
        dateFull: string;
        raw: string;
      };
      updatedAt: {
        dateTime: string;
        time: string;
        date: string;
        dateFull: string;
        raw: string;
      };
      isDeleted: boolean;
}


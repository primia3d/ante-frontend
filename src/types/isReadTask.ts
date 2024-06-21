export type TIsReadMyTask = {
    
    id: number;
    title: string;
    description: string;
    createdById: string;
    projectId: number;
    boardLaneId: number;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    updatedById: string;
    assignedToId: string;
    isDeleted: boolean;
    dueDate: Date;
    isRead: boolean;

}
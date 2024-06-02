export type BoardLane = {
  id: number;
  order: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
};

export type Item = {
  id: number;
  title: string;
  description: string;
  createdById: string;
  projectId: number;
  boardLaneId: number;
  order: number;
  createdAt: string;
  updatedAt: string;
  updatedById: string;
  isDeleted: boolean;
};

export type BoardLaneData = {
  boardLane: BoardLane;
  items: Item[];
};

export type ResponseData = {
  [key: string]: BoardLaneData;
};

export type BoardLaneResponse = {
  status: boolean;
  data: ResponseData;
};

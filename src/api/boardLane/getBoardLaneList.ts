import axios from 'axios';
import qs from 'qs';

import { TBoardLane } from '@/types/boardLane.type';

type Params = {
  page: number;
  perPage: number;
};

type TGetBoardListResponse = {
  message: string;
  boardLaneInformation: {
    list: TBoardLane[];
    pagination: number[];
    currentPage: number;
  };
};

export const getBoardLaneList = async (params: Params | undefined = { page: 1, perPage: 20 }) => {
  const requestBody = {
    filters: [{ deleted: false }],
  };
  const { data } = await axios.put<TGetBoardListResponse>(`/board-lane?${qs.stringify(params)}`, requestBody);

  return data.boardLaneInformation;
};

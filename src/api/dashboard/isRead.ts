import axios from "axios";
import { TIsReadMyTask } from "@/types/isReadTask";

type Params = {
   id: string;
}

type IsReadMyTaskResponse = {
    message: string;
    taskInformation: TIsReadMyTask;
    token: string; 
}

export const patchIsReadMyTask = async (params: Params): Promise<TIsReadMyTask> => {
  const { id } = params;
  const { data } = await axios.patch<IsReadMyTaskResponse>(`task/read?id=${id}`);
  return data.taskInformation;
}



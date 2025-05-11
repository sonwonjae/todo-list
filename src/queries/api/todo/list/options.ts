import axios from "axios";

import { TodosRes } from "@/pages/api/todo/list";

const generator = (query?: { page: number; limit: number }) => {
  return {
    queryKey: ["/api/todo/list", query],
    queryFn: async () => {
      const { data } = await axios<TodosRes>(
        `/api/todo/list?page=${query?.page ?? 0}&limit=${query?.limit ?? 10}`,
      );
      return data.todos;
    },
  };
};

export default generator;

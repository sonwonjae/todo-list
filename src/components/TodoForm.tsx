import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";

import { TodosRes } from "@/pages/api/todo/list";

function TodoForm() {
  const { refetch } = useSuspenseQuery({
    queryKey: ["/api/todo/list"],
    queryFn: async () => {
      const { data } = await axios<TodosRes>("/api/todo/list");
      return data.todos;
    },
  });

  const [title, setTitle] = useState("");
  const changeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const { isPending, mutateAsync: insertTodo } = useMutation({
    mutationFn: async () => {
      setTitle("");
      await axios.post("/api/todo", {
        todo: {
          title,
        },
      });
      await refetch();
    },
  });

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    insertTodo();
  };

  return (
    <form onSubmit={submit}>
      <input
        autoFocus
        disabled={isPending}
        value={title}
        onChange={changeTitle}
      />
    </form>
  );
}

export default React.memo(TodoForm);

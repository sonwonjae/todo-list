import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";

import generator from "@/queries/api/todo/list/options";

function TodoForm() {
  const router = useRouter();

  const { refetch } = useSuspenseQuery(
    generator({
      page: Number(router.query?.page) || 0,
      limit: Number(router.query?.limit) || 10,
    }),
  );

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

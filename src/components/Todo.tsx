import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";

import { TodosRes } from "@/pages/api/todo/list";
import generator from "@/queries/api/todo/list/options";

function Todo({ id, title }: TodosRes["todos"][number]) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const changeUpdatedTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const router = useRouter();
  const { refetch } = useSuspenseQuery(
    generator({
      page: Number(router.query?.page) || 0,
      limit: Number(router.query?.limit) || 10,
    }),
  );

  const { mutateAsync: updateTodo } = useMutation({
    mutationFn: async ({ id, title }: { id: string; title: string }) => {
      setIsUpdating(false);
      setUpdatedTitle(title);
      await axios.patch("/api/todo", {
        id,
        todo: {
          title: updatedTitle,
        },
      });
      await refetch();
    },
  });

  const { mutateAsync: deleteTodo } = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete("/api/todo", {
        data: {
          id,
        },
      });
      await refetch();
    },
  });

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    updateTodo({
      id,
      title: updatedTitle,
    });
    setIsUpdating(false);
  };

  if (isUpdating) {
    return (
      <form
        onSubmit={submit}
        onKeyDown={(e) => {
          if (e.key.toUpperCase() === "ESCAPE") {
            setIsUpdating(false);
            setUpdatedTitle(title);
          }
        }}
      >
        <input autoFocus value={updatedTitle} onChange={changeUpdatedTitle} />
      </form>
    );
  }

  return (
    <div className="todo" key={id}>
      <span>{title}</span>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <button
          style={{
            fontSize: "14px",
          }}
          onClick={() => {
            // deleteTodo(id);
            setIsUpdating(true);
          }}
        >
          ✏️
        </button>
        <button
          style={{
            fontSize: "12px",
          }}
          onClick={() => {
            deleteTodo(id);
          }}
        >
          ❌
        </button>
      </div>
    </div>
  );
}

export default React.memo(Todo);

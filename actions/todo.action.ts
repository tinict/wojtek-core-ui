"use server";

import todosService from "@/services/todos.service";
import { ITodo } from "@/types/models/todo.model";

export const getTodos = async () => {
    return todosService.getTodos();
};

export const createTodo = async ({
    id,
    title,
    body,
    userId
}: ITodo) => {
    return todosService.createTodo({
        id,
        title,
        body,
        userId
    });
};


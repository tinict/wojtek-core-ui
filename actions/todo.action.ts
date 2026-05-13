"use server";

import todosService from "@/services/todos.service";

export const getUsers = async () => {
    return todosService.getTodos();
};

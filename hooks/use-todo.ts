import todoService from "@/services/todos.service";
import { ITodo } from "@/types/models/todo.model";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

export function useGetTodos() {
    const { data, status, refetch } = useQuery({
        queryKey: [`todos`],
        queryFn: () => todoService.getTodos(),
        staleTime: 5000,
        refetchOnWindowFocus: false,
    })

    return {
        data,
        status,
        refetch
    }
}

export function useCreateTodo() {
    const queryClient = useQueryClient()

    const { data, status, mutate, variables, mutateAsync } = useMutation({
        mutationKey: ["create-todo"],
        mutationFn: (variables: ITodo) =>
            todoService.createTodo(variables),
        onMutate: async (payload: ITodo) => {
            await queryClient.cancelQueries({
                queryKey: ["todos"],
            })

            const previousData = queryClient.getQueryData<ITodo[]>(["todos"])

            queryClient.setQueryData(
                ["todos"],
                (old: {
                    data: ITodo[]
                } | undefined) => ({
                    data: [...(old?.data ?? []), payload],
                })
            )

            return { previousData }
        },
        onError: (_err, _newTodo, context) => {
            queryClient.setQueryData(
                ["todos"],
                context?.previousData
            )
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            })
        },
    })

    return {
        data,
        mutate,
        mutateAsync,
        status,
    }
}
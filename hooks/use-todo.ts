import todosService from "@/services/todos.service";
import {
    useQuery,
} from "@tanstack/react-query";

export function useGetTodos() {
    const { data, status, refetch } = useQuery({
        queryKey: [`todos`],
        queryFn: () => todosService.getTodos(),
        staleTime: 5000,
        refetchOnWindowFocus: false,
    })

    return {
        data,
        status,
        refetch
    }
}
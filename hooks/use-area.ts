import areaService from "@/services/area.service";
import { IArea } from "@/types/models/area.model";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

type UpdateAreaPayload = Pick<IArea, "areaId"> & Partial<Omit<IArea, "areaId">>;

export function useGetAreas() {
    const {
        data,
        status,
        refetch
    } = useQuery({
        queryKey: ["areas"],
        queryFn: () => areaService.getAreas(),
        staleTime: 5000,
        refetchOnWindowFocus: false,
    })

    return {
        data,
        status,
        refetch
    }
};

export function useCreateArea() {
    const queryClient = useQueryClient()

    const {
        data,
        status,
        mutate,
        mutateAsync
    } = useMutation({
        mutationKey: ["areas"],
        mutationFn: (variables: Omit<IArea, "areaId">) => areaService.createArea(variables),
        onMutate: async (payload: Omit<IArea, "areaId">) => {
            await queryClient.cancelQueries({
                queryKey: ["areas"],
            })

            const previousData = queryClient.getQueryData<{ data: IArea[] }>(["areas"]);

            queryClient.setQueryData(
                ["areas"],
                (old: { data: IArea[] } | undefined) => ({
                    data: [...(old?.data ?? []), payload],
                })
            )

            return { previousData }
        },
        onError: (_err, _payload, context) => {
            queryClient.setQueryData(
                ["areas"],
                context?.previousData
            )
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["areas"],
            })
        },
    })

    return {
        data,
        mutate,
        mutateAsync,
        status,
    }
};

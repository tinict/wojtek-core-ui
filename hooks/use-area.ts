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

export function useUpdateArea() {
    const queryClient = useQueryClient();

    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["update-area"],
        mutationFn: (variables: UpdateAreaPayload) =>
            areaService.updateArea(variables),
        onMutate: async (payload) => {
            await queryClient.cancelQueries({ queryKey: ["update-area"] });

            const scopedKey = ["areas", String(payload.areaId)];
            const globalKey = ["areas"];

            const previousScoped = queryClient.getQueryData<{ data: IArea[] }>(scopedKey);
            const previousGlobal = queryClient.getQueryData<{ data: IArea[] }>(globalKey);

            const updater = (old: { data: IArea[] } | undefined) => ({
                data: (old?.data ?? []).map((item) =>
                    item.areaId === payload.areaId ? {
                        ...item,
                        ...payload
                    } : item
                ),
            });

            queryClient.setQueryData(scopedKey, updater);
            queryClient.setQueryData(globalKey, updater);

            return {
                previousScoped,
                previousGlobal,
                areadId: payload.areaId
            };
        },
        onError: (_err, payload, context) => {
            if (context?.previousScoped !== undefined) {
                queryClient.setQueryData(
                    ["areas", String(payload.areaId)],
                    context.previousScoped
                );
            }
            if (context?.previousGlobal !== undefined) {
                queryClient.setQueryData(["areas"], context.previousGlobal);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["areas"] });
        },
    });

    return {
        data,
        mutate,
        mutateAsync,
        status
    };
}

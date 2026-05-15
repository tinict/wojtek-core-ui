import reportTypeService from "@/services/report-types.service";
import { IReportType } from "@/types/models/report-type.model";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

type UpdateReportTypePayload = Pick<IReportType, "typeId"> & Partial<Omit<IReportType, "typeId">>

export function useGetReportTypes() {
    const { data, status, refetch } = useQuery({
        queryKey: [`report-types`],
        queryFn: () => reportTypeService.getReportTypes(),
        staleTime: 5000,
        refetchOnWindowFocus: false,
    })

    return {
        data,
        status,
        refetch
    }
}

export function useCreateReportTypes() {
    const queryClient = useQueryClient()

    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["create-report-type"],
        mutationFn: (variables: Omit<IReportType, "typeId">) =>
            reportTypeService.createReportType(variables),
        onMutate: async (payload: Omit<IReportType, "typeId">) => {
            await queryClient.cancelQueries({
                queryKey: ["report-types"],
            })

            const previousData = queryClient.getQueryData<{ data: IReportType[] }>(["report-types"])

            queryClient.setQueryData(
                ["report-types"],
                (old: { data: IReportType[] } | undefined) => ({
                    data: [...(old?.data ?? []), payload],
                })
            )

            return { previousData }
        },
        onError: (_err, _payload, context) => {
            queryClient.setQueryData(
                ["report-types"],
                context?.previousData
            )
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["report-types"],
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

export function useUpdateReportTypes() {
    const queryClient = useQueryClient()

    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["update-report-type"],
        mutationFn: (variables: UpdateReportTypePayload) =>
            reportTypeService.updateReportType(variables),
        onMutate: async (payload: UpdateReportTypePayload) => {
            await queryClient.cancelQueries({ queryKey: ["report-types"] })

            const previousData = queryClient.getQueryData<{ data: IReportType[] }>(["report-types"])

            queryClient.setQueryData(
                ["report-types"],
                (old: { data: IReportType[] } | undefined) => ({
                    data: (old?.data ?? []).map(item =>
                        item.typeId === payload.typeId ? { ...item, ...payload } : item
                    ),
                })
            )

            return { previousData }
        },
        onError: (_err, _payload, context) => {
            queryClient.setQueryData(["report-types"], context?.previousData)
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["report-types"],
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

export function useDeleteReportType() {
    const queryClient = useQueryClient()

    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["delete-report-type"],
        mutationFn: (typeId: IReportType["typeId"]) =>
            reportTypeService.deleteReportType(typeId),
        onMutate: async (typeId: IReportType["typeId"]) => {
            await queryClient.cancelQueries({ queryKey: ["report-types"] })

            const previousData = queryClient.getQueryData<{ data: IReportType[] }>(["report-types"])

            queryClient.setQueryData(
                ["report-types"],
                (old: { data: IReportType[] } | undefined) => ({
                    data: (old?.data ?? []).filter(item => item.typeId !== typeId),
                })
            )

            return { previousData }
        },
        onError: (_err, _payload, context) => {
            queryClient.setQueryData(["report-types"], context?.previousData)
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["report-types"],
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
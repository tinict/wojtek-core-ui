import reportTypeService, { GetReportTypesParams } from "@/services/report-types.service";
import { IReportType } from "@/types/models/report-type.model";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

type UpdateReportTypePayload = Pick<IReportType, "typeId"> &
    Partial<Omit<IReportType, "typeId">>;

export function useGetReportTypes(params?: GetReportTypesParams) {
    const { data, status, refetch } = useQuery({
        queryKey: ["report-types", params],
        queryFn:  () => reportTypeService.getReportTypes(params),
        staleTime: 5000,
        refetchOnWindowFocus: false,
    });

    return { data, status, refetch };
}

export function useCreateReportType() {
    const queryClient = useQueryClient();

    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["create-report-type"],
        mutationFn:  (variables: Omit<IReportType, "typeId">) =>
            reportTypeService.createReportType(variables),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["report-types"] });
        },
    });

    return { data, mutate, mutateAsync, status };
}

export function useUpdateReportType() {
    const queryClient = useQueryClient();

    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["update-report-type"],
        mutationFn:  (variables: UpdateReportTypePayload) =>
            reportTypeService.updateReportType(variables),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["report-types"] });
        },
    });

    return { data, mutate, mutateAsync, status };
}

export function useDeleteReportType() {
    const queryClient = useQueryClient();

    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["delete-report-type"],
        mutationFn:  (typeId: IReportType["typeId"]) =>
            reportTypeService.deleteReportType(typeId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["report-types"] });
        },
    });

    return { data, mutate, mutateAsync, status };
}

export function useToggleReportType() {
    const queryClient = useQueryClient();

    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["toggle-report-type"],
        mutationFn:  (typeId: IReportType["typeId"]) =>
            reportTypeService.toggleReportType(typeId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["report-types"] });
        },
    });

    return { data, mutate, mutateAsync, status };
}
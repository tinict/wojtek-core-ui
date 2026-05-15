import reportSubjectService from "@/services/report-subject.service";
import { IReportSubject } from "@/types/models/report-subject.model";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

type UpdateReportSubjectPayload = Pick<IReportSubject, "subjectId"> &
    Partial<Omit<IReportSubject, "subjectId">>;

export function useGetReportSubjects(typeId?: string) {
    const normalizedTypeId = typeId || undefined;
    const queryKey = normalizedTypeId
        ? ["report-subjects", normalizedTypeId]
        : ["report-subjects"];

    const { data, status, refetch } = useQuery({
        queryKey,
        queryFn: () => reportSubjectService.getSubjects({ typeId: normalizedTypeId }),
        staleTime: 5000,
        refetchOnWindowFocus: false,
    });

    return { data, status, refetch };
}

export function useCreateReportSubject() {
    const queryClient = useQueryClient();

    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["create-report-subject"],
        mutationFn: (variables: Omit<IReportSubject, "subjectId">) =>
            reportSubjectService.createSubject(variables),
        onMutate: async (payload) => {
            await queryClient.cancelQueries({ queryKey: ["report-subjects"] });

            const scopedKey = ["report-subjects", String(payload.typeId)];
            const globalKey = ["report-subjects"];

            const previousScoped = queryClient.getQueryData<{ data: IReportSubject[] }>(scopedKey);
            const previousGlobal = queryClient.getQueryData<{ data: IReportSubject[] }>(globalKey);

            queryClient.setQueryData(scopedKey, (old: { data: IReportSubject[] } | undefined) => ({
                data: [...(old?.data ?? []), payload],
            }));
            queryClient.setQueryData(globalKey, (old: { data: IReportSubject[] } | undefined) => ({
                data: [...(old?.data ?? []), payload],
            }));

            return { previousScoped, previousGlobal, typeId: payload.typeId };
        },
        onError: (_err, payload, context) => {
            if (context?.previousScoped !== undefined) {
                queryClient.setQueryData(
                    ["report-subjects", String(payload.typeId)],
                    context.previousScoped
                );
            }
            if (context?.previousGlobal !== undefined) {
                queryClient.setQueryData(["report-subjects"], context.previousGlobal);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["report-subjects"] });
        },
    });

    return { data, mutate, mutateAsync, status };
}

export function useUpdateReportSubject() {
    const queryClient = useQueryClient();

    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["update-report-subject"],
        mutationFn: (variables: UpdateReportSubjectPayload) =>
            reportSubjectService.updateReportSubject(variables),
        onMutate: async (payload) => {
            await queryClient.cancelQueries({ queryKey: ["report-subjects"] });

            const scopedKey = ["report-subjects", String(payload.typeId)];
            const globalKey = ["report-subjects"];

            const previousScoped = queryClient.getQueryData<{ data: IReportSubject[] }>(scopedKey);
            const previousGlobal = queryClient.getQueryData<{ data: IReportSubject[] }>(globalKey);

            const updater = (old: { data: IReportSubject[] } | undefined) => ({
                data: (old?.data ?? []).map((item) =>
                    item.subjectId === payload.subjectId ? { ...item, ...payload } : item
                ),
            });

            queryClient.setQueryData(scopedKey, updater);
            queryClient.setQueryData(globalKey, updater);

            return { previousScoped, previousGlobal, typeId: payload.typeId };
        },
        onError: (_err, payload, context) => {
            if (context?.previousScoped !== undefined) {
                queryClient.setQueryData(
                    ["report-subjects", String(payload.typeId)],
                    context.previousScoped
                );
            }
            if (context?.previousGlobal !== undefined) {
                queryClient.setQueryData(["report-subjects"], context.previousGlobal);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["report-subjects"] });
        },
    });

    return { data, mutate, mutateAsync, status };
}

export function useDeleteReportSubject(typeId?: string) {
    const queryClient = useQueryClient();

    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["delete-report-subject"],
        mutationFn: (subjectId: IReportSubject["subjectId"]) =>
            reportSubjectService.deleteReportSubject(subjectId),
        onMutate: async (subjectId) => {
            await queryClient.cancelQueries({ queryKey: ["report-subjects"] });

            const scopedKey = typeId
                ? ["report-subjects", typeId]
                : ["report-subjects"];

            const previousData = queryClient.getQueryData<{ data: IReportSubject[] }>(scopedKey);
            const globalData = queryClient.getQueryData<{ data: IReportSubject[] }>(["report-subjects"]);

            const filter = (old: { data: IReportSubject[] } | undefined) => ({
                data: (old?.data ?? []).filter((item) => item.subjectId !== subjectId),
            });

            queryClient.setQueryData(scopedKey, filter);
            if (typeId) {
                queryClient.setQueryData(["report-subjects"], filter);
            }

            return { previousData, globalData };
        },
        onError: (_err, _payload, context) => {
            const scopedKey = typeId
                ? ["report-subjects", typeId]
                : ["report-subjects"];

            if (context?.previousData !== undefined) {
                queryClient.setQueryData(scopedKey, context.previousData);
            }
            if (typeId && context?.globalData !== undefined) {
                queryClient.setQueryData(["report-subjects"], context.globalData);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["report-subjects"] });
        },
    });

    return { data, mutate, mutateAsync, status };
}
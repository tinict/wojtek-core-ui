import reportSubjectService, { GetReportSubjectsParams } from "@/services/report-subject.service";
import { IReportSubject } from "@/types/models/report-subject.model";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

type UpdateReportSubjectPayload = Pick<IReportSubject, "subjectId"> &
    Partial<Omit<IReportSubject, "subjectId">>;

export function useGetReportSubjects(params?: GetReportSubjectsParams) {
    const { data, status, refetch } = useQuery({
        queryKey: ["report-subjects", params],
        queryFn:  () => reportSubjectService.getSubjects(params),
        staleTime: 5000,
        refetchOnWindowFocus: false,
    });

    return { data, status, refetch };
}

export function useCreateReportSubject() {
    const queryClient = useQueryClient();

    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["create-report-subject"],
        mutationFn:  (variables: Omit<IReportSubject, "subjectId">) =>
            reportSubjectService.createSubject(variables),
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
        mutationFn:  (variables: UpdateReportSubjectPayload) =>
            reportSubjectService.updateReportSubject(variables),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["report-subjects"] });
        },
    });

    return { data, mutate, mutateAsync, status };
}

export function useDeleteReportSubject() {
    const queryClient = useQueryClient();

    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["delete-report-subject"],
        mutationFn:  (subjectId: IReportSubject["subjectId"]) =>
            reportSubjectService.deleteReportSubject(subjectId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["report-subjects"] });
        },
    });

    return { data, mutate, mutateAsync, status };
}
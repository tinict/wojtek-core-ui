import reportService, { GetReportParams } from "@/services/report.service";
import {
    useQuery,
} from "@tanstack/react-query";

export function useGetReports(params?: GetReportParams) {
    const { data, status, refetch } = useQuery({
        queryKey: ["reports", params],
        queryFn: () => reportService.getReports(params),
        staleTime: 5000,
        refetchOnWindowFocus: false,
    });

    return { data, status, refetch };
}
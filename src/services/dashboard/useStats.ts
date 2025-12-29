import { useQuery } from "@tanstack/react-query";
import getStats from "./getStats";
import type { StatisticsResponse } from "@/types/types";

export default function useStats(user_id: number, period: string) {
  const query = useQuery({
    queryKey: ['stats'],
    queryFn: (): Promise<StatisticsResponse> => getStats(user_id, period)
  })
  return {
    ...query,
    isLoading: query.isFetching,
    isError: query.isError
  }
}

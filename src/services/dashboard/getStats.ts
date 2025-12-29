import { api } from "@/lib/utils";
import type { StatisticsResponse } from "@/types/types";

export default async function getStats(user_id: number, period: string): Promise<StatisticsResponse> {
  const res = await fetch(`${api}/employees/${user_id}/statistics?period=${period}`, {
    method: "GET",
    credentials: "include"
  })

  if (!res.ok) {
    throw new Error("Failed fetching stats")
  }

  return res.json() as Promise<StatisticsResponse>
}

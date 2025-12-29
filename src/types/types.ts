export interface User {
  accessToken: string
  roles: string[]
}

export type StatisticsResponse = {
  stats: Statistics
}

export type Statistics = {
  id: number
  user_id: number
  date: string
  starting_balance: number
  ending_balance: number
  debit: number
  credit: number
  total: number
}

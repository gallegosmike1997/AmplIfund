export type Campaign = {
  id: string
  title?: string | null
  kickstarter_url: string
  status: string
  goal_amount?: number | null
  current_pledged?: number | null
  health_score?: number
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!apiUrl) throw new Error('Campaign API is not configured')
  const response = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  })
  if (!response.ok) throw new Error((await response.text()) || `Request failed: ${response.status}`)
  return response.json()
}

export const ampliApi = {
  listCampaigns: () => request<Campaign[]>('/campaigns/'),
  createCampaign: (kickstarterUrl: string) =>
    request<Campaign>('/campaigns/', { method: 'POST', body: JSON.stringify({ kickstarter_url: kickstarterUrl }) }),
  analyzeCampaign: (campaignId: string) => request(`/campaigns/${campaignId}/analyze`, { method: 'POST' }),
  getStats: (campaignId: string) => request(`/dashboard/stats/${campaignId}`),
  getCommunityMatches: (campaignId: string) => request(`/communities/campaign/${campaignId}/matches`),
  runAgentCycle: () => request('/agent/run-cycle', { method: 'POST' }),
}

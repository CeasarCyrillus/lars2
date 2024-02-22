export const reportId = "reportId"

export const reportPaths = {
  root: "/reports",
  details: `/reports/:${reportId}`,
  revisions: `/reports/:${reportId}/revisions`,
} as const

export const reportDetailsPath = (id: number) => reportPaths.details.replace(`:${reportId}`, id.toString())
export const reportRevisionsPath = (id: number) => reportPaths.revisions.replace(`:${reportId}`, id.toString())
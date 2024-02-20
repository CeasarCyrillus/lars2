export const pathId = "id"

export enum Path {
  Reports = "/reports",
  ReportDetails = `/reports/:${pathId}`,
  ReportRevisionDetails = `/reports/${pathId}/revisions`,
}

export const getDetailsPath = (path: Path, id: number) => `${path}`.replace(`:${pathId}`, id.toString())
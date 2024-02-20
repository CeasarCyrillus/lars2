import {bind} from "@react-rxjs/core";
import {reportService} from "../services/reportService/api";

export const [useReportDetails] = bind((reportId: number) => reportService.reportDetails$(reportId))
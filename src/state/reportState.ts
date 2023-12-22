import {bind} from "@react-rxjs/core";
import {reportService} from "../services/reportService/api";

export const [useReports] = bind(() => reportService.reports$())
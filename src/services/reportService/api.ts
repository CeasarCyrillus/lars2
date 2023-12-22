import {createReportService} from "./reportService";
import {socketService} from "../socketService/api";
import {authService} from "../authService/api";

export const reportService = createReportService({socketService, authService})
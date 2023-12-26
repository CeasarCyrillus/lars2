import {createReportService} from "./reportService";
import {socketService} from "../socketService/api";

export const reportService = createReportService({socketService})
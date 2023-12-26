import {createSessionService} from "./sessionService";

export const sessionService = createSessionService({provider: localStorage})
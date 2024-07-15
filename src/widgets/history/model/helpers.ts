import { format } from "date-fns";

import { formatForTimeZone } from "@/shared/lib/date-helper";

export const formatTime = value => format(formatForTimeZone(new Date(value)), "HH:mm");
export const formatDate = value => format(formatForTimeZone(new Date(value)), "dd.MM.yy");

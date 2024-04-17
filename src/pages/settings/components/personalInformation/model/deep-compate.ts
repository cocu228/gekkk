import { ClientDetails } from "@/shared/(orval)api/gek/model";

export const deepCompare = (obj1:ClientDetails, obj2:ClientDetails) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
};
import Decimal from "decimal.js";
import { IExchangeToken } from "./types";

export function tokenSorter(a: IExchangeToken, b: IExchangeToken): number {
    // Если обе валюты имеют баланс больше 0, то они сравниваются по имени
    if (a.balance > new Decimal(0) && b.balance > new Decimal(0)) {
        return a.name.localeCompare(b.name);
    }

    // Если одна из валют имеет баланс больше 0, то эта валюта считается выше в списке
    else if (a.balance > new Decimal(0) && b.balance <= new Decimal(0)) {
        return -1;
    }

    else if (a.balance <= new Decimal(0) && b.balance > new Decimal(0)) {
        return 1;
    }

    // Если обе валюты имеют баланс меньше или равный 0, то они сравниваются по имени
    else {
        return a.name.localeCompare(b.name);
    }
}

import { Cards } from "./cards"

export interface Lists {
    forEach(arg0: (element: any) => void): unknown
    id:string
    name:string
    cards:Cards[]
}

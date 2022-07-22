import { Timestamp } from "firebase/firestore";

export interface Note {
    title: string,
    content: string,
    id: string,
    groupId: string,
    timestamp: Timestamp,
    lock: boolean,
    pin: boolean,
    password: string
}
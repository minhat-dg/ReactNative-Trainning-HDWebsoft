import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface Note {
    title: string,
    content: string,
    id: string,
    groupId: string,
    timestamp: FirebaseFirestoreTypes.FieldValue
}
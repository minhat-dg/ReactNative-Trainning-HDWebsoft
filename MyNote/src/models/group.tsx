import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
export interface Group {  
    count: number,
    description: string
    name: string,
    uid: string,
    id: string,
    timestamp: FirebaseFirestoreTypes.FieldValue
}
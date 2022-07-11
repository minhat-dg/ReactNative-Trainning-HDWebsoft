import { Note } from "models/note";

type RootStackParamList = {
    SignUp: undefined,
    Login: undefined,
    Home: undefined,
    Group: {
        groupName: string,
        groupId: string,
        count: number
    },
    Note: {
        groupId: string,
        note: Note | undefined
    }
};

export default RootStackParamList;
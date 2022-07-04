import firestore from '@react-native-firebase/firestore';


export const addNote = () => {
    firestore().collection('Notes')
}
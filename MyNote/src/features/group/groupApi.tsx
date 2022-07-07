import firestore from '@react-native-firebase/firestore';
import { Group } from '../../models/group';

export const getAllGroups = (setNoteGroups: React.Dispatch<React.SetStateAction<Group[]>>, uid: string | undefined) => {
    const subscriber = firestore()
        .collection('Groups').where('uid', '==', uid)
        .onSnapshot(querySnapshot => {
            const groups: Group[] = [];
            querySnapshot.forEach(documentSnapshot => {
                groups.push({
                    name: documentSnapshot.data().name,
                    description: documentSnapshot.data().description,
                    uid: documentSnapshot.data().uid,
                    count: documentSnapshot.data().count,
                    id: documentSnapshot.id
                });
            });

            setNoteGroups(groups)
        });
    return () => subscriber()
}

export const deleteGroup = (id: string) => {
    firestore()
        .collection('Groups').doc(id).delete().then(() => {
            firestore().collection('Notes').where('groupId', '==', id).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.delete()
                })
            })
            console.log('Group deleted!');
        });
}
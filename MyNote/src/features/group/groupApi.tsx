import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { SetStateAction } from 'react';
import { Group } from '../../models/group';

export const getFirstPageGroups = (setNoteGroups: React.Dispatch<React.SetStateAction<Group[]>>, uid: string | undefined, limit: number, setLastGroup: React.Dispatch<SetStateAction<FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | undefined>>) => {
    const subscriber = firestore()
        .collection('Groups').where('uid', '==', uid).limit(limit).orderBy("timestamp", "desc")
        .onSnapshot(querySnapshot => {
            if (querySnapshot) {
                const groups: Group[] = [];
                querySnapshot.forEach(documentSnapshot => {
                    groups.push({
                        name: documentSnapshot.data().name,
                        description: documentSnapshot.data().description,
                        uid: documentSnapshot.data().uid,
                        count: documentSnapshot.data().count,
                        id: documentSnapshot.id,
                        timestamp: documentSnapshot.data().timestamp
                    });
                });
                if (querySnapshot.docs.length === limit) {
                    const lastGroup = querySnapshot.docs[querySnapshot.docs.length - 1];
                    setLastGroup(lastGroup)
                }
                setNoteGroups(groups)
            }
        });
    return () => subscriber()
}

export const getMoreGroups = (setNoteGroups: React.Dispatch<React.SetStateAction<Group[]>>, uid: string | undefined, limit: number, setLastGroup: React.Dispatch<SetStateAction<FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | undefined>>, lastGroup: FirebaseFirestoreTypes.DocumentData) => {
    const subscriber = firestore()
        .collection('Groups').where('uid', '==', uid).orderBy("timestamp", "desc")
        .startAfter(lastGroup).limit(limit)
        .onSnapshot(querySnapshot => {
            if (querySnapshot) {
                const groups: Group[] = [];
                querySnapshot.forEach(documentSnapshot => {
                    groups.push({
                        name: documentSnapshot.data().name,
                        description: documentSnapshot.data().description,
                        uid: documentSnapshot.data().uid,
                        count: documentSnapshot.data().count,
                        id: documentSnapshot.id,
                        timestamp: documentSnapshot.data().timestamp
                    });
                });
                const lastGroup = querySnapshot.docs[querySnapshot.docs.length - 1];
                setLastGroup(lastGroup)
                setNoteGroups((listGroups) => [...listGroups, ...groups])
            }
        })
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
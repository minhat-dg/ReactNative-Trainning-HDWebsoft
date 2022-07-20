import { default as firestore, FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Group } from 'models/group';
import { SetStateAction } from 'react';


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
                const source = querySnapshot.metadata.fromCache ? "cache" : "server";
                console.log("Data from ", source);
                if (querySnapshot.docs.length === limit) {
                    const lastGroup = querySnapshot.docs[querySnapshot.docs.length - 1];
                    setLastGroup(lastGroup)
                }
                setNoteGroups(groups)
            }
        });
    return subscriber
}

export const getMoreGroups = (setNoteGroups: React.Dispatch<React.SetStateAction<Group[]>>, uid: string | undefined, limit: number, setLastGroup: React.Dispatch<SetStateAction<FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | undefined>>, lastGroup: FirebaseFirestoreTypes.DocumentData) => {
    const subscriber = firestore()
        .collection('Groups').where('uid', '==', uid).orderBy("timestamp", "desc")
        .startAfter(lastGroup).limit(limit)
        .onSnapshot(querySnapshot => {
            if (querySnapshot.size > 0) {
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
                setNoteGroups((listGroups) => {
                    groups.forEach(newItem => {
                        let isHave = false
                        listGroups.forEach(item => {
                            if (item.id === newItem.id) {
                                isHave = true;
                                return
                            }
                        })
                        if (!isHave) {
                            listGroups.push(newItem)
                        }
                    })
                    return listGroups;
                })
            }
        })
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

export const setNewLast = (uid: string | undefined, newLatsId: string, setLastGroup: React.Dispatch<SetStateAction<FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | undefined>>) => {
    firestore()
        .collection('Groups').where('uid', '==', uid).get().then(querySnapShot => {
            querySnapShot.forEach(doc => {
                if (doc.id === newLatsId) {
                    setLastGroup(doc)
                }
            })
        })
}
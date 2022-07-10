import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { SetStateAction } from 'react';
import { Group } from 'models/group';
import { Note } from 'models/note';

const increasement = firestore.FieldValue.increment(1);
const decreasement = firestore.FieldValue.increment(-1);

export const getFirstPageNotes = (setNotes: { (value: SetStateAction<Note[]>): void; (arg0: Note[]): void; }, setFilteredNotes: { (value: SetStateAction<Note[]>): void; (arg0: Note[]): void; }, groupId: string, limit: number, setLastNote: React.Dispatch<SetStateAction<FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | undefined>>) => {
    const subscriber = firestore()
        .collection('Notes').where('groupId', '==', groupId).limit(limit).orderBy("timestamp", "desc")
        .onSnapshot(querySnapshot => {
            if (querySnapshot) {
                const notes: Note[] = [];
                querySnapshot.forEach(documentSnapshot => {
                    console.log(documentSnapshot.id)
                    notes.push({
                        title: documentSnapshot.data().title,
                        content: documentSnapshot.data().content,
                        groupId: documentSnapshot.data().groupId,
                        id: documentSnapshot.id,
                        timestamp: documentSnapshot.data().timestamp
                    });
                });
                if (querySnapshot.docs.length === limit) {
                    const lastNote = querySnapshot.docs[querySnapshot.docs.length - 1];
                    setLastNote(lastNote)
                }
                setNotes(notes)
                setFilteredNotes(notes)
            }
        });
    return () => subscriber()
}

export const getMoreNotes = (setNotes: { (value: SetStateAction<Note[]>): void; (arg0: Note[]): void; },
    setFilteredNotes: { (value: SetStateAction<Note[]>): void; (arg0: Note[]): void; },
    groupId: string, limit: number,
    setLastNote: React.Dispatch<SetStateAction<FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | undefined>>,
    lastNote: FirebaseFirestoreTypes.DocumentData) => {
    const subscriber = firestore()
        .collection('Notes').where('groupId', '==', groupId).orderBy("timestamp", "desc")
        .startAfter(lastNote).limit(limit)
        .onSnapshot(querySnapshot => {
            if (querySnapshot.size > 0) {
                const notes: Note[] = [];
                querySnapshot.forEach(documentSnapshot => {
                    notes.push({
                        title: documentSnapshot.data().title,
                        content: documentSnapshot.data().content,
                        groupId: documentSnapshot.data().groupId,
                        id: documentSnapshot.id,
                        timestamp: documentSnapshot.data().timestamp
                    });
                });
                const lastNote = querySnapshot.docs[querySnapshot.docs.length - 1];
                setLastNote(lastNote)
                setNotes((listNotes) => {
                    notes.forEach(newItem => {
                        let isHave = false
                        listNotes.forEach(item => {
                            if (item.id === newItem.id) {
                                isHave = true;
                                return
                            }
                        })
                        if (!isHave) {
                            listNotes.push(newItem)
                        }
                    })
                    return listNotes;
                })
                setFilteredNotes((listNotes) => {
                    notes.forEach(newItem => {
                        let isHave = false
                        listNotes.forEach(item => {
                            if (item.id === newItem.id) {
                                isHave = true;
                                return
                            }
                        })
                        if (!isHave) {
                            listNotes.push(newItem)
                        }
                    })
                    return listNotes;
                })
            }
        });
    return () => subscriber()
}

export const deleteNote = (id: string, groupId: string) => {

    firestore()
        .collection('Notes').doc(id).delete().then(() => {
            console.log('Note deleted!');
            firestore().collection('Groups').doc(groupId).update({
                count: decreasement
            })
        });
}

export const setNewLast = (groupId: string | undefined, newLatsId: string, setLastNote: React.Dispatch<SetStateAction<FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | undefined>>) => {
    firestore()
        .collection('Notes').where('groupId', '==', groupId).get().then(querySnapShot => {
            querySnapShot.forEach(doc => {
                if (doc.id === newLatsId) {
                    setLastNote(doc)
                }
            })
        })
}

export const moveNote = (id: string | undefined, groupId: string | undefined, newGroupId: string) => {
    firestore()
        .collection('Notes').doc(id).update({
            groupId: newGroupId
        }).then(() => {
            firestore().collection('Groups').doc(groupId).update({
                count: decreasement
            })
            firestore().collection('Groups').doc(newGroupId).update({
                count: increasement
            })
        })
}

export const getGroupList = async (setGroups: { (value: SetStateAction<Group[]>): void; (arg0: Group[]): void; }) => {
    const groups: Group[] = []
    firestore().collection('Groups').orderBy("timestamp", "desc").get().then((docs) => {
        if (docs) {
            docs.forEach((documentSnapshot) => {
                groups.push({
                    name: documentSnapshot.data().name,
                    description: documentSnapshot.data().description,
                    uid: documentSnapshot.data().uid,
                    count: documentSnapshot.data().count,
                    id: documentSnapshot.id,
                    timestamp: documentSnapshot.data().timestamp
                })
            })
            setGroups(groups)
        }
    });

}
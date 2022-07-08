import firestore from '@react-native-firebase/firestore';
import { SetStateAction } from 'react';
import { Group } from '../../models/group';
import { Note } from '../../models/note';

const increasement = firestore.FieldValue.increment(1);
const decreasement = firestore.FieldValue.increment(-1);

export const getAllNotes = (setNotes: { (value: SetStateAction<Note[]>): void; (arg0: Note[]): void; }, setFilteredNotes: { (value: SetStateAction<Note[]>): void; (arg0: Note[]): void; }, groupId: string) => {
    const subscriber = firestore()
        .collection('Notes').where('groupId', '==', groupId)
        .onSnapshot(querySnapshot => {
            const notes: Note[] = [];
            querySnapshot.forEach(documentSnapshot => {
                notes.push({
                    title: documentSnapshot.data().title,
                    content: documentSnapshot.data().content,
                    groupId: documentSnapshot.data().groupId,
                    id: documentSnapshot.id
                });
            });
            setNotes(notes)
            setFilteredNotes(notes)
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
    firestore().collection('Groups').get().then((docs) => {
        docs.forEach((documentSnapshot) => {
            groups.push({
                name: documentSnapshot.data().name,
                description: documentSnapshot.data().description,
                uid: documentSnapshot.data().uid,
                count: documentSnapshot.data().count,
                id: documentSnapshot.id
            })
        })
        setGroups(groups)
    });

}
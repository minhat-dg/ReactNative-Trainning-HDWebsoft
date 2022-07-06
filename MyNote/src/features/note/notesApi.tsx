import firestore from '@react-native-firebase/firestore';

const increasement = firestore.FieldValue.increment(1);
const decreasement = firestore.FieldValue.increment(-1);

export const getAllNotes = (setNotes, groupId) => {
    const subscriber = firestore()
        .collection('Notes').where('groupId', '==', groupId)
        .onSnapshot(querySnapshot => {
            const notes = [];
            querySnapshot.forEach(documentSnapshot => {
                notes.push({
                    ...documentSnapshot.data(),
                    id: documentSnapshot.id
                });
            });

            setNotes(notes)
        });
    return () => subscriber()
}

export const deleteNote = (id, groupId) => {
    firestore()
        .collection('Notes').doc(id).delete().then(() => {
            console.log('Note deleted!');
            firestore().collection('Groups').doc(groupId).update({
                count: decreasement
            })
        });
}

export const moveNote = (id, groupId, newGroupId) => {
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

export const getGroupList = async (setGroups) => {
    const groups = []
    firestore().collection('Groups').get().then((docs) => {
        docs.forEach((doc) => {
            groups.push({
                ...doc.data(),
                id: doc.id
            })
        })
        setGroups(groups)
    });

}
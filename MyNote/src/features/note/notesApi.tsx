import firestore from '@react-native-firebase/firestore';

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

export const deleteNote = (id, groupId, count) => {
    firestore()
        .collection('Notes').doc(id).delete().then(() => {
            console.log('Note deleted!');
            firestore().collection('Groups').doc(groupId).update({
                count: count - 1
            })
        });
}
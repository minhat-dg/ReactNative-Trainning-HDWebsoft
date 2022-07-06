import firestore from '@react-native-firebase/firestore';

export const getAllGroups = (setNoteGroups, uid) => {
    const subscriber = firestore()
        .collection('Groups').where('uid', '==', uid)
        .onSnapshot(querySnapshot => {
            const groups = [];
            querySnapshot.forEach(documentSnapshot => {
                groups.push({
                    ...documentSnapshot.data(),
                    id: documentSnapshot.id
                });
            });

            setNoteGroups(groups)
        });
    return () => subscriber()
}

export const deleteGroup = (id) => {
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
import firestore from '@react-native-firebase/firestore';

export const getAllGroups = (setNoteGroups, uid) => {
    firestore()
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
}

export const deleteGroup = (id) => {
    firestore()
        .collection('Groups').doc(id).delete().then(() => {
            console.log('Group deleted!');
        });
}
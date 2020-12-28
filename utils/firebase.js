import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCF4e-H1moR8K8xxmFvyfn-bSdB417ZmHE',
	authDomain: 'bitmix-53815.firebaseapp.com',
	projectId: 'bitmix-53815',
	storageBucket: 'bitmix-53815.appspot.com',
	messagingSenderId: '1027682473725',
	appId: '1:1027682473725:web:0dcbe629ee21bda792d094',
	databaseURL: 'https://bitmix-53815-default-rtdb.firebaseio.com',
}
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const firebaseDB = firebaseApp.firestore();
const docWithId = (doc) => ({ id: doc.id, ...doc.data() });
const getDocumentItem = async (docRef) => docWithId(await docRef.get());
const getCollectionItems = async (collectionRef) => {
	const collectionSnapshots = await collectionRef.get();
	const snapshots = [];
	collectionSnapshots.forEach((snapshot) => snapshots.push(docWithId(snapshot)));
	
	return snapshots;
}

module.exports = {
	firebase,
	firebaseApp,
	firebaseDB,
	docWithId,
	getDocumentItem,
	getCollectionItems
}
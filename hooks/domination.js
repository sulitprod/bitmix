import React, { createContext, useState, useContext, useEffect } from 'react';
import { firebase, firebaseDB, docWithId, getCollectionItems } from '../utils/firebase';

const toSlug = (str) => str && str.replace(/ /g, '-').replace(/[^\w-]+/g, '').toLowerCase();
const getDominationSlug = ({ id, title }) => `${toSlug(title)}-${id}`;

export const dominationCollection = () => firebaseDB.collection('domination');
export const dominationRef = (id) => dominationCollection().doc(id);
export const dominationPath = (domination) => ({
	href: `/dominations/[slug]?slug=${getDominationSlug(domination)}`,
	as: `/dominations/${getDominationSlug(domination)}`
});
export const DominationContext = createContext();
export const DominationContextProvider = (props) => {
	const [domination, setDomination] = useState(props.domination);

	useEffect(
		() => dominationCollection().onSnapshot(snapshot => getCollectionItems(dominationCollection()).then(setDomination)),
		[]
	);

	const addDomination = async (variables) => {
		const valuesWithTimestamp = { ...variables, dateCreated: firebase.firestore.FieldValue.serverTimestamp() }
		const newDominationRef = await dominationCollection().add(valuesWithTimestamp);
		const newDominationSnapshot = await newDominationRef.get();
		
		setDomination([ ...domination, docWithId(newDominationSnapshot) ]);
		
		return docWithId(newDominationSnapshot);
	}

	const updateDomination = async (variables) => {
		const { id, ...values } = variables;
		const valuesWithTimestamp = { ...values, dateUpdated: firebase.firestore.FieldValue.serverTimestamp() }

		await dominationRef(id).update(valuesWithTimestamp);

		const dominationSnapshot = await dominationRef(id).get();

		setDomination(domination.map(d => d.id === id ? docWithId(dominationSnapshot) : d));

		return docWithId(dominationSnapshot);
	}

  const deleteDomination = async (variables) => {
		const { id } = variables;
		
		await dominationRef(id).delete();
		
		setDomination(domination.filter(d => d.id !== id));
		
		return variables;
  	}

  	const dominationContext = { domination, addDomination, updateDomination, deleteDomination }

  	return <DominationContext.Provider value={dominationContext}>{props.children}</DominationContext.Provider>
}

export const { Consumer: DominationContextConsumer } = DominationContext
export const useDomination = () => useContext(DominationContext)
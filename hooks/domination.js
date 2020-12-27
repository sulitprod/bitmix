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
export const DominationsContext = createContext();
export const DominationContextProvider = (props) => {
	const [dominations, setDominations] = useState(props.dominations);

	useEffect(
		() => dominationCollection().onSnapshot(snapshot => getCollectionItems(dominationCollection()).then(setDominations)),
		[]
	);

	const addDomination = async (variables) => {
		const valuesWithTimestamp = { ...variables, dateCreated: firebase.firestore.FieldValue.serverTimestamp() }
		const newDominationRef = await dominationCollection().add(valuesWithTimestamp);
		const newDominationSnapshot = await newDominationRef.get();
		
		setDominations([ ...dominations, docWithId(newDominationSnapshot) ]);
		
		return docWithId(newDominationSnapshot);
	}

	const updateDomination = async (variables) => {
		const { id, ...values } = variables;
		const valuesWithTimestamp = { ...values, dateUpdated: firebase.firestore.FieldValue.serverTimestamp() }

		await dominationRef(id).update(valuesWithTimestamp);

		const dominationSnapshot = await dominationRef(id).get();

		setDominations(dominations.map(domination => domination.id === id ? docWithId(dominationSnapshot) : domination));

		return docWithId(dominationSnapshot);
	}

  const deleteDomination = async (variables) => {
		const { id } = variables;
		
		await dominationRef(id).delete();
		
		setDominations(dominations.filter(domination => domination.id !== id));
		
		return variables;
  }

  const dominationsContext = { dominations, addDomination, updateDomination, deleteDomination }

  return <DominationsContext.Provider value={dominationsContext}>{props.children}</DominationsContext.Provider>
}

export const { Consumer: DominationsContextConsumer } = DominationsContext
export const useDominations = () => useContext(DominationsContext)
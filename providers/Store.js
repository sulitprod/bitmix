import { createContext, useContext } from 'react';
import Store from '../store';
import { isClient } from '../utils';

let store;
const StoreContext = createContext();
const useStore = () => useContext(StoreContext);
const StoreProvider = ({ children, initialState: initialData }) => {
	const store = initializeStore(initialData);

	return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

const initializeStore = (initialData = null) => {
	const _store = store ?? new Store();

	if (initialData) _store.hydrate(initialData);
	if (!isClient()) return _store;
	if (!store) store = _store;

	return _store;
}

export {
	StoreContext,
	StoreProvider,
	useStore
}
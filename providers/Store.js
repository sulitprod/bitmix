import { createContext, useContext } from 'react';
import Store from '../stores/Store';
import { isClient } from '../utils';

let store;
const StoreContext = createContext();
const useStore = () => useContext(StoreContext);
const useUser = () => useContext(StoreContext).session;
const StoreProvider = ({ children, initialState }) => {
	const store = initializeStore(initialState);

	return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

const initializeStore = (initialState = null) => {
	const _store = store ?? new Store();

	if (initialState) _store.init(initialState);
	if (!isClient()) return _store;
	if (!store) store = _store;

	return _store;
}

export {
	StoreContext,
	StoreProvider,
	useStore,
	useUser
}
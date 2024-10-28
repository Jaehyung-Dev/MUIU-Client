import {configureStore, combineReducers} from '@reduxjs/toolkit';
import memberSlice from '../slices/memberSlice';
import mindColumnSlice from '../slices/mindColumnSlice'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer
} from 'redux-persist';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

import memberSlice from '../slices/memberSlice';
import storageSession from 'redux-persist/es/storage/session';

const reducers = combineReducers({
    memberSlice,
    mindColumnSlice
});

const persistConfig = {
    key: 'root',
    storage: storageSession
};

const persistreducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistreducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE, REGISTER]
            }
        })
});
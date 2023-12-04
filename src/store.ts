import { configureStore,ThunkAction,Action, combineReducers } from '@reduxjs/toolkit'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import authReducer from 'features/auth/authSlice'
import blogReducer from 'pages/blog/blog.slice'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import { history } from 'utils'
import dashboardReducer from 'features/dashboard/dashboardSlice'
import studentReducer from 'features/student/studentSlice'
import cityReducer from 'features/city/citySlice'



const rootReducer = combineReducers({
  router: connectRouter(history),
  blog:blogReducer,
  auth: authReducer,
  dashboard:dashboardReducer,
  student: studentReducer,
  city:cityReducer
});

const sagaMiddleware=createSagaMiddleware()
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware,routerMiddleware(history))
})
sagaMiddleware.run(rootSaga)


// Lấy RootState và AppDispatch từ store của chúng ra
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

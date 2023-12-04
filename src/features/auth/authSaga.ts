import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { all, call, delay, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { login, loginSuccess, loginFailed, logout, LoginPayload } from './authSlice';

function* handleLogin(action: PayloadAction<any>) {
  console.log('handle login', action)
  try {
    yield delay(1000);

    localStorage.setItem('access_token', 'fake_token');
    yield put(
      loginSuccess({
        id: 1,
        name: 'Easy Frontend',
      })
    );

    // redirect to admin page
    yield put(push('/admin/dashboard'));
  } catch (error) {
    yield put(loginFailed((error as Error).message));
  }

  yield take(logout.type);
  yield call(handleLogout);

}

function* handleLogout() {
  console.log('handle logout')
  yield delay(500);
  localStorage.removeItem('access_token');
  // redirect to login page
  yield put(push('/login/dashboard'));
}

// function* watchLoginFlow() {
//   while (true) {
//     const isLoggedIn = Boolean(localStorage.getItem('access_token'));

//     if (!isLoggedIn) {
//       const action: PayloadAction<LoginPayload> = yield take(login.type);
//       yield fork(login, action.payload);
//     }

//     yield take(logout.type);
//     yield call(handleLogout);
//   }
// }

export default function* authSaga() {
  console.log(login.type);

  yield all([takeLatest(login.type, handleLogin)]);
}
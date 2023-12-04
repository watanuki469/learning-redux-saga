import { Button } from '@material-ui/core';
import cityApi from 'api/cityApi';
import Blog from 'pages/blog'
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import { LoginPage } from 'features/auth/pages/LoginPage';
// import LoginPage from 'features/auth/pages/LoginPage';
import React, { useEffect } from 'react';
import { Route, Switch,Redirect} from 'react-router-dom';
import { logout } from 'features/auth/authSlice';
import { useAppDispatch } from 'hooks';


function App() {
  // useEffect(() => {
  //   cityApi.getAll().then((response) => console.log(response));
  // });
  return (
    <>
    
      {/* <Blog /> */}
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>

        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  )
}

export default App;




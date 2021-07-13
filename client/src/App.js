import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import AuthPage from './pages/AuthPage';
import SignupPage from './pages/SignupPage';
import Layout from './Layout/Layout';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          {!authCtx.isLoggedIn && (
            <Route path="/auth">
              <AuthPage />
            </Route>
          )}
          {authCtx.isLoggedIn && (
            <Route path="/user">
              <UserPage />
            </Route>
          )}
          {authCtx.isLoggedIn && (
            <Route path="/admin">
              <AdminPage />
            </Route>
          )}
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Layout>
  );
}

export default App;

import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import AuthPage from './pages/AuthPage';
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
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            {!authCtx.isLoggedIn && (
              <Route exact path="/auth">
                <AuthPage />
              </Route>
            )}
            {authCtx.isLoggedIn && (
              <Route exact path="/admin">
                <AdminPage />
              </Route>
            )}
            {authCtx.isLoggedIn && (
              <Route exact path="/user">
                <UserPage />
              </Route>
            )}
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </div>
    </Layout>
  );
}

export default App;

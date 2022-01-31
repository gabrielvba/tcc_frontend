import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/homepage';
import Profile from './pages/profile';
import SchoolRecords from './pages/schoolRecords';
import EditProfile from './pages/editProfile';

const queryClient = new QueryClient();
toast.configure();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <main>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/schoolRecords">
                <SchoolRecords />
              </Route>
              <Route exact path="/editProfile">
                <EditProfile />
              </Route>
            </Switch>
          </main>
        </Router>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}

export default App;

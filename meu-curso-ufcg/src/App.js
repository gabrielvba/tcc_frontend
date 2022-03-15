import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/homepage';
import Profile from './pages/profile';
import SchoolRecords from './pages/schoolRecords';
import EditProfile from './pages/editProfile';
import Disciplines from './pages/disciplines';
import Course from './pages/course';
import EditDiscipline from './pages/editDiscipline';
import EdiCourse from './pages/editCourse';
import Search from './pages/search';

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
              <Route path="/editDiscipline/:id">
                <EditDiscipline />
              </Route>
              <Route path="/course/:id/createDiscipline">
                <EditDiscipline create />
              </Route>
              <Route path="/editCourse/:id">
                <EdiCourse />
              </Route>
              <Route path="/createCourse">
                <EdiCourse create />
              </Route>
              <Route exact path="/disciplines">
                <Disciplines />
              </Route>
              <Route path="/seeCourse/:id">
                <Course seeCourse />
              </Route>
              <Route path="/course/:id">
                <Course />
              </Route>
              <Route path="/disciplines/course/:id">
                <Disciplines />
              </Route>
              <Route path="/search">
                <Search />
              </Route>
              <Route path="/changeCourse">
                <Search change />
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

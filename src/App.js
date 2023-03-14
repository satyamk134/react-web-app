import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomeLayout from './Layouts/HomeLayout'
import AppLayout from './Layouts/AppLayout';
import AppLayoutWithSideDrawer from './Layouts/AppLayoutWithSideDrawer';
import SimpleBackdrop from './Basic-components/BackdropSpinner'
import './App.css';
import BookSlot from './components/BookSlot';
function App() {
  return (
    <div className="App">
       <Router>
        <Route  path="/">
          <HomeLayout />
        </Route>
        <Route  path="/app">
          <AppLayout />
        </Route>
        <Route  path="/my-account">
          <AppLayoutWithSideDrawer />
        </Route>
       
      </Router>
    </div> 
  );
}

export default App;

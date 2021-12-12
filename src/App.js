import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import  HomeLayout from  './Layouts/HomeLayout'
import './App.css';

import BookSlot from './components/BookSlot';
import Test from './components/TestComponent';
function App() {
  return (
    <div className="App">
       <Router>
       <Route  path="/">
          <HomeLayout />
        </Route>
      </Router>
    </div> 
  );
}

export default App;

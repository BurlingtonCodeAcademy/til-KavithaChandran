//import 
import { Route, Switch } from 'react-router-dom'
import './styles/App.css';
import Home from './components/Home'
import NavBar from './components/NavBar'
import EditDelete from './components/EditDelete'
import Facts from './components/Facts'
import NotFound from './components/404'
import Login from './components/Login'
function App() {
  
  return (

    <div id='main-container'>


      <NavBar />
      <Switch>
        

        {/*Route directing the user to Home Page */}
        <Route exact path={'/'} component={Home} />
        {/*Route directing the user to Facts Page */}
        <Route path={"/Facts"} component={Facts} />
        {/*Route directing the user to specific entry page Page */}
        <Route path={"/EditDelete"} component={EditDelete} />
         {/*Route directing the user to login Page */}
        <Route path={"/login"} component={Login} />
        {/*when the route is not found, it displays and takes you to the to the 404 page */} 
        <Route path={"*"} component={NotFound} />
      </Switch>
    </div>



  );
}


export default App;

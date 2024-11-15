import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";
import Highlights from './components/Highlights';
import WatchScreen from './components/WatchScreen';
import { useSelector } from 'react-redux';
import ApiService from './api/api';

const RenderLayout = ({children}) => {
  return(
    <div className='homePage'>
      <Header />
      {children}
    </div>
  )
  

}


function App() {
  const selector = useSelector((state) => state.watchScreenState)
  const apiService = new ApiService();
  
  return (
    <Router>

        <Routes>
          
          <Route 
            exact path='/' 
            element={
              <RenderLayout>
                <HomePage />
              </RenderLayout>
            } 
          />

          <Route 
            exact path='/highlights' 
            element={
              <RenderLayout>
                <Highlights />
              </RenderLayout>
            } 
          />

          <Route
            exact path='/watch'
            element={
              <RenderLayout>
                <WatchScreen />
              </RenderLayout>
            }

          />


          <Route 
            path="*" 
            element={ 
              <Navigate to="/" /> 
            } 
          />

        </Routes>
    
    </Router>

  )

      
      
      {/* {header} */}
      {/* {sidebar} */}
      {/* {Recvids} */}
}

export default App;

// element={
//   <div className='homePage'>
//     <Header />
//     <HomePage />
//   </div>

// }

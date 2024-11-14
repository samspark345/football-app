import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Highlights from './components/Highlights';
import WatchScreen from './components/WatchScreen';
import LoginPage from './components/Login-page/LoginPage';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';




function App() {
  const auth = getAuth()
  const [user, setUser] = useState(auth.currentUser);


  const RenderLayout = ({children}) => {
    return(
      <div className='homePage'>
        <Header signOutFunction={signOutUser}/>
        {children}
      </div>
    )
    
  }

  const signOutUser = () => {
    signOut(auth).then(() => {
      setUser(null)
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [auth]);
  
  return (
    <Router>
        <Routes>

          {!user? (
            <>

              <Route
                exact path='/login'
                element={
                  <LoginPage />
                }

              />

  
              <Route 
                path="*" 
                element={ 
                  <Navigate to="/login" /> 
                } 

              />

            </>
          ) :
          ( 
          <>
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

          </> )

          }

        </Routes>
    
    </Router>

  )

}

export default App;


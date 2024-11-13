import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate
} from "react-router-dom";
import Highlights from './components/Highlights';
import WatchScreen from './components/WatchScreen';
import LoginPage from './components/Login-page/LoginPage';
import SignUpPage from './components/Login-page/SignUp';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';




function App() {
  const selector = useSelector((state) => state.watchScreenState)
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

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setUser(user)
      // ...
    } else {
      // User is signed out
      // ...
      setUser(null)
    }
  });
  
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
                  exact path='/signup'
                  element={
                    <SignUpPage />
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

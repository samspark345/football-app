import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import "./App.css";
import ApiService from "./api/api";
import Header from "./components/Header";
import Highlights from "./components/Highlights";
import HomePage from "./components/HomePage";
import LoginPage from "./components/Login-page/LoginPage";
import MyTeams from "./components/MyTeams";
import TeamPage from "./components/TeamPage";
import WatchScreen from "./components/WatchScreen";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import TeamSelect from "./components/TeamSelect";

function App() {
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);

  const RenderLayout = ({ children }) => {
    return (
      <div className="homePage">
        <Header signOutFunction={signOutUser} />
        {children}
      </div>
    );
  };

  const signOutUser = () => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };

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
    <MantineProvider>
      <Router>
        <Routes>
          {!user ? (
            <>
              <Route exact path="/login" element={<LoginPage />} />

              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route
                exact
                path="/"
                element={
                  <RenderLayout>
                    <HomePage />
                  </RenderLayout>
                }
              />

              <Route
                exact
                path="/highlights"
                element={
                  <RenderLayout>
                    <Highlights />
                  </RenderLayout>
                }
              />

              <Route
                exact
                path="/watch"
                element={
                  <RenderLayout>
                    <WatchScreen />
                  </RenderLayout>
                }
              />

              <Route
                exact
                path="/myteams"
                element={
                  <RenderLayout>
                    <MyTeams />
                  </RenderLayout>
                }
              />

              <Route
                exact
                path="/teamSelect"
                element={
                  <RenderLayout>
                    <TeamSelect />
                  </RenderLayout>
                }
              />

              <Route
                exact
                path="/myteams/team/:teamId"
                element={
                  <RenderLayout>
                    <TeamPage />
                  </RenderLayout>
                }
              />

              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;

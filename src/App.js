import { useSelector } from "react-redux";
import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Highlights from "./components/Highlights";
import HomePage from "./components/HomePage";
import MyTeams from "./components/MyTeams";
import WatchScreen from "./components/WatchScreen";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const RenderLayout = ({ children }) => {
  return (
    <div className="homePage">
      <Header />
      {children}
    </div>
  );
};

function App() {
  const selector = useSelector((state) => state.watchScreenState);
  return (
    <MantineProvider>
      <Router>
        <Routes>
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
            path="/teams"
            element={
              <RenderLayout>
                <MyTeams />
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

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </MantineProvider>
  );

  {
    /* {header} */
  }
  {
    /* {sidebar} */
  }
  {
    /* {Recvids} */
  }
}

export default App;

// element={
//   <div className='homePage'>
//     <Header />
//     <HomePage />
//   </div>

// }

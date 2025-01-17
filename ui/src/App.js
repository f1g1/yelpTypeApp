import React, { useState, useEffect } from "react";
import PlaceMain from "./components/PlacePage/PlaceMain";
import ImageGallery from "./components/PlacePage/ImageGallery";
import SearchPage from "../src/components/SearchPage/SearchPage";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./components/Resuables/Theme";
import { Router, Redirect, navigate } from "@reach/router";
import NavBar from "./components/Resuables/NavBar/NavBar";
import Login from "./components/Login/Login";
import { GeneralService } from "./services/GeneralService";
import { UserService } from "./services/UserService";

export const AuthContext = React.createContext({
  isAuth: false,
  toggleLogOff: () => {}
});

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {({ isAuth }) =>
      isAuth ? <Component {...rest} /> : <Redirect from="" to="login" noThrow />
    }
  </AuthContext.Consumer>
);

const PublicRoute = ({ component: Component, ...rest }) => (
  <Component {...rest} />
);

function App() {
  const [auth, setauth] = useState();
  const [userId, setuserId] = useState("");
  GeneralService.WarmUp();
  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      setauth(true);
      setuserId(user);
    }
  }, []);

  const toggleLogOff = () => {
    setauth(false);
  };

  let handleLogin = (user, pass) => {
    var x = UserService.login({ email: user, password: pass, toggleLogOff });
    if (x) {
      setauth(true);
      setuserId(x.id);
      navigate("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuth: auth, userId: userId, toggleLogOff: toggleLogOff }}
    >
      <ThemeProvider theme={theme}>
        {auth && <NavBar />}
        <Router>
          <PublicRoute
            path="/login"
            component={Login}
            handleLogin={handleLogin}
          />
          <ProtectedRoute path="/" component={SearchPage} />
          <PlaceMain path="/place/:placeId" />
          <ImageGallery path="/gallery/:placeId" />
        </Router>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;

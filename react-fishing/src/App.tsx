import React from "react";
import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { HeaderContainer } from "./layouts/HomePage/components/HeaderContainer";
import { Carousel } from "./layouts/HomePage/components/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Heros } from "./layouts/HomePage/components/Heros";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { HomePage } from "./layouts/HomePage/HomePage";
import { SearchFishPage } from "./layouts/SearchFishPage/SearchFishPage";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { FishInformationPage } from "./layouts/FishInformationPage/FishInformationPage";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, Security } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";
import { CatchPage } from "./layouts/CatchPage/CatchPage";
import { UserProfilePage } from "./layouts/UserProfilePage/UserProfilePage";
import { UserProvider } from "./Auth/UserContext";

// Initialization of OktaAuth with configuration.
const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  // Custom authentication handler to redirect to the login page.
  const customAuthHandler = () => {
    history.push("/login");
  };
  const history = useHistory();

  // Function to restore the original URI after authentication.
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={customAuthHandler}
      >
        <UserProvider>
          <Navbar />
          <div className="flex-grow-1">
            <Switch>
              <Route path="/" exact>
                <Redirect to="/home" />
              </Route>
              <Route path="/home">
                <HomePage />
              </Route>
              <Route path="/search">
                <SearchFishPage />
              </Route>
              <Route path="/FishInformationPage/:fishId">
                <FishInformationPage />
              </Route>
              <Route path="/catch">
                <CatchPage />
              </Route>
              <Route path="/userprofile">
                <UserProfilePage />
              </Route>
              <Route
                path="/login"
                render={() => <LoginWidget config={oktaConfig} />}
              />
              <Route path="/login/callback" component={LoginCallback} />
            </Switch>
          </div>
          <Footer />
        </UserProvider>
      </Security>
    </div>
  );
};

export default App;

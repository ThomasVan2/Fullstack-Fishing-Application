import { Redirect } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";
import OktaSignInWidget from "./OktaSignInWidget";
import checkOrCreateUser from "../layouts/Utils/checkOrCreateuser";
import { useUser } from "./UserContext";

// Integrates Okta's login widget for authentication,
// handles user authentication success or failure, and redirects or displays errors accordingly.
const LoginWidget = ({config }) => {


    const {oktaAuth, authState} = useOktaAuth();
    // Setup for using the global user state management hook.
    const {setUser} = useUser();

    const onSuccess = async (tokens) => {

        oktaAuth.handleLoginRedirect(tokens);

       try {
            const userInfo = await oktaAuth.getUser();
            
            const userSub = userInfo.sub; 

            // Checks if the authenticated user exists in the database; if not, creates a new user entry.
            const userData = await checkOrCreateUser(userSub);

            // Updates the global user state with the fetched or created user data.
            setUser(userData);
    
          } catch (error) {
            console.error("Error handling user check/create:", error);
          } 
         
    };


    const onError = (err) => {

        console.log('Sign in error:' , err);

    }


    if(!authState) {
        return(<SpinnerLoading/>);
    } 

    return authState.isAuthenticated ? 
    <Redirect to={{pathname: '/'}}/>
    :
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError}/>;

};

export default LoginWidget;
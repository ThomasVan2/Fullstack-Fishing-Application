import { useEffect, useRef } from "react";
import OktaSignIn from "@okta/okta-signin-widget";
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { oktaConfig } from "../lib/oktaConfig";

// This component integrates the Okta Sign-In Widget into a React application
const OktaSignInWidget = ({ onSuccess, onError }) => {
    
    // Creating a ref to attach the Okta widget to the DOM
    const widgetRef = useRef(); 

    useEffect(() => {
        if (!widgetRef.current) {
            return false;
        }

        const widget = new OktaSignIn(
            
            {
            ...oktaConfig, // Spread operator to include all Okta configuration settings
            features: {
                registration: true // Enables self-service registration
            }
            
        });

        // Mount the widget to the DOM element and set up event handlers
        widget.showSignInToGetTokens({

            el: widgetRef.current,
        }).then(onSuccess).catch(onError);

        // Cleanup function to remove the widget from the DOM on component unmount or when dependencies change
        return () => widget.remove();
        
    }, [onSuccess, onError]);

    return (
        <div className="container mt-5 mb-5">
            <div ref={widgetRef}></div>
        </div>
    );
};

export default OktaSignInWidget;

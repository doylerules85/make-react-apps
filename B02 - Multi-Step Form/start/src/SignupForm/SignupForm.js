import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ProfileForm from './ProfileForm'
import Review from './Review'
import { SignupFormProvider } from './SignupFormContext'
import SocialForm from './SocialForm'
import StepLinks from './StepLinks'
 
function SignupForm() {
    const location = useLocation();
    return (
    <SignupFormProvider>
        <div className="signup-form">
            {/* show the steps and links */}
            <StepLinks/>
            {/* show the forms - validate forms and store in higher level state */}
            <AnimatePresence>
                <Switch location={location} key={location.pathname}>
                    <Route path="/" exact component={ProfileForm}/>
                    <Route path="/social" component={SocialForm}/>
                    <Route path="/review" component={Review}/>
                </Switch>
            </AnimatePresence>
        </div>
    </SignupFormProvider>
    )
};

export default SignupForm
import React, {createContext} from 'react';
import { useState } from 'react';
import { useContext } from 'react';

// creating context 
export const SignupFormContext = createContext();
// custom react hook to apply use context easier in our app - no need to import useContext in other files
export const useSignupForm = () => useContext(SignupFormContext);

export function SignupFormProvider({children}){
    // store state here - using useState
    const [profile, setProfile ] = useState({});
    const [social, setSocial ] = useState({});

    return (
        // wrap our app with context provider
        <SignupFormContext.Provider value={{ profile,setProfile,social,setSocial }}>
            {children}
        </SignupFormContext.Provider>
    )
}
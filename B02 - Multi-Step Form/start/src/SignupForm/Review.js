import React from 'react'
import Animator from './Animator';
import { useSignupForm } from './SignupFormContext'
 
function Review() {

    const {social, profile} = useSignupForm();

    function handleSubmit(e){
        e.preventDefault();
        alert('cool! submitting now!');
    }

    return (
        <Animator>
             <form onSubmit={handleSubmit}>
                <h2>Review Your Information</h2>
                <p> <strong>Name:</strong> {profile.name}</p>
                <p> <strong>Email:</strong> {profile.email}</p>
                <p> <strong>Twitter:</strong> {social.twitter}</p>
                <p> <strong>Facebook:</strong> {social.facebook}</p>
                <input type="submit" value="submit all info"/>
            </form>
        </Animator>
    )
};
 
export default Review
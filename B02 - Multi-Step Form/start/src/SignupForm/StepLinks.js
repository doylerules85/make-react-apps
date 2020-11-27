import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSignupForm } from './SignupFormContext'

function isEmpty(obj){
    return Object.keys(obj).length === 0;
}
 
function StepLinks() {
    const {profile, social} = useSignupForm();

    const isProfileDone = !isEmpty(profile);
    const isSocialDone = !isEmpty(social);

    return (
        <div className="step-links">
            <NavLink to="/" exact>{isProfileDone ? '✅' : '⭕️' } Step 1 </NavLink> 
            { isProfileDone
                ? 
                <NavLink to="/social">{isSocialDone ? '✅' : '⭕️' } Step 2 </NavLink> 
                : 
                <a>Step 2 </a> 
            }
            { isProfileDone && isSocialDone 
                ? 
                <NavLink to="/review"> Step 3 🏁</NavLink> 
                : 
                <a>Review</a> 
            }
        </div>
    )
};
 
export default StepLinks
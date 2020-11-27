import React from 'react'
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import { useSignupForm } from './SignupFormContext';
import Animator from './Animator';
 
function ProfileForm() {

    const {register, handleSubmit, errors} = useForm();
    const history = useHistory();
    //apply custom useSignupForm hook for our context
    const {profile, setProfile} = useSignupForm();

    // on submit handler
    function onSubmit(data){
        setProfile(data);
        history.push('/social');
    }

    return (
        <Animator> 
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Tell us about yourself</h2>
                
                <label style={{width: '100%'}} htmlFor="name">Name</label>
                <input defaultValue={profile.name} id="name" type="text" name="name" placeholder="whats's your name?" ref={register({required: true})}/>
                <p>{errors.name && 'need your name yo.'}</p>

                <label style={{width: '100%'}}  htmlFor="email">Email</label>
                <input defaultValue={profile.email} id="email" type="email" name="email" placeholder="whats's your email?" ref={register({required: true})}/>
                <p>{errors.email && 'need your email yo.'}</p>

                <input type="submit" value="next"/>
            </form>  
        </Animator>
    )
};
 
export default ProfileForm
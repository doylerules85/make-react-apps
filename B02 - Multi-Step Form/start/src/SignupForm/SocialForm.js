import React from 'react'
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import Animator from './Animator';
import { useSignupForm } from './SignupFormContext';
 
function SocialForm() {
    const {register, handleSubmit, errors} = useForm();
    const history = useHistory();
    const {social, setSocial} = useSignupForm();

    // on submit handler
    function onSubmit(data){
        setSocial(data);
        history.push('/review');
    }

    return (
        <Animator>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Tell us about yourself</h2>
                
                <label style={{width: '100%'}} htmlFor="twitter">twitter</label>
                <input id="twitter" defaultValue={social.twitter} type="text" name="twitter" placeholder="whats's your twitter?" ref={register({required: true})}/>
                <p>{errors.twitter && 'need your twitter yo.'}</p>

                <label style={{width: '100%'}}  htmlFor="facebook">facebook</label>
                <input id="facebook" defaultValue={social.facebook} type="text" name="facebook" placeholder="whats's your facebook?" ref={register({required: true})}/>
                <p>{errors.facebook && 'need your facebook yo.'}</p>

                <input type="submit" value="next"/>
            </form>
        </Animator>
    )
};
 
export default SocialForm
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import ModalContainer from "../../components/ModalContainer";
import FormItem from "../../components/FormItem";
import Button from '../../components/Button';
import { toast } from 'react-toastify';

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    function onChange(e){
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    async function onSubmit(e){
        e.preventDefault();
        try{
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if(userCredential.user){
                toast.success('success login');
                navigate('/home');
            }
        }catch(e){
            toast.error('something went wrong with credentials');
        }
    };

    return(
        <ModalContainer title='SignIn'>
            <form onSubmit={onSubmit} className="flex flex-col">
                <FormItem label='Email'
                            id='email'
                            placeHolder='please write your email'
                            onChange={onChange}
                />
                <FormItem label='Password'
                            id='password'
                            type='password'
                            placeHolder='please write your password'
                            onChange={onChange}
                />
                <div className="flex flex-col lg:flex-row gap-4 justify-between m-4">
                    <p>Don't have an account? <Link className='text-red-700' to='/signup'>Register</Link></p>
                    <Link to='/forgetpassword' className='text-blue-700'>Forget Password</Link>
                </div>
                <Button title='SignIn' type='submit' className='bg-blue-700 text-white p-2 m-4'/>
                <div className='flex m-4 text-slate-500 font-medium items-center before:w-1/2 before:h-0.5 before:bg-slate-400 after:w-1/2 after:h-0.5 after:bg-slate-400 '>OR</div>
                <Button title='Continue with GOOGLE' type='button' className='bg-red-700 text-white p-2 m-4'/>
            </form>
        </ModalContainer>
    )
}

export default SignIn;
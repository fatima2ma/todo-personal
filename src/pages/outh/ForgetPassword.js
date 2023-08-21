import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import ModalContainer from "../../components/ModalContainer";
import FormItem from "../../components/FormItem";
import Button from '../../components/Button';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    function onChange(e){
        setEmail(e.target.value);
    }

    async function onSubmit(e){
        e.preventDefault();
        try{
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            toast.success('email was sent');
        }catch(e){
            toast.error('some went wrong');
        }
    }
    return(
        <ModalContainer title='Reset Password'>
            <form onSubmit={onSubmit} className="flex flex-col">
                <FormItem label='Email'
                            id='email'
                            placeHolder='please write your email'
                            onChange={onChange}
                />
                <div className="flex flex-col lg:flex-row gap-4 justify-between m-4">
                    <p>Don't have an account? <Link className='text-red-700' to='/signup'>Register</Link></p>
                    <Link onClick={()=>navigate(-1)} className='text-blue-700'>Back</Link>
                </div>
                <Button title='Send' type='submit' className='bg-blue-700 text-white p-2 m-4'/>
                <div className='flex m-4 text-slate-500 font-medium items-center before:w-1/2 before:h-0.5 before:bg-slate-400 after:w-1/2 after:h-0.5 after:bg-slate-400 '>OR</div>
                <Button title='Continue with GOOGLE' type='button' className='bg-red-700 text-white p-2 m-4'/>
            </form>
        </ModalContainer>
    )
}

export default ForgetPassword;
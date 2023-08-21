import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getAuth, 
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup } from 'firebase/auth';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import ModalContainer from "../../components/ModalContainer";
import FormItem from "../../components/FormItem";
import Button from '../../components/Button';
import { getDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';


const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const {name, email, password} = formData;

    function onChange(e){
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    async function onSubmit(e){
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                const user = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName: name,
                });
                const formDataCopy = {...formData};
                delete formDataCopy.password;
                formDataCopy.timeStamp = serverTimestamp();
                await setDoc(doc(db, "users", user.uid), formDataCopy);
                toast.success(`welcome ${user.name}`);
                Navigate('/home');
            }catch(error){
                toast.error('something went wrong with registeration');
            };
    }

    async function signUpWithGoogle(){
        try{
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            // check for the user
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if(!docSnap.exists()){
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timeStamp: serverTimestamp(),
                });
            }
        }catch(e){
            toast.error(e.meassge);
        }
        

    }
    return(
        <ModalContainer title='SignUp'>
        <form className="flex flex-col" onSubmit={onSubmit}>
            <FormItem label='User Name'
                        id='name'
                        placeHolder='please write your user name'
                        onChange={onChange}
            />
            <FormItem label='Email'
                        id='email'
                        placeHolder='please write your email'
                        onChange = {onChange}
            />
            <FormItem label='Password'
                        id='password'
                        type={'password'}
                        placeHolder='please write your password'
                        onChange = {onChange}
            />
            <div className="flex justify-between m-4">
                <p>Alraedy have an account? <Link className='text-red-700' to='/signin'>LogIn</Link></p>
            </div>
            <Button title='SignUp' type='submit' className='bg-blue-700 text-white p-2 m-4'/>
            <div className='flex m-4 text-slate-500 font-medium items-center before:w-1/2 before:h-0.5 before:bg-slate-400 after:w-1/2 after:h-0.5 after:bg-slate-400 '>OR</div>
            <button title='Continue with GOOGLE' type='button' onClick={signUpWithGoogle} className='bg-red-700 text-white p-2 m-4'>Continue with GOOGLE</button>
        </form>
    </ModalContainer>
    )
}

export default SignUp;
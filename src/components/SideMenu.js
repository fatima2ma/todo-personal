import { useState, useContext } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import {doc, updateDoc} from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import IsClosedSideContext from '../context/IsClosedSide';
// import Button from './Button';
import {AiOutlineClose} from 'react-icons/ai';
import { toast } from 'react-toastify';
function SideMenu(){
    const navigate = useNavigate();
    const auth = getAuth();

    // const [sidebarvisible, setPassVisible] = useState(true);
    const {isClosed, setIsClosed} = useContext(IsClosedSideContext);
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });

    const {name, email} = formData;

    function handleSidebar(){
        setIsClosed(false);
    };
    function onChange(e){
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    function logout(){
       auth.signOut();
       toast.success('signout');
        navigate('/');
    };

    async function onSubmit(){
        // e.preventDefault();
        try{
            if(auth.currentUser.displayName !== name){
                await updateProfile(auth.currentUser, {displayName: name,});
                const docRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(docRef,{name,});
            }
            toast.success('informations updated successfully');
        }catch(e){
            toast.error('something went wrong');
        }
    }
    return(
        <div className={`bg-gray-800 overflow-hidden rounded-md text-white h-full absolute ease-in-out duration-200 end-0 ${isClosed? 'w-1/5 p-2' : 'w-0 p-0'}`}>
            <div className={`SideMenuHead p-2 flex justify-between items-center ease-in-out duration-200 ${isClosed? 'translate-x-0':'translate-x-full'}`}>
                <h4 className="mt-12">Profile</h4>
                <AiOutlineClose className="self-start cursor-pointer" onClick={handleSidebar}/>
            </div>
            <form className={`profileForm flex flex-col gap-2 m-2 after:w-full after:bg-gray-600 after:h-px after:my-4 ease-in-out duration-200 ${isClosed? 'translate-x-0':'translate-x-full'}`}>
                <input type="text" name="name" id="name" value={name} placeholder="name" 
                    className="rounded-md text-gray-800 p-2 border-0 ring-0 shadow-0 outline-0"
                    onChange={onChange}/>
                <input type="email" name="email" id="email" value={email} placeholder="email"
                    className="rounded-md text-gray-800 p-2 border-0 ring-0 shadow-0 outline-0"
                    onChange={onChange}/>
                <button type="button" onClick={onSubmit} className={`bg-gray-700 p-2 w-1/4 self-end text-white rounded-md ease-in-out duration-200  ${isClosed? 'translate-x-0':'translate-x-full'}`}>Edit</button>
            </form>
            <button 
                type='button'
                className='bg-red-600 hover:bg-red-700 text-white p-2 w-full'
                onClick={logout}>logout</button>
        </div>
    );
};

export default SideMenu;
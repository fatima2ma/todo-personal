import Lists from "./Lists";
import SideMenu from "../components/SideMenu";
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { db } from '../firebase.config';
// import { getAuth } from 'firebase/auth';
// import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
// import { AiOutlineCheck } from 'react-icons/ai';
// import Spinner from '../components/Spinner';
// import { toast } from 'react-toastify';

function Home(){
    // const [loading, setLoading] = useState(false);
    // const [formDate, setFormData] = useState({
    //     title: '',
    // });

    // const auth = getAuth();
    // const navigate = useNavigate();

    // function onChange(e){
    //     setFormData((prevState) => ({
    //         [e.target.id]: e.target.value,
    //     }))
    // }

    // async function onSubmit(e){
    //     e.preventDefault();
    //     setLoading(true);
    //     const formDataCopy = {
    //         ...formDate,
    //         userRef: auth.currentUser.uid,
    //         timeStamp: serverTimestamp(),
    //     };
    //     console.log(formDataCopy);
    //     await addDoc(collection(db, 'lists'), formDataCopy);
    //     setLoading(false);
    //     toast.success('list added successfully');
    // }
    return(
        <>
            <SideMenu/>
            <div className="listsCont w-full overflow-auto flex relative">
                <div className="flex gap-2">
                    <Lists/>
                    {/* <div className="addListForm h-max bg-gray-800 w-2/6 rounded-md text-white px-2 py-2">
                        <form onSubmit={onSubmit} className='addList flex items-center gap-2 my-4'> 
                            <input onChange={onChange} type='text' className='grow rounded-md px-2 py-2 bg-gray-700' placeholder='add new list' id='title' name='title'/>
                            <button type='submit' className='ring-1 ring-white py-1 rounded-md px-2 hover:bg-gray-700 hover:ring-gray-700'>Add</button>
                        </form>
                        {loading && <Spinner/>}
                    </div> */}
                </div>
            </div>
        </>
    )
};

export default Home;
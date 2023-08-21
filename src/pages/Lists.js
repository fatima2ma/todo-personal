import List from "../components/List";
import { useState, useEffect} from 'react';
import { db } from '../firebase.config';
import { getAuth } from 'firebase/auth';
import { addDoc, 
    collection, 
    serverTimestamp,
    doc,
    getDocs,
    where,
    orderBy,
    deleteDoc,
    updateDoc, 
    query} from 'firebase/firestore';
import { AiOutlineClose, AiOutlineSwitcher } from 'react-icons/ai';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

function Lists(){

    const [loading, setLoading] = useState(true);
    const [formDate, setFormData] = useState({title: '',});
    const [lists, setLists] = useState([]);
    const [minimiz, setMinimiz] = useState(false);
    const [minimizId, setMinimizId] = useState([]);

    const auth = getAuth();

    function onChange(e){
        console.log('onchange lists');
        setFormData((prevState) => ({
            [e.target.id]: e.target.value,
        }))
    }

    async function fetchLists(){
        const listRef = collection(db, "lists");
        const q = query(listRef, 
            where("userRef", "==", auth.currentUser.uid),
            orderBy("timeStamp", "asc"));
        const querySnap = await getDocs(q);
            let lists = [];
            querySnap.forEach((elem) => {
                return lists.push({
                    id: elem.id,
                    data: elem.data(),
                });
            });
        setLists(lists);
        setLoading(false);
    }

    useEffect(() => {
        console.log('fetch lists');
        fetchLists();
    },[]);

    async function onSubmit(e){
        e.preventDefault();
        console.log('onsubmit lists');
        setLoading(true);
        const formDataCopy = {
            ...formDate,
            userRef: auth.currentUser.uid,
            timeStamp: serverTimestamp(),
        };
        await addDoc(collection(db, 'lists'), formDataCopy);
        setLists({...lists, formDataCopy});
        fetchLists();
        setLoading(false);
        e.target.reset();
        toast.success('list added successfully');
    }

    async function updateList(e, list){
        console.log('update list');
        if(e.key == "Enter" && !e.shiftKey){
            e.preventDefault();
            let newTitle = e.target.innerText;
            const listRef = doc(db, "lists", list.id);
            await updateDoc(listRef, {"title": newTitle});
            fetchLists();
        }
    }

    async function deleteList(listId){
        await deleteDoc(doc(db, 'lists', listId));
        const listsCopy = lists.filter(list => list.id !== listId);
        setLists(listsCopy);
        toast.success('list deleted successfully'); 
    }

    function handleMinimiz(listId){
        setMinimiz(!minimiz);
        if(minimizId.includes(listId)) {
            const execludeId = minimizId.filter(item => item !== listId)
            setMinimizId(execludeId);
        }else{
            setMinimizId([...minimizId, listId]);
        }
    }

    return(
        <>
            {!loading && lists.length > 0 &&(
                lists.map(list => (
                    <div key={list.id} className={`bg-gray-800 overflow-hidden ${list.data.lan && 'order-first'} ${minimizId.includes(list.id)? 'max-h-20 w-20 self-end absolute' : 'max-h-96 w-80'} rounded-md text-white px-2 py-4`}>
                        <div className="listHeader border-b-2 border-b-gray-700 border-b-2 flex items-center">
                        <div onKeyDown={(e) => updateList(e,list)}
                            contentEditable
                            suppressContentEditableWarning={true}
                            className={`title p-2 grow ${minimizId.includes(list.id)? 'w-10' : 'grow'}`}>
                                <h5 className={`row ${minimizId.includes(list.id)? 'text-sm truncate' : 'text-base'} text-start`}>{list.data.title}</h5> 
                        </div>
                        <AiOutlineSwitcher onClick={() => handleMinimiz(list.id)}
                            className="cursor-pointer hover:fill-gray-500 "/>
                            
                        {minimizId.includes(list.id) ?
                        ''
                        : <AiOutlineClose onClick={() => deleteList(list.id)}
                                className="cursor-pointer hover:fill-red-300"/>
                        }
                        </div>
                        {minimizId.includes(list.id) ? 
                        '' 
                        : <List key={list.id} id={list.id} data={list.data} />
                        }
                    </div>
                ))
            )}
            <div className="addListForm h-max bg-gray-800 min-w-2/6 rounded-md text-white px-2 py-2">
                <form onSubmit={(e) => onSubmit(e)} className='addList flex items-center gap-2 my-4'> 
                    <input onChange={(e) => onChange(e)} type='text' className='grow rounded-md px-2 py-2 bg-gray-700' placeholder='add new list' id='title' name='title'/>
                    <button type='submit' className='ring-1 ring-white py-1 rounded-md px-2 hover:bg-gray-700 hover:ring-gray-700'>Add</button>
                </form>
                {loading && <Spinner/>}
            </div>
        </>
    )
};

export default Lists;
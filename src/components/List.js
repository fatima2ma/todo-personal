import { useState, useEffect } from 'react';
import { db } from '../firebase.config';
import { getAuth } from 'firebase/auth';
import { 
    addDoc, collection,
    getDocs,
    query,
    orderBy,
    where,
    deleteDoc,
    updateDoc,
    doc,
    serverTimestamp } from 'firebase/firestore';
import { AiOutlineCheck, AiOutlineClose, AiFillHeart, AiOutlineUndo } from 'react-icons/ai';
import Spinner from './Spinner';
import { toast } from 'react-toastify';

function List({id, data}){
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({title: '',});
    const [tasks, setTasks] = useState([]);

    const auth = getAuth();

    async function fetchTasks(){
        const taskRef = collection(db, "tasks");
        const q = query(taskRef, 
            where("listRef", "==", id),
            where("userRef", "==", auth.currentUser.uid),
            orderBy("timeStamp", "desc"));
        const querySnap =  await getDocs(q);
            let taskscopy = [];
            querySnap.forEach((task) => {
                return taskscopy.push({
                    id: task.id,
                    data: task.data(),
                });
            });
        setTasks(taskscopy);
    }

    useEffect(() => {
        console.log('see how many times this function work fetch tasks');
        fetchTasks();
    }, []);

    useEffect(() => {
        tasks && tasks.length > 0 && setTasks(tasks);
    },[tasks]);

    function onChange(e){
        setFormData((prevState) => ({
            [e.target.id]: e.target.value,
        }))
    }

    async function deleteTask(taskId){
        console.log('delete task');
        await deleteDoc(doc(db, "tasks", taskId));
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        toast.success('updated successfully');
    }

    async function updateTask(e, task){
        console.log('update task');
        if(e.key == "Enter" && !e.shiftKey){
            e.preventDefault();
            let newTitle = e.target.innerText;
            const taskRef = doc(db, "tasks", task.id);
            await updateDoc(taskRef, {"title": newTitle});
            fetchTasks();
        }
    }

    async function isDoneTask(task){
        console.log('isdone task');
        console.log(task.data.done);
        const done = !task.data.done;
        const taskRef = doc(db, "tasks", task.id);
        await updateDoc(taskRef, {"done": done});
        // const changedTask = tasks.filter((taske) => taske.id === task.id);
        // changedTask[0].data.done = done;
        // let tasksCopy = tasks.filter((elem) => elem.id !== task.id);
        // setTasks(...tasksCopy, changedTask);
        fetchTasks();
    }

    async function onSubmit(e){
        e.preventDefault();
        setLoading(true);
        const listuid = id;
        const formDataCopy = {
            ...formData,
            timeStamp: serverTimestamp(),
            listRef: listuid,
            done: false,
            userRef: auth.currentUser.uid,
        };
        // console.log(formDataCopy);
        await addDoc(collection(db, 'tasks'), formDataCopy);
        setLoading(false);
        setTasks(formDataCopy);
        fetchTasks();
        e.target.reset();
        console.log(tasks);
        toast.success('list added successfully');
    }
    return(        
            <div className="items overflow-y-auto h-80" data-uid={id}>
                <form onSubmit={(e) => onSubmit(e)} className='addTask flex items-center gap-2 my-4'> 
                    <input onChange={(e) => onChange(e)} type='text' className='grow rounded-md px-2 py-2 bg-gray-700' placeholder='add new task' id='title' name='title'/>
                    <button type='submit' className='py-1 rounded-md px-2 hover:bg-gray-700'>
                        {/* <AiOutlineCheck/> or <GrFormAdd/> */} +
                    </button>
                </form>
                {(loading) && <Spinner/>}
                {tasks.length > 0 && (
                    tasks.map((task) => (
                        <div className="listItem flex gap-2" key={task.id} id={task.id}>
                            <div className='grow bg-gray-800 p-2 rounded-md my-2 flex justify-between items-center'>
                                <p contentEditable={`${task.data.done? 'false':'true'}`} 
                                    className={`no-scroll text-start bg-transparent focus:bg-gray-700 outline-0 ${task.data.done && 'line-through decoration-2 decoration-gray-800'} bg-gray-800`}
                                    onKeyDown={(e) => updateTask(e,task)}
                                    suppressContentEditableWarning={true}>{task.data.title}</p>
                                {task.data.done && <AiFillHeart className='fill-red-400'/>}
                            </div>
                                {task.data.done?
                                (<div className="controls flex gap-2 items-center">
                                    <AiOutlineUndo onClick={()=>isDoneTask(task)} id='reset' className='cursor-pointer fill-gray-600 hover:fill-white'/>
                                </div>)
                                :(<div className="controls flex gap-2 items-center">
                                    <AiOutlineCheck onClick={()=>isDoneTask(task)} className='cursor-pointer hover:fill-green-600'/>
                                    {!data.lan && <AiOutlineClose onClick={()=>deleteTask(task.id)} className='cursor-pointer hover:fill-red-400'/>}
                                </div>)
                                }
                        </div>
                    ))
                )}
                {/* <div className="listItem flex gap-2">
                    <p contentEditable suppressContentEditableWarning={true} className='no-scroll grow text-start bg-gray-700 p-2 rounded-md my-2'> tasks here to dotasks here to dotasks here to dotasks here to dotasks here to do</p>
                    <div className="controls flex gap-2 items-center">
                        <AiOutlineCheck onClick={()=>isDoneTask('task')} className='cursor-pointer hover:fill-green-600'/>
                        <AiOutlineClose onClick={()=>deleteTask('task.id')} className='cursor-pointer hover:fill-red-400'/>
                    </div>
                </div> */}
            </div>        
    );
};

export default List;
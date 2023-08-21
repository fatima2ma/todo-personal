import { AiOutlineUser } from 'react-icons/ai';
import { useContext } from 'react';
import IsClosedSideContext from '../context/IsClosedSide';
function OuthBtn({}){
    const {isClosed, setIsClosed} = useContext(IsClosedSideContext);
    // console.log(isClosed);
    return(
        <button onClick={()=>{setIsClosed(!isClosed)}} className="rounded-md bg-gray-700 text-base p-2 text-center leading-5">
            <AiOutlineUser/>
        </button>
    )
}

export default OuthBtn;
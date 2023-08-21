import { useState, useEffect } from "react";
import HeaderItem from "./HeaderItem";
import OuthBtn from "./outhBtn";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const Header = () => {
    const auth = getAuth();
    const [authState, setAuthState] = useState(false);
    
    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            if(user){
                setAuthState(true);
            }else {setAuthState(false);}
        })
    },[auth]);
    return(
        <div className="App-header px-14">
            <HeaderItem title='Todo personal' linkTo=''/>            
            {authState? <OuthBtn/> : <HeaderItem title='SignIn' linkTo='/signin' isButton='true'/>}
        </div>
    )
}

export default Header;
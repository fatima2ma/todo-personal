import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function useAuthStatus(){
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkStatus, setCheckStatus] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        console.log(auth);
        onAuthStateChanged(auth, (user) => {
            if(user){setLoggedIn(true)};
            setCheckStatus(false);
        });
    },[]);
    return { loggedIn, checkStatus };
};
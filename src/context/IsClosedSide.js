import { createContext, useState, useEffect } from "react";

export const IsClosedSideContext = createContext();
export const IsClosedSideProvider = ({children}) => {
    const [isClosed, setIsClosed] = useState(false);

    useEffect(() => {
        setIsClosed(!isClosed);
    },[])

    return (
        <IsClosedSideContext.Provider value={{isClosed, setIsClosed}}>
            {children}
        </IsClosedSideContext.Provider>
    );
}

export default IsClosedSideContext;
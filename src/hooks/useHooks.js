import { useState } from "react"

export const useHooks = ()=>{
    const [status, setStatus] = useState(false);
    const handleStatus =()=>{
            setStatus(prevStatus=> !prevStatus)
    }
    return {status,handleStatus}
}
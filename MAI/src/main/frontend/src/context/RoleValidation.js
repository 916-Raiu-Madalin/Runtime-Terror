import {React, useContext} from "react"
import {Navigate} from "react-router-dom";
import Home from "../components/Home";

const permissions = {
    "student" : [],
    "teacher" : ["/optionals"]
    
}
const ValidRole = (Component, path) => {

    const loggedIn = localStorage.getItem('loggedIn')? true: false
    if(loggedIn == false || localStorage.getItem('role') == null)
    return <Navigate to="/login"/>
    else{
        let role = localStorage.getItem('role').substring(5).toLowerCase()
        if(role && permissions[role].includes(path)){
            return <Component/>
        }
        else
            return <Navigate to ="/"/>
    }


}
export default ValidRole
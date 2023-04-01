import { useState } from "react";
import NavigationLinks from "./NavigationLinks";
import MyButton from "./MyButton";
export default function Nav(){

    const [count,setCount] = useState(0)
    
    function handleClick(){
        setCount(count + 1);
    }

    return(
        <nav class="container">
            <h1 class="logo">Logo</h1>
            <NavigationLinks />
            <MyButton count={count} onClick={handleClick}/> 
            <MyButton count={count} onClick={handleClick}/> 

        </nav>
    )

}
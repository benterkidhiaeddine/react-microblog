import { useState } from "react"

export default function MyButton({count,onClick}){
   

    return (
        <button onClick={onClick}>
            pressed {count} times
        </button>
    )
}
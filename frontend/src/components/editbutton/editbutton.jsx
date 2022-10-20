import React from "react";
import { useState, useRef, useEffect} from 'react';
import Description from "./descriptionItem";

const LOCAL_STORAGE_KEY = 

function Edit() {
    const [description, setDescription] = useState()
    const [editing, setEditing] = useState(false)
    const text_input = useRef()
    
    useEffect(() => {
        const storedDescription = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedDescription)  setDescription(storedDescription)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(description))
    }, [description])

    function handleSave(){
        const content = text_input.current.value
        const tag = null
        setDescription({content: content, tag: tag})
        setEditing(false)
    }

    function handleCancle(){
        setEditing(false)
    }

    function handleEdit(){
        setEditing(true)
    }

    function text(des){
        des.map( description => {
            return <Description description = {description}   />   
        })
    }

    return (
        <div>
            <Description description={description}></Description>
            <div>this description has {description.content.length} char</div>
            {editing ? 
                (<input ref={text_input} type ="text" defaultValue={description} />)
            }
            <button onClick={handleEdit}>edit</button>
            <button onClick={handleSave}>save</button>
            <button onClick={handleCancle}>cancle</button>
        </div>
    );
}
import { useState, useEffect, useReducer } from "react";

import { db } from "../firebase/config";

import {updateDoc, doc} from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
}

const updateReducer = (state, action) =>{
    switch(action.type) {
        case "LOADING":
            return {loading: true, error: null}
        case "INSERTED_DOC":
            return {loading: false, error: null}
        case "ERROR":
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const useUpdateDocument = (docCollection) => {
    const [response, dispacth] = useReducer(updateReducer, initialState)

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled){
            dispacth(action)
        }
    }


    const updateDocument = async (id, data) => {
        checkCancelBeforeDispatch({
            type: "LOADING",
        })
        try {

            const docRef = await doc(db, docCollection, id)

            const updateDocument = await updateDoc(docRef, data)

            checkCancelBeforeDispatch({
                type: "UPDATED_DOC",
                payload: updateDocument
            })
        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            })
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [updateDocument])

    return {updateDocument, response, }
}
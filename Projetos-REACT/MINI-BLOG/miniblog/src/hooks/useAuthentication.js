import {db} from "../firebase/config"



import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if(cancelled){
            return
        }
    }



    const createUser = async (data) => {
        checkIfIsCancelled()
        setCancelled(true)
        setLoading(true)
        setError(null)
    
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
    
            await updateProfile(user, {
                displayName: data.displayName
            })
    
            setLoading(false)
    
            return user
    
        } catch (error) {
            let systemErrorMessage
    
            if (error.code === "auth/weak-password") {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
            } else if (error.code === "auth/email-already-in-use") {
                systemErrorMessage = "E-mail já cadastrado!"
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
            }
    
            setLoading(false)
            setError(systemErrorMessage)
        }
    }

    // logout
    const logout = () => {
        checkIfIsCancelled()

        signOut(auth)
    }

    // login
    const login = async(data) => {

        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
        } catch (error) {
            let systemErrorMessage
    
            if (error.code === "auth/invalid-credential") {
                systemErrorMessage = "Usuátio ou senha incorretos."
            }else{
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
            }

            console.log(error)
    
            setLoading(false)
            setError(systemErrorMessage)
        }

    }


    useEffect(() => {
       return () => setCancelled(true)
    },[cancelled])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    }

}
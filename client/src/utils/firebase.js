import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, provider, storage } from "../config/firebaseConfig"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export const loginWithEmailPassword = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        return error
    }
}

export const loginWithGoogle = async () => {
    try {
        return await signInWithPopup(auth, provider)
    } catch (error) {
        return error
    }
}

export const registerNewUser = async (email, password) => {
    try {
        return await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        return error
    }
}

export const uploadImage = async (image) => {
    try {
        if (image != null) {
            const imageRef = ref(storage, 'uploads/' + new Date().toISOString())
            await uploadBytes(imageRef, image)
            const downloadURL = await getDownloadURL(imageRef)
            return downloadURL
        }
        return ""


    } catch (error) {
        console.log(error)
    }
}
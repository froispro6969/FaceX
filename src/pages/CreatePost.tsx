import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../config/Firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';

interface CreatePosts {
    description: string;
}


export const CreatePost = () => {

const [user] = useAuthState(auth);
const postRef = collection(db, "Posts");


const { register, handleSubmit } = useForm<CreatePosts>({

});


const onCreatePost = async (data:CreatePosts) => {
    await addDoc(postRef, {
        ...data,
        username: user?.email,
        userID:  user?.uid,
    })
}



    return (
    <form onSubmit={handleSubmit(onCreatePost)}>
        <textarea placeholder="What u doing..." {...register("description")}></textarea>
        <input type="submit" />
    </form>
    )
}
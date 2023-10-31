import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../config/Firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface CreatePosts {
    description: string;
}


export const CreatePost = () => {

    const [user] = useAuthState(auth);
    const postRef = collection(db, "Posts");
    const navigate = useNavigate();


    const { register, handleSubmit } = useForm<CreatePosts>({

    });


    const onCreatePost = async (data: CreatePosts) => {
        await addDoc(postRef, {
            ...data,
            username: user?.email,
            userID: user?.uid,
        })
        window.location.reload();
    }



    return (
        <form onSubmit={handleSubmit(onCreatePost)}>
            <div className='makePost'>
                <img src={user?.photoURL || ""} />
                <textarea placeholder="What u doing..." {...register("description")}></textarea>
                <input className='bn30' role='button' type="submit" />
            </div>
        </form>
    )
}
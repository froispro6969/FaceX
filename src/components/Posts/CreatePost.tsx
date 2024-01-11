import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../config/Firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useUserList } from '../UsersProvider';
import { currentDate } from './currentDate'

interface CreatePosts {
    description: string;
}


export const CreatePost = () => {

    const [user] = useAuthState(auth);
    const userList = useUserList();
    const postRef = collection(db, "Posts");


    const { register, handleSubmit } = useForm<CreatePosts>({

    });


    const onCreatePost = async (data: CreatePosts) => {

        for (const user of userList) {
            try {
                await addDoc(postRef, {
                    ...data,
                    username: user.username,
                    email: user.email,
                    userID: user.userID,
                    createdAt: currentDate(),
                })
            }
            catch (err) {
                console.log(err)
            }
        }

        window.location.reload();
    }



    return (
        <form onSubmit={handleSubmit(onCreatePost)}>
            <div className='makePost'>
                <img src={user?.photoURL || "src/components/avatar.png"} />
                <textarea placeholder="What u doing..." {...register("description")}></textarea>
                <input className='bn30' role='button' type="submit" />
            </div>
        </form>
    )
}
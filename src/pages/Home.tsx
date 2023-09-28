import { CreatePost } from '../components/CreatePost'
import { Post } from '../components/Post'

export const Home = () => {
    return (
        <div className="home-container">
            <div className="home-page">
                <CreatePost></CreatePost>
                <Post></Post>
            </div>
        </div>
    )
}
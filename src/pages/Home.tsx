import { CreatePost } from './createPost'

export const Home = () => {
    return (
        <div className="home-container">
            <div className="home-page">
                <CreatePost></CreatePost>
            </div>
        </div>
    )
}
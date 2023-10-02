import { CreatePost } from '../components/CreatePost'
import { Postmain } from '../components/Posts/PostMain'

export const Home = () => {
    return (
        <div className="home-container">
            <div className="home-page">
                <CreatePost></CreatePost>
                <Postmain></Postmain>
            </div>
        </div>
    )
}
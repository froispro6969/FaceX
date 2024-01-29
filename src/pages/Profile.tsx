import { useUserList } from "../components/UsersProvider";

export const Profile = () => {

    const userList = useUserList();

    return (
        <div className="profile-container">
            <div className="profile-page">
                <div className="profile-avatar">
                    <img src="src/components/avatar.png" />
                </div>
                <div className="profile-info">
                    {userList.map((users) => (
                        <div key={users.userID}>
                            <h2 className="profile-username">{users.username}</h2>
                            <h2 className="profile-email">@{users.email}</h2>
                            <h2>20-05-2004</h2>
                            <h2>Warsaw</h2>
                            <h2>5 posts</h2>
                            <h2>20 likes</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
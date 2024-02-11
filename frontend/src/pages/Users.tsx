import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {findAllUsersExceptLoggedIn, IUser} from "../services/api-services/userService";



const UserList: React.FC = () => {
    const [users, setUsers]  = useState<IUser[]>([])
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await findAllUsersExceptLoggedIn();
                setUsers(response)
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUsers();
    }, []);
    const navigate = useNavigate();

    const handleUserClick = (userId: string) => {
        navigate(`/chat/${userId}`);
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <ul>
                {users.map((user) => (
                    <li
                        key={user._id}
                        className="cursor-pointer text-blue-500 hover:underline mb-2"
                        onClick={() => handleUserClick(user._id)}
                    >
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;

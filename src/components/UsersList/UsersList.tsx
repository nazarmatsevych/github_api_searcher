import React, {useCallback, useEffect, useState} from 'react';
import {getUsers} from '../../api/users';
import './UsersList.scss';

interface Props {
    selectedUserId: number;
    setSelectedUserId: (selectedUserId: number) => void;
    setUser: (user: User | null) => void;
}

export const UsersList: React.FC<Props>
    = React.memo(
    ({
         selectedUserId,
         setSelectedUserId,
         setUser,
     }) => {
        const [users, setUsers] = useState<User[]>([]);
        const [query, setQuery] = useState("");

        const getUsersData = useCallback(
            async () => {
                const usersFromServer = await getUsers();

                setUsers(usersFromServer);
            },
            [],
        );

        useEffect(() => {
            void getUsersData();
        }, [getUsersData, setSelectedUserId]);

        const getUserFromLocalStorage = () => {
            try {
                return JSON.parse(localStorage.getItem("user") || "");
            } catch (error) {
                return null;
            }
        };

        const getIdFromLocalStorage = () => {
            try {
                return JSON.parse(localStorage.getItem("userId") || "");
            } catch (error) {
                return 0;
            }
        };

        const getQueryFromLocalStorage = () => {
            try {
                return JSON.parse(localStorage.getItem("query") || "");
            } catch (error) {
                return "";
            }
        };

        useEffect(() => {
            setUser(getUserFromLocalStorage());
            setSelectedUserId(getIdFromLocalStorage());
            setQuery(getQueryFromLocalStorage());
        }, [setSelectedUserId ,setUser])

        const filteredUsers = users.filter(user => (
            user.login.toLowerCase().includes(query.toLowerCase())
        ));

        return (
            <div className="PostsList">
                <h2>GitHub Searcher</h2>
                <div className="PostsList__searchBar-wrapper">
                    <input
                        className="PostsList__searchBar"
                        type="text"
                        placeholder="Search for GitHub Users"
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value)
                            localStorage.setItem('query', JSON.stringify(event.target.value));
                        }}
                    />
                </div>

                <ul
                    className="PostsList__list"
                    data-cy="postDetails"
                >
                    {filteredUsers && (filteredUsers.map(user => (
                        <li
                            className="PostsList__item"
                            key={user.id}
                        >
                            <img className="PostsList__avatar" src={`${user.avatar_url}`} alt="user avatar"></img>
                            <div>
                                <b>{`${user.login}`}</b>
                            </div>
                            <div>
                                <b>{`Repo: ${user.repos_url.length}`}</b>
                            </div>
                            {selectedUserId === user.id
                                ? (
                                    <button
                                        type="button"
                                        className="PostsList__button button"
                                        onClick={() => {
                                            setSelectedUserId(0);
                                            setUser(null);
                                        }}
                                    >
                                        Close
                                    </button>
                                )
                                : (
                                    <button
                                        type="button"
                                        className="PostsList__button button"
                                        onClick={() => {
                                            setSelectedUserId(user.id);
                                            setUser(user);
                                            localStorage.setItem('user', JSON.stringify(user));
                                            localStorage.setItem('userId', JSON.stringify(user.id));
                                            localStorage.removeItem('repos');
                                        }}
                                    >
                                        Open
                                    </button>
                                )}
                        </li>
                    )))}
                </ul>
            </div>
        );
    },
);

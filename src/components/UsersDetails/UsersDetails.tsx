import React, {useCallback, useEffect, useState} from 'react';
import {Loader} from "../Loader";
import './UsersDetails.scss';
import {getUser} from '../../api/user';
import {getRepos} from '../../api/repos';

interface Props {
    user: User;
}

export const UsersDetails: React.FC<Props> = React.memo(
    ({user}) => {
        const [details, setDetails] = useState<UserDetail[] | null>(null);
        const [query, setQuery] = useState('');
        const [followers, setName] = useState('');
        const [following, setFollowing] = useState('');
        const [email, setEmail] = useState('');
        const [login, setLogin] = useState('');
        const [created, setCreated] = useState('');
        const [location, setLocation] = useState('');
        const [avatar, setAvatar] = useState('');
        const [bio, setBio] = useState('');

        const getUserData = useCallback(
            async (userName: string) => {
                const postsFromServer = await getUser(userName);

                setData(postsFromServer);
            }, [],
        );

        const getUserRepos = useCallback(
            async (userName: string) => {
                const reposFromServer = await getRepos(userName);

                setDetails(reposFromServer)
            }, []
        )

        useEffect(() => {
            void getUserRepos(user.login);
        }, [getUserRepos, user.login]);

        useEffect(() => {
            void getUserData(user.login);
        }, [getUserData, user.login]);

        const setData =
            ({
                 followers,
                 login,
                 following,
                 created_at,
                 location,
                 avatar_url,
                 email,
                 bio
             }: UserDetail) => {
                setName(followers);
                setEmail(email);
                setFollowing(following);
                setLogin(login);
                setCreated(created_at?.split('T')[0]);
                setLocation(location);
                setAvatar(avatar_url);
                setBio(bio);
            }

        const filteredRepos = details?.filter(detail => (
            detail.name.toLowerCase().includes(query.toLowerCase())
        ));

        const getReposFromLocalStorage = () => {
            try {
                return JSON.parse(localStorage.getItem("repos") || "");
            } catch (error) {
                return "";
            }
        };

        useEffect(() => {
            setQuery("");
        }, [user]);

        useEffect(() => {
            setQuery(getReposFromLocalStorage());
        }, []);

        return (
            !filteredRepos
                ? <Loader />
                : <div className="UserDetails">
                    <h2>User Info</h2>
                    <div className="UserDetails__info">
                        <div>
                            <img className="UserDetails__avatar" src={`${avatar}`} alt="user avatar"></img>
                        </div>
                        <section className="UserDetails__user-info">
                            <p>{login ? `Username: ${login}` : null}</p>
                            <p>{email ? `Email: ${email}` : null}</p>
                            <p>{followers ? `${followers} followers` : null}</p>
                            <p>{following ? `Following: ${following}` : null}</p>
                            <p>{created ? `Join Date: ${created}` : null}</p>
                            <p>{location ? `Location: ${location}` : null}</p>
                        </section>
                    </div>
                    <section className="UserDetails__bio">
                        <p>{bio}</p>
                    </section>

                    <section className="UserDetails__comments">
                        <div className="UserDetails__searchBar-wrapper">
                            <input
                                className="UserDetails__searchBar"
                                type="text"
                                placeholder="Search for User`s Repositories"
                                value={query}
                                onChange={(event) => {
                                    setQuery(event.target.value)
                                    localStorage.setItem('repos', JSON.stringify(event.target.value));
                                }}
                            />
                        </div>
                        <h3>User Repositories</h3>
                        <ul
                            className="UserDetails__list"
                            data-cy="postDetails"
                        >
                            {filteredRepos?.map(detail => (
                                <a key={detail.id} href={`${detail.html_url}`}>
                                    <li
                                        className="UserDetails__list-item"
                                    >
                                        <p><strong>{detail.name}</strong></p>
                                        <div>
                                            <p>Forks: <strong>{detail.forks}</strong></p>
                                            <p>Stars: <strong>{detail.stargazers_count}</strong></p>
                                        </div>
                                    </li>
                                </a>
                            ))}
                        </ul>
                    </section>
                </div>
        );
    },
);

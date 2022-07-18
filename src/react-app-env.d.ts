/// <reference types="react-scripts" />

interface User {
    id: number;
    login: string;
    avatar_url: string;
    repos_url: string;
    userId: number;
    name: string;
}

interface UserDetail {
    id: number;
    login: string;
    name: string;
    avatar_url: string;
    followers: string;
    bio: string;
    userId: number;
    email: string;
    following: string;
    location: string;
    created_at: string;
    stargazers_count: number;
    forks: number;
    html_url: string;
}

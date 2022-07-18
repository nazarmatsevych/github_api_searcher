import {request} from "./api";

export async function getRepos(userName: string) {
    try {
        const repos = request(`/users/${userName}/repos`);

        return repos;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }

    return null;
}

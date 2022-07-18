import {request} from "./api";

export async function getUser(userName: string) {
    try {
        const user = request(`/users/${userName}`);

        return user;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }

    return null;
}

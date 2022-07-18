import {request} from "./api";

export async function getUsers() {
    try {
        const users = request(`/users`);

        return users;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }

    return null;
}

export const BASE_URL = 'https://api.github.com';

export const request = (url: string) => {
    return fetch(`${BASE_URL}${url}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            return response.json();
        });
};

import { SERVER_DOMAIN, Token } from "./global";

export async function getUserInfo(userId: String, token: Token) {
    if (!token) {
        return {};
    }
    const url = `${SERVER_DOMAIN}/user/${userId}`;
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
    });
    const json = await response.json();
    return json;
}

export async function searchUsers(UserName: String, token: Token) {
    if (!token) {
        return {};
    }
    const url = `${SERVER_DOMAIN}/users`;
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token, UserName: UserName}),
    });
    const json = await response.json();
    return json;
}

export async function loginUser(email: String, password: string) {
    const url = `${SERVER_DOMAIN}/user/login`;
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: email, Password: password }),
    });
    const json = await response.json();
    return json;
}

export async function createUser(
    email: String,
    password: string,
    username: string
) {
    const url = `${SERVER_DOMAIN}/user/create`;
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Email: email,
            Password: password,
            UserName: username,
        }),
    });
    const json = await response.json();
    return json;
}

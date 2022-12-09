import { SERVER_DOMAIN, Token } from "./connection";

export async function getGroupInfo(groupId: String, token: Token) {
    if (!token) {
        return {};
    }
    const url = `${SERVER_DOMAIN}/group/${groupId}`;
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
    });
    const json = await response.json();
    return json;
}

export async function createGroup(userIds: String[], token: Token) {
    if (!token) {
        return {};
    }
    const url = `${SERVER_DOMAIN}/group`;
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin
        headers: {
            "Content-Type": "application/json",
            token: token.toString(),
        },
        body: JSON.stringify({ users: userIds, token: token }),
    });
    const json = await response.json();
    return json;
}

export async function getMessagesFromGroup(groupId: String, token: Token) {
    if (!token) {
        return {};
    }
    const url = `${SERVER_DOMAIN}/group/${groupId}/messages`;

    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            token: token.toString(),
        },
    });

    const json = await response.json();
    return json;
}

async function updateGroup(
    groupId: String,
    userIds: String[],
    groupName: String,
    token: Token
) {
    if (!token) {
        return {};
    }
    const url = `${SERVER_DOMAIN}/group`;

    const response = await fetch(url, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            token: token.toString(),
        },
        body: JSON.stringify({
            UserID: userIds,
            GroupID: groupId,
            GroupName: groupName,
        }),
    });

    const json = await response.json();
    return json;
}

export async function leaveGroup(groupId: String, token: Token) {
    if (!token) {
        return {};
    }
    const url = `${SERVER_DOMAIN}/group`;

    const response = await fetch(url, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            token: token.toString(),
        },
        body: JSON.stringify({
            GroupID: groupId,
        }),
    });

    const json = await response.json();
    return json;
}

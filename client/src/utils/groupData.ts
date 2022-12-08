import { DOMAIN } from "./connection";

export async function getGroupInfo(groupId: String, token: String) {
    if (!token || token === "") {
        return {};
    }
    const url = `${DOMAIN}/group/${groupId}`;
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

export async function createGroup(userIds: String[], token: String) {
    if (!token || token === "") {
        return {};
    }
    const url = `${DOMAIN}/group`;
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
        body: JSON.stringify({ users: userIds }),
    });
    const json = await response.json();
    return json;
}

export async function getMessagesFromGroup(groupId: String, token: String) {
    if (!token || token === "") {
        return {};
    }
    const url = `${DOMAIN}/group/${groupId}/messages`;

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
    token: String
) {
    if (!token || token === "") {
        return {};
    }
    const url = `${DOMAIN}/group`;

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

export async function leaveGroup(groupId: String, token: String) {
    if (!token || token === "") {
        return {};
    }
    const url = `${DOMAIN}/group`;

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

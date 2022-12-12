import { SERVER_DOMAIN, Token } from "./global";

export async function getGroupInfo(groupId: String, token: Token) {
    if (!token) {
        return {};
    }
    const url = `${SERVER_DOMAIN}/group/${groupId}`;
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

export async function createGroup(
    userIds: String[],
    token: Token,
    GroupName: String,
    groupIcon: String
) {
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
        },
        body: JSON.stringify({
            GroupMember: userIds,
            token: token,
            GroupName: GroupName,
            GroupIcon: groupIcon,
        }),
    });
    const json = await response.json();
    return json;
}
export async function createFriendGroup(userIds: String[], token: Token) {
    if (!token) {
        return {};
    }
    const url = `${SERVER_DOMAIN}/friendgroup`;
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ GroupMember: userIds, token: token }),
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

async function updateGroup(
    groupId: String,
    userIds: String[],
    groupName: String,
    groupIcon: String,
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
        },
        body: JSON.stringify({
            GroupMember: userIds,
            GroupID: groupId,
            GroupName: groupName,
            GroupIcon: groupIcon,
            token: token,
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
        },
        body: JSON.stringify({
            GroupID: groupId,
            token: token,
        }),
    });

    const json = await response.json();
    return json;
}

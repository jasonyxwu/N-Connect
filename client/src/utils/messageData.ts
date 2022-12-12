import { SERVER_DOMAIN } from "./global";
export async function getAllMessagesFromGroup(groupId: String, token: String) {
    if (!token || token === "") {
        return {};
    }
    const url = `${SERVER_DOMAIN}/group/${groupId}/message`;
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ GroupID: groupId, token: token }),
    });
    const json = await response.json();
    return json;
}

// TODO: Implement Order or backend code
export async function getLatestMessageFromGroup(
    groupId: String,
    token: String
) {
    if (!token || token === "") {
        return {};
    }
    const url = `${SERVER_DOMAIN}/group/${groupId}/message`;
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ GroupID: groupId, token: token }),
    });
    const json = await response.json();
    return json;
}

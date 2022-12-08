import { DOMAIN } from "./connection";
export async function getAllMessagesFromGroup(groupId: String, token: String) {
    if (!token || token === "") {
        return {};
    }
    const url = `${DOMAIN}/group/${groupId}/message`;
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            token: token.toString(),
        },
        body: JSON.stringify({ GroupID: groupId }),
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
    const url = `${DOMAIN}/group/${groupId}/message`;
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            token: token.toString(),
        },
        body: JSON.stringify({ GroupID: groupId }),
    });
    const json = await response.json();
    return json;
}

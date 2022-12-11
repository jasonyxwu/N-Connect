export const SERVER_DOMAIN = "https://cryptic-journey-82080.herokuapp.com/api";
// export const SERVER_DOMAIN = "https://localhost:4000/api";
export const PORT = "4000";
export const PORT_SOCKET = "4001";
export interface Token {
    id: string;
    Email: string;
}
export interface friendInfo {
    UserID: string;
    UserName: string;
    iconUrl: string;
}
export interface groupInfo {
    GroupID: string;
    GroupName: string;
    GroupMember: string[];
}

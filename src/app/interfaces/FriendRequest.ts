import { FriendRequestStatus } from './FriendRequestStatus';

export interface FriendRequest{
    from:string,
    to:string,
    submitDate:string,
    fromId:string,
    toId:string,
    body:string,
    status:FriendRequestStatus
}
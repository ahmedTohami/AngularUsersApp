import { Post } from "../interfaces/Post";
import { Guid } from "guid-typescript";
import { FriendRequest } from './FriendRequest';

export interface User {
    id: string;
    email:string;
    name: string;
    image: string;
    comingSentRequest: FriendRequest [],
    sentFriendRequests: FriendRequest [],
    about: string;
    subscribtionDate: string;
    posts: Post[];
    password :string;
}

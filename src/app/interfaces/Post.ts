import { Guid } from 'guid-typescript';
import { PostOwner } from './PostOwner';

export interface Post{
    title:string,
    body:string,
    peopleWhoLikesThis:string[],
    submitDate:string,
    id:string,
    owner:PostOwner
}
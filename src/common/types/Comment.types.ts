import { PostType } from './Post.types';
import { UserType } from './User.types';

export interface CommentType {
  id: number;
  text: string;
  author: UserType;
  post: PostType;
}

export interface CommentConnectionType {
  totalCount: number;
}

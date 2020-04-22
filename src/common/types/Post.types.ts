import { PageInfoType } from './Common.types';
import { CommentType, CommentConnectionType } from './Comment.types';
import { UserType } from './User.types';

export interface PostType {
  id: number;
  title: String;
  body: String;
  published: Boolean;
  author: UserType;
  comments: Array<CommentType>;
  createdAt: string;
  updatedAt: string;
  commentsConnection: CommentConnectionType;
}

export interface PostEdgesType {
  node: PostType;
  cursor: string;
}

export interface PostConnectionType {
  totalCount: number;
  pageInfo: PageInfoType;
  edges: Array<PostEdgesType>;
}

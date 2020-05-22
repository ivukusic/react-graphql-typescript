import { CommentConnectionType, CommentType } from './Comment.types';
import { PageInfoType } from './Common.types';
import { UserType } from './User.types';

export interface PostType {
  id: number;
  title: string;
  body: string;
  published: boolean;
  author: UserType;
  comments: CommentType[];
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
  edges: PostEdgesType[];
}

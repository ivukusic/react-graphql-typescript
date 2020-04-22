import { PostConnectionType, PostType } from './Post.types';
import { CommentConnectionType } from './Comment.types';

export interface UserType {
  id: number;
  address: string;
  city: string;
  company: string;
  country: string;
  email: string;
  firstName: string;
  image?: string;
  lastName: string;
  description: string;
  postalCode: string;
  role: 'ADMIN' | 'EDITOR' | 'USER';
  createdAt: string;
  updatedAt: string;
  posts?: PostType[];
  comments?: Comment[];
  postsConnection?: PostConnectionType;
  commentsConnection?: CommentConnectionType;
  jwt: string;
}

export interface CreateUserType {
  data: { createUser: UserType };
}

export interface UpdateUserType {
  data: { updateUser: UserType };
}

export interface UserCreateInput {
  address: string;
  city: string;
  company: string;
  country: string;
  email: string;
  firstName: string;
  image: string;
  lastName: string;
  password: string;
  description: string;
  postalCode: string;
  role: 'ADMIN' | 'EDITOR' | 'USER';
}

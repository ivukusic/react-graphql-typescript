export interface PopupType {
  cb?: any;
  message: string;
  title: string;
  visible?: boolean;
}

export interface PageInfoType {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

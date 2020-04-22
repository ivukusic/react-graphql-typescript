export interface PopupType {
  cb?: Function | null;
  message: string;
  title: string;
  visible?: boolean;
}

export interface PageInfoType {
  hasNextPage: boolean;
  hasPreviousPage: Boolean;
  startCursor: String;
  endCursor: String;
}

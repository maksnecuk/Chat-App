export interface MessageObjectOfServer {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
  };
  additionalInfo?: {
    self?: boolean;
    joinedUserId?: string;
    modified?: boolean;
  };
}

export interface AdditionalInfo {
  title?: string;
  topic?: string;
}

export interface Room {
  id: number;
  onlineUser: number;
  additionalInfo?: AdditionalInfo;
}

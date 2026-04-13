export interface User {
  id: number;
  name: string;
  avatar: string;
  color: string;
  status: string;
  statusColor: string;
  phone?: string;
  username?: string;
  bio?: string;
}

export interface UserProfile extends User {
  isOnline?: boolean;
  lastSeen?: string;
}

export interface UserEditForm {
  name: string;
  username: string;
  bio: string;
  phone: string;
}
export interface User {
  name: string;
  email: string;
  isActive: boolean;
}

export interface AuthResult {
  status: number;
  ok: boolean;
  error?: string;
  user?: User;
  csrfAccessToken?: string;
  csrfRefreshToken?: string;
}

export interface UserUpdateResult {
  status: boolean;
  user: User;
}

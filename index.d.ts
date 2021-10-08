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
  accessToken?: string;
  csrfAccessToken?: string;
  csrfRefreshToken?: string;
}

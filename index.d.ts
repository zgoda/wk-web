export interface Notification {
  id?: string;
  style: string;
  text: string;
}

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
  csrfAccessToken?: string;
  csrfRefreshToken?: string;
  user?: User;
}

export interface RequestResult {
  resp: Response;
  csrfAccessToken?: string;
  csrfRefreshToken?: string;
}

export interface Event {
  user?: User;
  created?: number;
  name: string;
  date: number;
  length: number;
  location: string;
  virtual: boolean;
  public: boolean;
  description?: string;
}

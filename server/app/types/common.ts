export interface BodyResult {
  success: boolean;
  data?: string | number | object | boolean | null;
  totalLength?: number;
  accessToken?: string | null;
  refreshToken?: string | null;
}
export interface SignupProps {
  email: string;
  password: string;
  nickname: string;
}

export interface Pw {
  password: string;
}
export interface Compare extends Pw {
  hashPw: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  nickname: string;
}

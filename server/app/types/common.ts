export interface SignupProps {
  email: string;
  password: string;
  nickName: string;
}

export interface Pw {
  password: string;
}
export interface Compare extends Pw {
  password2: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  nickName: string;
}

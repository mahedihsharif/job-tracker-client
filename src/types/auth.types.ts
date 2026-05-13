export interface IUser {
  _id: string;
  name: string;
  email: string;
}

export interface IUserResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

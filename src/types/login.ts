export type SignFunctionType = (
  email: string,
  password: string
) => Promise<string>;

export interface UserInfoType {
  email: string;
  password: string;
}

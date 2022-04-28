export type SignFunctionType = (
  email: string,
  password: string
) => Promise<void>;

export interface UserInfoType {
  email: string;
  password: string;
}

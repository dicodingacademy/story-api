export type Authenticated = {
  userId: string;
  name: string;
  token: string;
};

export type TokenPayload = {
  userId: string;
}

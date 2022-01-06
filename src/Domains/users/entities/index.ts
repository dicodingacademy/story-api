export type UserCreation = {
  name: string;
  email: string;
  password: string;
};

export type CreatedUser = {
  id: string;
  name: string;
  email: string;
  hashedPassword: string;
}

export type UserLogin = {
  email: string;
  password: string;
};

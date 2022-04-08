export interface UserInterface {
  name: string;
}
export interface FormDataInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobileNumber: string;
  terms: boolean;
}
export interface LoginDataInterface {
  email: string;
  password: string;
}

export interface RecoveryDataInterface {
  email: string;
}
export interface ICustomer {
  firebaseId: string;
  email: string;
  firstName: string;
  lastName: string;
  mobileNum: string | undefined;
  emailVerified: boolean;
}

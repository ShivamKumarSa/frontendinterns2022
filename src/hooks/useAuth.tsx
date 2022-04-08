import { useContext, useState, createContext } from 'react';
// import axios from 'axios'
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  UserCredential,
} from 'firebase/auth';

import { auth } from '../configs/firebase/firebaseConfig';

// interface ContextInterface{
//   authed: boolean,
//   login: LoginType,
//   logout: ()=> boolean
//   signup : LoginType
//   user: User
// }

const authContext = createContext({});
export const AuthProvider = ({ children }: any) => {
  const [authed, setAuthed] = useState<boolean>();
  const [user, setUser] = useState<User>();
  // const [emailVerified, setVerified] = useState<boolean>();
  // const auth = getAuth()
  // useEffect(()=> {
  //  }, [])
  const signup = async (email: string, password: string) => {
    console.log('signing up with:', email, password);
    const userCreds = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCreds.user);
  };
  const login = async (email: string, password: string) => {
    console.log('loging in with:', email, password);
    try {
      const userCreds = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCreds.user);
      setAuthed(true);
      return userCreds;
    } catch (e) {
      setAuthed(false);
      throw e;
    }
  };
  const logout = async () =>
    new Promise<void>((resolve) => {
      setAuthed(false);
      console.log('user is logged out');
      resolve();
    });

  return (
    <authContext.Provider value={{ authed, login, logout, signup, user }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
export type LoginType = (email: string, password: string) => UserCredential | Error;

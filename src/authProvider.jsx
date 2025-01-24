import React, { useEffect, useState } from "react";
import { createContext } from "vm";
import { account } from "./db";
import { toast } from "react-toastify";
import userServices from "./services/userServices";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(null);

  useEffect(() => {
    checkUser.then(() => setLoading(false));
  }, []);

  //Récupérer le user connecté
  const checkUser = async () => {
    try {
      const res = await account.get();
      res ? setUser(userServices.getUser(res.$id)) : "";
    } catch (error) {
      console.log(error);
      const notify = () => toast("Une erreur est survenue");
    }
  };

  //Connexion à l'application
  const login = async (userInfos) => {
    try {
      const res = await account.createEmailPasswordSession(
        userInfos.email,
        userInfos.password
      );
      res ? setUser(userServices.getUser(res.$id)) : "";
    } catch (error) {
      console.log(error);
      const notify = () => toast("Une erreur est survenue");
    }
  };

  //Deconnexion de l'application
  const logout = async () => {
    try {
      const res = await account.deleteSessions();
      res ? setUser(null) : "";
    } catch (error) {
      console.log(error);
      const notify = () => toast("Une erreur est survenue");
    }
  };

  //Creer un compte
  const createAccount = async (userInfos) => {
    try {
      const res = await account.create(
        ID.unique(),
        userInfos.email,
        userInfos.password,
        `${userInfos.lastName} ${userInfos.firstName}`
      );

      if (res) {
        const user = await userServices.createUser(res.$id, {
          email: userInfos.email,
          userName: userInfos.userName,
          birthdate: userInfos.birthdate,
          firstName: firstName,
          lastName: lastName,
          id: res.$id,
        });
      }
    } catch (error) {
      console.log(error);
      const notify = () => toast("Une erreur est survenue");
    }
  };
}

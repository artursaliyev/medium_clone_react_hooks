import { useEffect, useContext } from "react";
import useFetch from "hooks/use-fetch";
import { CurrentUserContext } from "contexts/current-user-context";
import useLocalStorage from "hooks/use-local-storage";

const CurrentUserChecker = ({ children }) => {
  const [{ response }, doFetch] = useFetch("/user");
  const [, dispatch] = useContext(CurrentUserContext);
  const [token] = useLocalStorage("token");

  useEffect(() => {
    if (!token) {
      dispatch({ type: "SET_UNAUTHORIZED" });

      return;
    }

    doFetch();
    dispatch({ type: "LOADING" });
  }, [doFetch, token, dispatch]);

  useEffect(() => {
    if (!response) {
      return;
    }
    dispatch({ type: "SET_AUTHORIZED", payload: response.user });
  }, [response, dispatch]);
  return children;
};

export default CurrentUserChecker;

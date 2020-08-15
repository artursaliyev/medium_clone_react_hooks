import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import useFetch from "hooks/use-fetch";
import useLocalStorage from "hooks/use-local-storage";
import { CurrentUserContext } from "contexts/current-user-context";
import BackendErrorMessages from "components/bakend-error-messages";

const Authentication = (props) => {
  const isLogin = props.match.path === "/login";
  const pageTitle = isLogin ? "Sign in" : "Sign up";
  const descriptionLink = isLogin ? "/reginter" : "/login";
  const descriptionText = isLogin ? "Need a account" : "Have an accound";
  const apiUrl = isLogin ? "/users/login" : "/users";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSuccesfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);
  const [, setToken] = useLocalStorage("token");
  const [, dispatch] = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = isLogin ? { email, password } : { email, password, username };
    doFetch({
      method: "post",
      data: { user },
    });
  };

  useEffect(() => {
    if (!response) {
      return;
    }
    // @ts-ignore
    setToken(response.user.token);
    dispatch({ type: "SET_AUTHORIZED", payload: response.user });

    setIsSuccessfullSubmit(true);
  }, [response, setToken, dispatch]);

  if (isSuccesfullSubmit) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>
            <form onSubmit={handleSubmit}>
              <fieldset>
                {error && <BackendErrorMessages backendErrors={error.errors} />}
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </fieldset>
                )}

                <fieldset className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={isLoading}
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;

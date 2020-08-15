import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import ArticleForm from "components/article-form";
import useFetch from "hooks/use-fetch";
import { CurrentUserContext } from "contexts/current-user-context";

const CreateArticle = () => {
  const apiUrl = "/articles";
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [{ response, error }, doFetch] = useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);

  const onSubmit = (article) => {
    doFetch({
      method: "post",
      data: {
        article,
      },
    });
  };
  const initialValues = {
    title: "",
    description: "",
    body: "",
    tagList: "",
  };

  useEffect(() => {
    if (!response) {
      return;
    }
    setIsSuccessfullSubmit(true);
  }, [response]);

  if (currentUserState.isLoggedIn === null) {
    return null;
  }

  if (isSuccessfullSubmit || currentUserState.isLoggedIn === false) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <ArticleForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        errors={(error && error.errors) || {}}
      />
    </div>
  );
};

export default CreateArticle;

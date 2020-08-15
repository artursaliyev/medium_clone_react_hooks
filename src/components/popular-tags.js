import React, { useEffect } from "react";
import useFetch from "hooks/use-fetch";
import Loading from "components/loading";
import ErrorMessage from "components/error-message";
import { Link } from "react-router-dom";

const PopularTags = () => {
  const [{ response, error, isLoading }, doFeth] = useFetch("/tags");

  useEffect(() => {
    doFeth();
  }, [doFeth]);

  if (isLoading || !response) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="sidebar">
      <p>Popular tags</p>
      <div className="tag-list">
        {response.tags.map((tag) => (
          <Link className="tag-default tag-pill" to={`/tags/${tag}`} key={tag}>
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;

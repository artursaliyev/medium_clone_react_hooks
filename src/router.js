import React from "react";
import { Switch, Route } from "react-router-dom";
import GlobalFeed from "pages/global-feed";
import Article from "pages/article";
import Authentication from "pages/authentication";
import TagFeed from "pages/tag-feed";
import YourFeed from "pages/your-feed";
import CreateArticle from "pages/create-article";
import EditArticle from "pages/edit-article";
import Settings from "pages/settings";
import UserProfile from "pages/user-profile";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact></Route>
      <Route path="/profiles/:slug" component={UserProfile} exact></Route>
      <Route
        path="/profiles/:slug/favorites"
        component={UserProfile}
        exact
      ></Route>
      <Route path="/settings" component={Settings}></Route>
      <Route path="/articles/new" component={CreateArticle} exact></Route>
      <Route path="/articles/:slug/edit" component={EditArticle}></Route>
      <Route path="/feed" component={YourFeed}></Route>
      <Route path="/tags/:slug" component={TagFeed}></Route>
      <Route path="/login" component={Authentication}></Route>
      <Route path="/register" component={Authentication}></Route>
      <Route path="/articles/:slug" component={Article}></Route>
    </Switch>
  );
};

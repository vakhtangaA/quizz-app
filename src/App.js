import { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Categories from "./components/Categories";
import Questions from "./components/Questions";
import Level from "./components/Level";

function App() {
  return (
    <Switch>
      <Route path="/questions">
        <Questions />
      </Route>
      <Route path="/level">
        <Level />
      </Route>
      <Route path="/">
        <Categories />
      </Route>
    </Switch>
  );
}

export default App;

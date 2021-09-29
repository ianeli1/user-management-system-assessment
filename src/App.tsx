import React from "react";
import { Nav } from "./components/navigator";
import { UserTable } from "./components/table";
import { Route, Switch } from "react-router";

function App() {
  return (
    <div className="">
      <Nav />
      <div className="container">
        <Switch>
          <Route path={["/:page", "/"]}>
            <UserTable
              onDelete={(x) => console.log(x)}
              onEdit={(x) => console.log(x)}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { Nav } from "./components/navigator";
import { UserTable } from "./components/table";
import { Route, Switch } from "react-router";
import { UserForm } from "./components/userForm";
import { User } from "./types";

function App() {
  const [userEditing, setUserEditing] = useState<User>();

  return (
    <div className="">
      <Nav />
      <div className="container">
        <Switch>
          <Route path="/edit/:editId">
            <UserForm path="/updateUser" initialUser={userEditing} />
          </Route>
          <Route path="/add">
            <UserForm path="/addUser" />
          </Route>
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

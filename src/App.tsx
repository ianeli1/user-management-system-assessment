import React, { useState } from "react";
import { Nav } from "./components/navigator";
import { UserTable } from "./components/table";
import { Route, Switch, useHistory } from "react-router";
import { UserForm } from "./components/userForm";
import { User } from "./types";
import { PageSelector } from "./components/pageSelector";

function App() {
  function onUserEdit(user: User) {
    setUserEditing(user);
    replace(`/edit/${user.id}`);
  }

  const [userEditing, setUserEditing] = useState<User>();
  const [numberOfEntries, setNumberOfEntries] = useState<number>(0);
  const { replace } = useHistory();

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
              onEdit={onUserEdit}
              onLoad={(numberOfEntries) => setNumberOfEntries(numberOfEntries)}
            />
            <PageSelector disableForward={numberOfEntries === 0} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;

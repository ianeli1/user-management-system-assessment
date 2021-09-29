import { Link, useHistory } from "react-router-dom";
import { Button } from "./button";

export function Nav() {
  const { replace } = useHistory();

  return (
    <nav className="nav justify-content-between">
      <h1
        className="nav-link"
        onClick={() => replace("/")}
        style={{ cursor: "pointer" }}
      >
        User management system
      </h1>
      <Button onClick={() => replace("/add")}>Add user</Button>
    </nav>
  );
}

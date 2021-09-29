import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { RouterParams, User } from "../types";
import { formRequest } from "../utils";
import { Button } from "./button";
import { phpEndpoint } from "../config.json";

export interface UserFormProps {
  initialUser?: User;
  path: "/updateUser" | "/addUser";
}

export function UserForm({ initialUser, path }: UserFormProps) {
  const [user, setUser] = useState<User>(
    initialUser ?? {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
    }
  );

  const [checkError, setCheckError] = useState(false);

  const { editId } = useParams<RouterParams>();

  useEffect(() => {
    if (editId) {
      setUser((u) => ({ ...u, id: editId }));
    }
  }, [editId]);

  const allValid =
    user.firstName.length && user.lastName.length && user.dateOfBirth;

  const { replace } = useHistory();

  async function onSubmit() {
    setCheckError(true);
    if (allValid) {
      const form = {
        id: user.id,
        fName: user.firstName,
        lName: user.lastName,
        dBirth: user.dateOfBirth,
      };

      const req = await formRequest(
        `${phpEndpoint}${path}`,
        form as Record<string, string>
      );

      replace("/");
    }
  }

  return (
    <form className="col-lg-6 m-auto">
      <div className="m-2">
        <label htmlFor="form-firstName" className="form-label">
          First Name
        </label>
        <input
          id="form-firstName"
          type="text"
          className={`form-control ${
            checkError && (user.firstName.length ? "is-valid" : "is-invalid")
          }`}
          value={user.firstName}
          onChange={(e) =>
            setUser((u) => ({ ...u, firstName: e.target.value }))
          }
        />
      </div>
      <div className="m-2">
        <label htmlFor="form-lastName" className="form-label">
          First Name
        </label>
        <input
          id="form-lastName"
          type="text"
          className={`form-control ${
            checkError && (user.lastName.length ? "is-valid" : "is-invalid")
          }`}
          value={user.lastName}
          onChange={(e) => setUser((u) => ({ ...u, lastName: e.target.value }))}
        />
      </div>
      <div className="m-2">
        <label htmlFor="form-date" className="form-label">
          First Name
        </label>
        <input
          id="form-date"
          type="date"
          className={`form-control ${
            checkError && (user.dateOfBirth.length ? "is-valid" : "is-invalid")
          }`}
          value={user.dateOfBirth}
          onChange={(e) =>
            setUser((u) => ({ ...u, dateOfBirth: e.target.value }))
          }
        />
      </div>
      <div className="d-flex">
        <Button
          color={allValid ? undefined : "btn-secondary"}
          onClick={onSubmit}
        >
          Save
        </Button>
        <Button onClick={() => replace("/")} color="btn-danger">
          Cancel
        </Button>
      </div>
    </form>
  );
}

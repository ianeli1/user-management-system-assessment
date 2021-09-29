import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { phpEndpoint } from "../config.json";
import { RouterParams, User } from "../types";
import { Button } from "./button";
import { ReactComponent as PencilSvg } from "../svg/pencil.svg";
import { ReactComponent as TrashSvg } from "../svg/trash.svg";
import { formRequest } from "../utils";

interface UserTableProps {
  onEdit: (user: User) => void;
}

export function UserTable({ onEdit }: UserTableProps) {
  function TableEntry(user: User) {
    const { id, firstName, lastName, dateOfBirth } = user;
    return (
      <tr>
        <th scope="row" className="col-sm-1 text-center">
          {id}
        </th>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td className="col-sm-1">{dateOfBirth}</td>
        <td className="col-sm-1">
          <Button onClick={() => onEdit(user)}>
            <PencilSvg />
          </Button>
        </td>
        <td className="col-sm-1">
          <Button onClick={() => id && removeEntry(id)}>
            <TrashSvg />
          </Button>
        </td>
      </tr>
    );
  }

  async function removeEntry(deleteId: string) {
    const req = await formRequest(`${phpEndpoint}/deleteUser`, {
      id: deleteId,
    });
    if (req.status === 200) {
      setEntries((oldEntries) => {
        const deletedIndex = oldEntries.findIndex(({ id }) => deleteId === id);
        return [
          ...oldEntries.slice(0, deletedIndex),
          ...oldEntries.slice(deletedIndex + 1),
        ];
      });
    } else {
      console.error(`An error ocurred trying to delete id ${deleteId}`, req);
    }
  }

  const [entries, setEntries] = useState<User[]>([]);
  const { page = 0 } = useParams<RouterParams>();

  useEffect(
    () =>
      void (async () => {
        const data = await fetch(`${phpEndpoint}/getUsers?page=${page}`);
        setEntries(await data.json());
      })(),
    [page]
  );

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" className="col-sm-1 text-center">
              #
            </th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col" className="col-sm-1">
              DOB
            </th>
            <th scope="col" className="col-sm-1">
              Edit
            </th>
            <th scope="col" className="col-sm-1">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((user) => (
            <TableEntry key={user.id} {...user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { phpEndpoint } from "../config.json";
import { RouterParams, User } from "../types";

interface UserTableProps {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function UserTable({}: UserTableProps) {
  function TableEntry({ id, firstName, lastName, dateOfBirth }: User) {
    return (
      <tr>
        <th scope="row" className="col-sm-1 text-center">
          {id}
        </th>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td className="col-sm-1">{dateOfBirth}</td>
        <td className="col-sm-1">Edit</td>
        <td className="col-sm-1">Delete</td>
      </tr>
    );
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

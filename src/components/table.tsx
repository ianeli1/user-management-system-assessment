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
        <th scope="row">{id}</th>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{dateOfBirth}</td>
      </tr>
    );
  }

  const [entries, setEntries] = useState<User[]>([]);
  const { page = 0 } = useParams<RouterParams>();

  useEffect(
    () =>
      void (async () => {
        const data = await fetch(`${phpEndpoint}/getUsers`);
        setEntries(await data.json());
      })(),
    [page]
  );

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">DOB</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((user) => (
            <TableEntry {...user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

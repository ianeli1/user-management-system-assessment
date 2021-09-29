import { useHistory, useParams } from "react-router";
import { RouterParams } from "../types";
import { Button } from "./button";

interface PageSelectorProps {
  disableForward?: boolean;
}

export function PageSelector({ disableForward }: PageSelectorProps) {
  function onRedirect(page: number = 0) {
    replace(`/${page}`);
  }

  const { page = 0 } = useParams<RouterParams>();
  const { replace } = useHistory();

  return (
    <div className="d-flex justify-content-center">
      <Button
        color={+page === 0 ? "btn-secondary" : undefined}
        onClick={() => !(+page === 0) && onRedirect(+page - 1)}
      >
        {"<"}
      </Button>
      <Button color="btn-light" onClick={() => onRedirect(0)}>
        {page}
      </Button>
      <Button
        color={disableForward ? "btn-secondary" : undefined}
        onClick={() => !disableForward && onRedirect(+page + 1)}
      >
        {">"}
      </Button>
    </div>
  );
}

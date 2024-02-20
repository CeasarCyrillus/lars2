import {useNavigate, useParams} from "react-router-dom";
import {Path} from "./navigation";

export const getId = (redirectPath: Path) => function useId() {
  const {id} = useParams();
  const navigate = useNavigate()
  if (id === undefined || isNaN(parseInt(id))) {
    navigate(redirectPath)
    throw new Error("Id is not number!")
  }

  return parseInt(id)
}


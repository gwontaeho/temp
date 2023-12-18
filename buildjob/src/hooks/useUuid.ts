import { useParams } from "react-router-dom";

export function useUuid() {
  const { id } = useParams();

  return id ?? "";
}

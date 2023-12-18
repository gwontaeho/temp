import { useQuery } from "@tanstack/react-query";
import { useSaveFavorite } from "hooks/useSaveFavorite";
import { useUuid } from "hooks/useUuid";
import { ReactNode, Suspense } from "react";
import { useRecoilValue } from "recoil";
import { userSelector } from "states/user";
import { api, eps } from "utils/config";
import styles from "./index.module.scss";

interface Props {
  uuid?: string;
  savedIcon: ReactNode;
  unsavedIcon: ReactNode;
}

export function FavoriteButton(props: Props) {
  const user = useRecoilValue(userSelector);

  return (
    <>
      {user && (
        <Suspense>
          <Resolved {...props} />
        </Suspense>
      )}
    </>
  );
}

function Resolved({ savedIcon, unsavedIcon, ...props }: Props) {
  const uuid = useUuid();
  const { data } = useFavorite(uuid ? uuid : props.uuid);
  const { mutateAsync: onSaveFavorite } = useSaveFavorite();

  return (
    <button
      className={styles.utilBtn}
      onClick={async (e) => {
        e.stopPropagation();
        await onSaveFavorite(uuid ? uuid : props.uuid);
      }}
    >
      {data && savedIcon}
      {!data && unsavedIcon}
    </button>
  );
}

function useFavorite(uuid?: string) {
  return useQuery(
    ["GET_FAVORITE", uuid],
    async () => {
      if (uuid == null || uuid === "") return false;

      const { data } = await api.get(eps["GET_FAVORITE"](uuid));

      const res = data.respdata;
      if (!res) return false;

      const { status } = res;
      return status === 1;
    },
    { enabled: uuid != null || uuid !== "" }
  );
}

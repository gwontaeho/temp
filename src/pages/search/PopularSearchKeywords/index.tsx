import { Suspense } from "react";
import { usePopularSearchKeywords } from "./usePopularSearchKeywords";

interface Props {
  onSearch: (keyword: string) => void;
}

export function PopularSearchKeywords(props: Props) {
  return (
    <Suspense>
      <Resolved {...props} />
    </Suspense>
  );
}

function Resolved({ onSearch }: Props) {
  const { data: popularSearchKeywords } = usePopularSearchKeywords();
  return (
    <>
      {popularSearchKeywords.map((v, i) => (
        <li key={i} onClick={() => onSearch(v.word)}>
          <p>{v.word}</p>
        </li>
      ))}
    </>
  );
}

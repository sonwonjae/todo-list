import dynamic from "next/dynamic";
import { Suspense } from "react";

const Todos = dynamic(
  () => {
    return import("@/components/Todos");
  },
  {
    ssr: false,
  },
);

export default function Home() {
  return (
    <Suspense fallback={<div>로딩중......</div>}>
      <Todos />
    </Suspense>
  );
}

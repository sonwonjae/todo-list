import { QueryErrorResetBoundary } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

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
    <QueryErrorResetBoundary>
      {({ reset }) => {
        return (
          <Suspense fallback={<div>로딩중......</div>}>
            <ErrorBoundary
              fallbackRender={({ resetErrorBoundary }) => {
                return (
                  <div>
                    <div>에러 발생 </div>
                    <button onClick={resetErrorBoundary}>다시 시도</button>
                  </div>
                );
              }}
              onReset={reset}
            >
              <Todos />
            </ErrorBoundary>
          </Suspense>
        );
      }}
    </QueryErrorResetBoundary>
  );
}

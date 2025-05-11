import { DB, DBName } from "../types";

export interface MutateResult {
  result: "success" | "fail";
}

type Draft<N extends DBName> = Omit<
  DB[N][number],
  "id" | "createAt" | "updatedAt"
>;
type Query<N extends DBName> = Partial<DB[N][number]>;

export interface Find {
  <N extends DBName>(param: { name: N; query?: Query<N> }): Promise<DB[N]>;
}

export interface Insert {
  <N extends DBName>(param: {
    name: N;
    draft: Draft<N>;
  }): Promise<MutateResult>;
}

export interface Update {
  <N extends DBName>(param: {
    name: N;
    draft: Partial<Draft<N>>;
    query: Query<N>;
  }): Promise<MutateResult>;
}

export interface Delete {
  <N extends DBName>(param: {
    name: N;
    query: Query<N>;
  }): Promise<MutateResult>;
}

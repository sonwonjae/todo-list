import Todos from "@/components/Todos";
import { TodosProvider } from "@/contexts/todos";

export default function Home() {
  return (
    <TodosProvider>
      <Todos />
    </TodosProvider>
  );
}

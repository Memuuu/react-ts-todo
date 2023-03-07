import "./App.css";
import InputFeild from "./components/InputFeild";
import { useState } from "react";
import { Todo } from "./components/model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

// let name: any;
// let age: number | string;
// let isStudent: boolean;
// let hobbies: string[];
// let role: [number, string];

// let printName: (name: string) => void;

// type Person={
//   name:string;
//   age?:number;
// }

// let person:Person={
//   name:"Piyush",
// }

// let lotsOfPeople: Person[];

// let personName: unknown;

// interface Person {
//   name: string;
//   age?: number;
// }

// interface Guy extends Person{
//   profession:string;
// }

// type X = {
//   a: string;
//   b: number;
// };

// type Y = X & {
//   c: string;
//   d: number;
// };
// X & ile birlikte X'i de içermek zorunda kalır
// let y: Y = {
//   c: "efaf",
//   d: 42,
//   a:"aa",
//   b:2
// };

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === "TodosList") {
      add= active[source.index];
      active.splice(source.index, 1);
    } else {
      add= complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index,0,add)
    } else {
      
      complete.splice(destination.index,0,add)
    }

    setCompletedTodos(complete)
    setTodos(active);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading"> Taskify </span>
        <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;

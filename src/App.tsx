import { Route, Routes } from "react-router-dom";
import ToDoList from "./components/ToDoList";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ToDoList />} />
      </Routes>
    </>
  );
};

export default App;

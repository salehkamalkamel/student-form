import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DataForm from "./features/dataForm/DataForm";
import StudentData from "./pages/StudentData";

export default function App() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="/home" index element={<Home />} />

      <Route path="/dataForm/:userID" element={<DataForm />} />
      <Route path="/student/:userID" element={<StudentData />} />
    </Routes>
  );
}

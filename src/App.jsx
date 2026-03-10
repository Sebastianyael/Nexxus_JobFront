import { Routes , Route } from "react-router-dom"
import { LoginForm } from "./components/LoginForm"
import DashboardStudent from "./pages/DashboardStudent"
import RegistroAlumno from "./pages/RegistroAlumno"
function App(){
  return (
    <Routes>
      <Route path="/" element={<LoginForm/>}/>
      <Route path="/DashboardStudent" element={<DashboardStudent/>} />

      <Route path="/registroAlumno" element={<RegistroAlumno/>} />
    </Routes>
  )
}

export default App
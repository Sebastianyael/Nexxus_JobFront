import { Routes , Route } from "react-router-dom"
import { LoginForm } from "./components/LoginForm"
import DashboardStudent from "./pages/DashboardStudent"
import RegistroAlumno from "./pages/RegistroAlumno"
import RegistroEmpresas from "./components/RegistroEmpresas"
import EmpresaDashboard from "./pages/EmpresaDashboard"
function App(){
  return (
    <Routes>
      <Route path="/" element={<LoginForm/>}/>
      <Route path="/DashboardStudent" element={<DashboardStudent/>} />
      <Route path="/registroAlumno" element={<RegistroAlumno/>} />
      <Route path="/registroEmpresa" element={<RegistroEmpresas/>} />
      <Route path="/empresaDashboard" element={<EmpresaDashboard/>} />
    </Routes>
  )
}

export default App
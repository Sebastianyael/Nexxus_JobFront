import { Routes , Route } from "react-router-dom"
import { LoginForm } from "./components/LoginForm"
import DashboardStudent from "./pages/DashboardStudent"
function App(){
  return (
    <Routes>
      <Route path="/" element={<LoginForm/>}/>
      <Route path="/DashboardStudent" element={<DashboardStudent/>} />
    </Routes>
  )
}

export default App
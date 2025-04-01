import AppRoutes from "./routes/routes"
import './App.css'

const App = () => {
  return (
    <div className="app_container">
      <h2 className="app_title">Administrador de Tareas</h2>
      <AppRoutes />
    </div>
  )
}

export default App
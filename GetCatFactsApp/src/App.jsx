import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import Home from "./pages/Home/Home"

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />}></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App

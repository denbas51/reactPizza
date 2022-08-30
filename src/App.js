import "./scss/app.scss"
import Header from "./components/Header"
import Home from "./pages/Home"
import NotFounded from "./pages/NotFounded"
import Cart from "./pages/Cart"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFounded />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App

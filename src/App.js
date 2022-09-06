import "./scss/app.scss"
import Header from "./components/Header"
import Home from "./pages/Home"
import NotFounded from "./pages/NotFounded"
import Cart from "./pages/Cart"
import { Routes, Route } from "react-router-dom"
import { createContext, useState } from "react"

export const SearchContext = createContext()

function App() {
  const [searchValue, setSearchValue] = useState("")
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFounded />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  )
}

export default App

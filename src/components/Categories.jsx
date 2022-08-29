import { useState } from "react"
import { PizzaCat } from "../assets/constans"

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="categories">
      <ul>
        {PizzaCat.map((cat, i) => (
          <li
            key={cat.id}
            onClick={() => setActiveIndex(i)}
            className={activeIndex === i ? "active" : ""}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories

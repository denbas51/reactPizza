import { PizzaCat } from "../assets/constans"
import { useDispatch } from "react-redux"
import { setCategoryId } from "../redux/slices/filterSlice"

function Categories({ value }) {
  const dispatch = useDispatch()
  return (
    <div className="categories">
      <ul>
        {PizzaCat.map((cat, i) => (
          <li
            key={cat}
            onClick={() => dispatch(setCategoryId(i))}
            className={value === i ? "active" : ""}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories

import { PizzaCat } from "../assets/constans"

function Categories({ value, onChangeCategory }) {
  return (
    <div className="categories">
      <ul>
        {PizzaCat.map((cat, i) => (
          <li
            key={cat}
            onClick={() => onChangeCategory(i)}
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

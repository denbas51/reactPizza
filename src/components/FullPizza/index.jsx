import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { typeNames } from "../../assets/constans"
import { useDispatch, useSelector } from "react-redux"
import { addItem } from "../../redux/slices/cartSlice"

function FullPizza() {
  const [pizza, setPizza] = useState()
  const [open, setOpen] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeSize, setActiveSize] = useState(0)
  const dispatch = useDispatch()
  const cartItem = useSelector((state) =>
    state.cart.items.find((obj) => obj.id === id)
  )
  const addedCount = cartItem ? cartItem.count : 0

  const onClickAdd = () => {
    const item = {
      id: pizza.id,
      title: pizza.title,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      type: typeNames[activeIndex],
      size: pizza.sizes[activeSize],
    }
    dispatch(addItem(item))
  }

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://630dd63eb37c364eb70c9cc4.mockapi.io/items/" + id
        )
        setPizza(data)
      } catch (error) {
        alert("Такая пицца не найдена")
        navigate("/")
      }
    }
    fetchPizza()
  }, [id])

  if (!pizza) {
    return <p>Загрузка...</p>
  }

  return (
    <div className="full-pizza">
      <img src={pizza.imageUrl} />
      <div className="content">
        <h2>{pizza.title}</h2>
        {open ? (
          <>
            <p>Доступные типы теста:</p>
            <div className="pizza-block__selector">
              <ul>
                {pizza.types.map((type, i) => (
                  <li
                    key={type}
                    onClick={() => setActiveIndex(i)}
                    className={activeIndex === i ? "active" : ""}
                  >
                    {typeNames[type]}
                  </li>
                ))}
              </ul>
            </div>
            <p>Доступные размеры:</p>
            <div className="pizza-block__selector">
              <ul>
                {pizza.sizes.map((size, i) => (
                  <li
                    key={size}
                    onClick={() => setActiveSize(i)}
                    className={activeSize === i ? "active" : ""}
                  >
                    {size} см
                  </li>
                ))}
              </ul>
            </div>
            <div className="pizza-block__bottom">
              <div className="pizza-block__price">от {pizza.price} ₴</div>
              <button
                onClick={onClickAdd}
                className="button button--outline button--add"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                    fill="white"
                  />
                </svg>
                <span>Добавить</span>
                {addedCount > 0 && <i>{addedCount}</i>}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text_container">
              Пицца Маргарита — традиционная итальянская пицца, пожалуй, самая
              популярная в мире, даже меню любой пиццерии начинается, как
              правило, именно с неё. Состав этой пиццы необычайно прост, её
              основные ингредиенты: сыр моцарелла, спелые помидоры и листья
              свежего базилика, которые придают ей неповторимый вкус и аромат.
              По легенде, своим названием пицца обязана Маргарите Савойской —
              жене итальянского короля Умберто I, которая очень полюбила эту
              пиццу.
            </p>
            <button
              className="button button--outline button--add"
              onClick={() => setOpen(true)}
            >
              Заказать
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default FullPizza

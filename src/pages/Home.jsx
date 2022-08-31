import Categories from "../components/Categories"
import Sort from "../components/Sort"
import PizzaBlock from "../components/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Sceleton"
import { useEffect, useState } from "react"

function Home() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProp: "rating",
  })

  useEffect(() => {
    setIsLoading(true)
    fetch(
      `https://630dd63eb37c364eb70c9cc4.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortType.sortProp}&order=${
        sortType.sortOrder ? sortType.sortOrder : "desc"
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortType])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </div>
  )
}

export default Home

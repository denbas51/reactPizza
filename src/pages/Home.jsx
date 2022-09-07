import Categories from "../components/Categories"
import Sort from "../components/Sort"
import PizzaBlock from "../components/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Sceleton"
import { useContext, useEffect, useState } from "react"
import Pagination from "../components/Pagination"
import { SearchContext } from "../App"
import { useSelector } from "react-redux"

function Home() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const { searchValue } = useContext(SearchContext)
  const { categoryId, sort } = useSelector((state) => state.filter)

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ))

  const order = sort.sortOrder ? sort.sortOrder : "desc"
  const category = categoryId > 0 ? `category=${categoryId}` : ""
  const search = searchValue ? `search=${searchValue}` : ""

  useEffect(() => {
    setIsLoading(true)
    fetch(
      `https://630dd63eb37c364eb70c9cc4.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sort.sortProp}&order=${order}&${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [category, order, searchValue, currentPage, sort, search])

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  )
}

export default Home

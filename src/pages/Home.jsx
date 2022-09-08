import Categories from "../components/Categories"
import Sort from "../components/Sort"
import PizzaBlock from "../components/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Sceleton"
import { useContext, useEffect, useState } from "react"
import Pagination from "../components/Pagination"
import { SearchContext } from "../App"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { setCurrentPage } from "../redux/slices/filterSlice"

function Home() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { searchValue } = useContext(SearchContext)
  const { categoryId, sort } = useSelector((state) => state.filter)
  const dispatch = useDispatch()
  const { currentPage } = useSelector((state) => state.filter)

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ))

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const order = sort.sortOrder ? sort.sortOrder : "desc"
  const category = categoryId > 0 ? `category=${categoryId}` : ""
  const search = searchValue ? `search=${searchValue}` : ""

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(
        `https://630dd63eb37c364eb70c9cc4.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sort.sortProp}&order=${order}&${search}`
      )
      .then((res) => {
        setItems(res.data)
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
      <Pagination onChangePage={onChangePage} />
    </div>
  )
}

export default Home

import Categories from "../components/Categories"
import Sort from "../components/Sort"
import PizzaBlock from "../components/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Sceleton"
import { useContext, useEffect } from "react"
import Pagination from "../components/Pagination"
import { SearchContext } from "../App"
import { useSelector, useDispatch } from "react-redux"
import { setCurrentPage } from "../redux/slices/filterSlice"
import { fetchPizzas } from "../redux/slices/pizzaSlice"

function Home() {
  const { searchValue } = useContext(SearchContext)
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter)
  const { items, status } = useSelector((state) => state.pizza)
  const dispatch = useDispatch()

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ))

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const setItems = async () => {
    const order = sort.sortOrder ? sort.sortOrder : "desc"
    const category = categoryId > 0 ? `category=${categoryId}` : ""
    const search = searchValue ? `search=${searchValue}` : ""
    const newSort = sort.sortProp

    dispatch(
      fetchPizzas({
        order,
        category,
        search,
        currentPage,
        newSort,
      })
    )

    window.scrollTo(0, 0)
  }

  useEffect(() => {
    setItems()
  }, [categoryId, sort.sortProp, searchValue, currentPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination onChangePage={onChangePage} />
    </div>
  )
}

export default Home

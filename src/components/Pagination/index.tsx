import ReactPaginate from "react-paginate"
import styles from "./Pagination.module.scss"

type PaginationProps = {
  onChangePage: (page: number) => void
}

function Pagination({ onChangePage }: PaginationProps) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
    />
  )
}

export default Pagination

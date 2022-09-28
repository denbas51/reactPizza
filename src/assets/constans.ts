export const PizzaCat = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
]

export const typeNames = ["тонкое", "традиционное"]

export type SortItem = {
  name: string
  sortProp: string
  sortOrder?: string
}

export const list: SortItem[] = [
  { name: "популярности", sortProp: "rating" },
  { name: "увеличении цены", sortProp: "price", sortOrder: "desc" },
  { name: "уменьшении цены", sortProp: "price", sortOrder: "asc" },
  { name: "алфавиту", sortProp: "title", sortOrder: "asc" },
  { name: "алфавиту от Я", sortProp: "title", sortOrder: "desc" },
]

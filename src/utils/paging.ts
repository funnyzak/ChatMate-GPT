/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-16.
 */

export interface PaginationResult<T> {
  list: T[]
  totalItemCount: number
  pageCount: number
  currentPage: number
}
export function paginate<T>(
  items: T[],
  pageSize: number = 10,
  currentPage: number = 1
): PaginationResult<T> {
  const totalItems = items.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)
  const currentPageItems = items.slice(startIndex, endIndex)
  return {
    list: currentPageItems,
    totalItemCount: totalItems,
    pageCount: totalPages,
    currentPage
  }
}
export interface LoadDataOptions<T> {
  items: T[]
  loadCount: number
  startItem?: T | ((value: T, index?: number, obj?: T[]) => boolean)
  direction: 'latest' | 'earliest'
}
export function loadData<T>({
  items,
  loadCount,
  startItem,
  direction = 'earliest'
}: LoadDataOptions<T>): T[] {
  let result: T[] = []
  let startIndex = items.findIndex(
    typeof startItem === 'function'
      ? (startItem as any)
      : (v) => v === startItem
  )
  if (startIndex === -1) {
    startIndex = items.length
  }
  if (direction === 'earliest') {
    for (
      let i = startIndex - 1;
      i >= 0 && result.length < loadCount;
      i--
    ) {
      if (i >= 0 && i < items.length) {
        result.push(items[i])
      }
    }
  } else if (direction === 'latest') {
    for (
      let i = startIndex + 1;
      i < items.length && result.length < loadCount;
      i++
    ) {
      if (i >= 0 && i < items.length) {
        result.push(items[i])
      }
    }
  }
  return result
}

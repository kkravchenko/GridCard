import { useEffect, useState } from 'react'

export const Pagination = ({ pageTotal, page, changePage }) => {
  const [pagination, setPagination] = useState([])
  const [pageActive, setPageActive] = useState(0)

  useEffect(() => {
    const p = []

    const pag = {
      startStart: 0,
      startEnd: 1,
      endStart: 0,
      endEnd: 0,
    }

    if (page === 1) {
      pag.startStart = 1
      pag.startEnd = 3
    } else {
      pag.startStart = page - 2
      pag.startEnd = page + 3
    }
    if (pag.startStart < 1 || pag.startStart < 4) pag.startStart = 1
    if (pag.startEnd > pageTotal) pag.startEnd = pageTotal

    if (pag.startEnd < pageTotal) {
      if (pageTotal - pag.startEnd < 4) pag.startEnd = pageTotal
    }

    if (pageTotal - pag.startEnd < 4) {
      pag.startEnd = pageTotal
    }

    if (pageTotal !== pag.startEnd) {
      pag.endEnd = pageTotal
      pag.endStart = pageTotal - 3
    }

    if (pag.startStart > 1) {
      p.push({ page: 1, name: 1 })
      const dotsPage = Math.ceil((pag.startStart - 1) / 2) + 1
      p.push({
        page: dotsPage,
        name: '..',
      })
    }

    for (let i = pag.startStart; i <= pag.startEnd; i++) {
      p.push({
        page: i,
        name: i,
      })
    }

    if (pag.endStart > 0) {
      const dotsPage =
        pag.startEnd + Math.ceil((pag.endStart - pag.startEnd) / 2)
      p.push({
        page: dotsPage,
        name: '..',
      })
    }

    if (pag.endStart > 0 && pag.endEnd > 0) {
      for (let i = pag.endStart; i <= pag.endEnd; i++) {
        p.push({
          page: i,
          name: i,
        })
      }
    }

    setPagination(p)
  }, [pageTotal, page])

  useEffect(() => {
    setPageActive(page)
  }, [page])

  const handlePageClick = (page) => {
    if (page !== pageActive) {
      changePage(page - 1)
    }
  }

  return (
    <ul className='pagination'>
      <li>
        <span
          className={`pagination-prev${pageActive === 1 ? ' disabled' : ''}`}
          onClick={() => handlePageClick(pageActive === 1 ? 1 : pageActive - 1)}
        ></span>
      </li>
      {pagination.map((p, idx) => (
        <li key={idx}>
          <span
            className={p.page === pageActive ? 'active' : ''}
            onClick={() => handlePageClick(p.page)}
          >
            {p.name}
          </span>
        </li>
      ))}
      <li>
        <span
          className={`pagination-next${
            pageActive === pageTotal ? ' disabled' : ''
          }`}
          onClick={() =>
            handlePageClick(
              pageActive === pageTotal ? pageTotal : pageActive + 1
            )
          }
        ></span>
      </li>
    </ul>
  )
}

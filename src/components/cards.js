import { useEffect, useState } from 'react'
import { Card, Pagination, Error } from '.'

export const Cards = () => {
  const [error, setError] = useState({ request: false, data: false })
  const [page, setPage] = useState(0)
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    setError((prev) => ({ ...prev, request: false, data: false }))
    fetch(process.env.REACT_APP_API_PATH + page, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data?.projects || data.projects.length === 0) {
          setError((prev) => ({ ...prev, data: true }))
        } else {
          setData(data.projects)
          setTotalPages((prev) => data.totalPages)
        }
      })
      .catch((error) => {
        setError((prev) => ({ ...prev, request: true }))
        console.error('Ошибка:', error)
      })
  }, [page])

  return (
    <div className='cards'>
      <div className='cards-item'>
        {error.request || error.data ? (
          <Error error={error} />
        ) : (
          <>
            {data.map((card, idx) => (
              <Card key={idx} cardData={card}></Card>
            ))}
          </>
        )}
      </div>
      <Pagination
        pageTotal={totalPages}
        page={page + 1}
        changePage={setPage}
      ></Pagination>
    </div>
  )
}

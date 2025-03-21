export const Error = (error) => {
  return (
    <div className='error'>
      {error.request && 'Request to server error'}
      {error.data && 'Server return empty data'}
    </div>
  )
}

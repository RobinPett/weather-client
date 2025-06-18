import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import { fetchUtils } from '../../services';
import { toast } from 'sonner';
import Loader from '../info/Loader';

/**
 * List games component.
 * 
 * @param {string} genre - The genre of the games.
 * @param {number} year - The year of the games.
 * @returns {JSX.Element} - The ListGames component.
 */
const ListGames = ({ genre, year }) => {
  const [games, setGames] = useState([])
  const [pageSize, setPageSize] = useState(5)
  const [page, setPage] = useState(1)
  const [totalGames, setTotalGames] = useState(0)
  const [loading, setLoading] = useState(false)
  
  // Columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    {
      field: 'release_year',
      headerName: 'Release year',
      type: 'number',
      width: 100,
    },
  ]

  useEffect(() => {
    fetchGames()
  }, [page, pageSize, genre, year])

  /**
   * Fetches games by year and genre.
   */
  const fetchGames = async () => {
    try {
      setLoading(true)
      const data = await fetchUtils.getGamesByYearAndGenre(year, genre, pageSize, page)
      setGames(data.games)
      setTotalGames(data.totalGames)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Error fetching data')
    }
  }

  return (
    <div>
      <div style={{ padding: '10px' }}>
        <h1 style={{ padding: '10px' }}>List of <b>{genre}</b> games in <b>{year}</b></h1>
        {loading && <Loader blur={true} />}
      </div>

      <div className="table">
        <h2 style={{ padding: '10px' }}>Total games: <b>{totalGames}</b></h2>
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={games}
            columns={columns}
            rowCount={totalGames}
            pagination
            paginationMode="server"
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onPageChange={(newPage) => setPage(newPage)}
            pageSizeOptions={[5, 10]}
            paginationModel={{ page: page - 1, pageSize: pageSize }} // -1 for 0-based index
            onPaginationModelChange={(model) => {
              const newPage = Math.max(model.page + 1) // +1 for 1-based index
              setPage(newPage)
              setPageSize(model.pageSize)
            }}
            sx={{ border: 0 }}
          />
        </Paper>
      </div>

    </div>
  )
}

export default ListGames
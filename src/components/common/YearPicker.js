import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { YearCalendar } from '@mui/x-date-pickers/YearCalendar'

/**
 * YearPicker component.
 *
 * @param {function} updateYear - Function to update the selected year. 
 * @returns {JSX.Element} - The YearPicker component.
 */
export default function YearPicker({ updateYear }) {
  const minDate = dayjs(new Date(1970, 0, 1))
  const maxDate = dayjs(new Date(2022, 11, 31))
  return (
    <div className="year-picker" style={{ padding: '10px' }}>
      <h1 className='mb-3'>Pick a year</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <YearCalendar minDate={minDate} maxDate={maxDate} disableFuture onChange={(value) => updateYear(value.year())} />
      </LocalizationProvider>
    </div>
  )
}
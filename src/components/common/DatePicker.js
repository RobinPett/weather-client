import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import { useState } from 'react'

/**
 * YearPicker component.
 *
 * @param {function} updateYear - Function to update the selected year. 
 * @returns {JSX.Element} - The DatePicker component.
 */
export default function DatePicker({ updateDate }) {
  const [value, setValue] = useState([dayjs(), dayjs()]) // Initialize value for DateRangePicker

  const handleChange = (value) => {
      setValue(value)
      if (updateDate) updateDate(value)
    }

  return (
    <div className="date-picker" style={{ padding: '10px' }}>
      <h1 className='mb-3'>Pick a date</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangePicker value={value} disableFuture onChange={handleChange} />
      </LocalizationProvider>
    </div>
  )
}
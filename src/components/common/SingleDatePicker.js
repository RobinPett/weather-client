import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers'

/**
 * SingleDatePicker component.
 *
 * @param {function} updateDate - Function to update the selected date.
 * @returns {JSX.Element} - The SingleDatePicker component.
 */
export default function SingleDatePicker({ updateDate }) {
  const [value, setValue] = useState(dayjs()) // Set current date as default

  const handleChange = (value) => {
      setValue(value)
      if (updateDate) updateDate(value)
    }

  return (
    <div className="date-picker" style={{ padding: '10px' }}>
      <h1 className='mb-3'>Pick a date</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker value={value} disableFuture onChange={handleChange} />
      </LocalizationProvider>
    </div>
  )
}
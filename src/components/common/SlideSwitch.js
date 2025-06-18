import Switch from '@mui/material/Switch'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

/**
 * SlideSwitch component.
 *
 * @param {String} label - The label for the switch.
 * @param {Function} onChange - The function to call when the switch is toggled. 
 * @returns 
 */
export default function SlideSwitch({label, onChange}) {
  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value={1}
          control={<Switch color="primary" onChange={onChange}/>}
          label={label}
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
  );
}
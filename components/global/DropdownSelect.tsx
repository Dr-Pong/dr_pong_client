import { useState, Dispatch, SetStateAction } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function DropdownSelect({
  label,
  options,
  setState
}: {
  label: string,
  options: string[],
  setState: Dispatch<SetStateAction<any>>
}) {
  const [order, setOrder] = useState(options[0]);
  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
    setOrder(event.target.value);
  };

  return (
    <FormControl error sx={{ m: 1, minWidth: 100 }} size='small'>
      <InputLabel id='demo-select-small-label'>{label}</InputLabel>
      <Select
        labelId='demo-select-small-label'
        id='demo-select-small'
        value={order}
        label={label}
        onChange={handleChange}
        sx={{ color: 'white' }}
      >
        {options.map((option) => (
          <MenuItem value={option} key={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
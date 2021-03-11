import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import './TimeSelect.css';

function TimeSelect() {
  const [unit, setUnit] = useState('');

  const handleChange = (event) => {
    setUnit(event.target.value);
  };

  return (
    <div>
      <Grid container direction='row' alignItems='flex-start'>
        <Grid item>
          <form className='' noValidate autoComplete='off'>
            <TextField id='time' label='Time increments' variant='outlined' />
          </form>
        </Grid>
        <Grid item>
          <div className='timeunits'>
            <FormControl style={{ width: 150 }} variant='outlined' className=''>
              <InputLabel id=''>Select</InputLabel>
              <Select
                labelId=''
                id=''
                value={unit}
                onChange={handleChange}
                label='Select'
              >
                <MenuItem value={'seconds'}>Seconds</MenuItem>
                <MenuItem value={'minutes'}>Minutes</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item>
          <Button
            className='GenerateBTN'
            variant='outlined'
            style={{ marginLeft: '50px' }}
          >
            Add Report
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default TimeSelect;

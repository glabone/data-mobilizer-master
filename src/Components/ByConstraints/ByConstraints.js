import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import './ByConstraints.css';

function ByConstraints() {
  const [field, setField] = useState('');
  const [LTGT, setLTGT] = useState('');

  const handleChange = (event) => {
    setField(event.target.value);
  };
  const handleChangeLTGT = (event) => {
    setLTGT(event.target.value);
  };

  return (
    <div>
      <Grid container direction='row' alignItems='flex-start'>
        <Grid item>
          <div className='fields'>
            <FormControl
              style={{ width: 150 }}
              variant='outlined'
              className='fields'
            >
              <InputLabel id='selectFields'>Select Field</InputLabel>
              <Select
                labelId=''
                id=''
                value={field}
                onChange={handleChange}
                label='selectFields'
              >
                <MenuItem value={'pressure'}>Pressure</MenuItem>
                <MenuItem value={'volume'}>Volume</MenuItem>
                <MenuItem value={'temperature'}>Temperature</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item>
          <div className='' style={{ marginLeft: '20px' }}>
            <FormControl
              style={{ width: 150 }}
              variant='outlined'
              className='LTGT'
            >
              <InputLabel id='select'>Select</InputLabel>
              <Select
                labelId=''
                id=''
                value={LTGT}
                onChange={handleChangeLTGT}
                label='LTGT'
              >
                <MenuItem value={'lessThan'}>Less Than</MenuItem>
                <MenuItem value={'greaterThan'}>Greater Than</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item>
          <form
            className=''
            noValidate
            autoComplete='off'
            style={{ marginLeft: '20px' }}
          >
            <TextField
              id='amount'
              label='Enter Target Constraint'
              variant='outlined'
            />
          </form>
        </Grid>
      </Grid>
      <Grid container direction='row' alignItems='flex-start'>
        <Button
          className='AddConstBTN'
          variant='outlined'
          style={{ marginTop: '45px' }}
        >
          Add Constraint
        </Button>
      </Grid>
      <Grid
        container
        direction='row'
        alignItems='flex-start'
        style={{ width: 700 }}
      >
        <div className='constBox'>
          <tr></tr>
        </div>
      </Grid>
      <Grid container direction='row' alignItems='flex-start'>
        <Button
          className='AddReportBTN'
          variant='outlined'
          style={{ marginTop: '5px' }}
        >
          Add Report
        </Button>
      </Grid>
    </div>
  );
}

export default ByConstraints;

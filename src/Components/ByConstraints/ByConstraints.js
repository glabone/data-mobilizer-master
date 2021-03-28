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
  const [amount, setAmount] = useState('');

  const [constraint, setConstraint] = useState([]);

  const handleChange = (event) => {
    setField(event.target.value);
  };
  const handleChangeLTGT = (event) => {
    setLTGT(event.target.value);
  };
  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };
  const handleClick = (event) => {};

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
                <MenuItem value={'Flow Rate'}>Flow Rate(L/min)</MenuItem>
                <MenuItem value={'Range'}>Range(mm)</MenuItem>
                <MenuItem value={'Temperature'}>Temperature(Deg C)</MenuItem>
                <MenuItem value={'Density'}>Density(kg/m^3)</MenuItem>
                <MenuItem value={'Net Volume'}>Net Volume(L)</MenuItem>
                <MenuItem value={'Pressure'}>Pressure(kPa)</MenuItem>
                <MenuItem value={'Outage'}>Outage(in)</MenuItem>
                <MenuItem value={'Gross Volume'}>Gross Volume(L)</MenuItem>
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
                <MenuItem value={'Less Than'}>Less Than</MenuItem>
                <MenuItem value={'Greater Than'}>Greater Than</MenuItem>
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
              value={amount}
              onChange={handleChangeAmount}
            />
          </form>
        </Grid>
      </Grid>
      <Grid container direction='row' alignItems='flex-start'>
        {field != '' && LTGT != '' && amount != '' ? (
          <button
            className='addConstBtn'
            type='submit'
            onClick={() => {
              let con = {
                field,
                LTGT,
                amount,
              };
              constraint.push(con);
              setConstraint([...constraint]);
            }}
          >
            Add Constraint
          </button>
        ) : (
          <button
            disabled
            className='addConstBtn'
            style={{
              backgroundColor: ' lightgray',
              cursor: 'not-allowed',
            }}
          >
            Add Constraint
          </button>
        )}
      </Grid>
      <Grid
        container
        direction='row'
        alignItems='flex-start'
        style={{ width: 700 }}
      >
        <div className='constBox'>
          {constraint.map((r, i) => (
            <tr className='constBox' style={{ height: '30px' }}>
              {' '}
              <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
                {r.field}
              </span>
              <span>&nbsp;&nbsp;</span>
              <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
                {r.LTGT}
              </span>
              <span>&nbsp;&nbsp;</span>
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                {r.amount}
              </span>{' '}
              <button
                className='removeBtn'
                onClick={(e) => {
                  constraint.splice(i, 1);
                  setConstraint([...constraint]);
                }}
                style={{ marginLeft: '10px' }}
              >
                Remove
              </button>
            </tr>
          ))}
        </div>
      </Grid>
    </div>
  );
}

export default ByConstraints;

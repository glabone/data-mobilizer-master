import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Logo from '../../trig.PNG';
import List from '../../Components/List/List';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import withListLoading from '../../Components/withListLoading/withListLoading';
import SearchBar from '../../Components/SearchBar/SearchBar';
import RadioGroup from '@material-ui/core/RadioGroup';
import Constraints from '../../Components/Constraints/Constraints';
import TimeSelect from '../../Components/TimeSelect/TimeSelect';
import ByConstraints from '../../Components/ByConstraints/ByConstraints';
import Styled, { ThemeProvider } from 'styled-components';
import Switch from 'react-switch';
import Radio from '@material-ui/core/Radio';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

function AutoGen(props) {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') || 0);
  let [uniquePlcs, setUniquePlcs] = useState([]);
  const { setToken } = props;
  let [theme, setTheme] = useState({ main: ' rgba(211, 211, 211, 0.8);' });
  const [selectedPLC, setSelectedPLC] = useState('');
  const [radioInt, setRadioInt] = useState('');
  const [radioCon, setRadioCon] = useState('');
  const [field, setField] = useState('');
  const [LTGT, setLTGT] = useState('');
  const [amount, setAmount] = useState('');
  const [constraint, setConstraint] = useState([]);
  const [trigger, setTrigger] = useState([]);

  //   Handle the fields in the drop down list
  const handleChangeFields = (event) => {
    setField(event.target.value);
  };

  //   handles the interval For the report
  const handleChangeRadioInt = (event) => {
    setRadioInt(event.target.value);
  };

  //   handles if the report need constraints or not
  const handleChangeRadioCon = (event) => {
    setRadioCon(event.target.value);
  };

  //   Handles the drop down menu for Less than or greater than
  const handleChangeLTGT = (event) => {
    setLTGT(event.target.value);
  };

  //   Handles the amount for the constraint
  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  //   ?? only displays the unique values for the PLC's
  function uniqueBy(arr, prop) {
    return arr.reduce((a, d) => {
      if (!a.includes(d[prop])) {
        a.push(d[prop]);
      }
      return a;
    }, []);
  }

  //   This pull the value from the API and creates the PLC list
  useEffect(() => {
    const apiUrl = `http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/plc/alluniquecarid/`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((plcs) => {
        // JSON.stringify(plcs);
        // uniquePlcs = uniqueBy(plcs, "car_id");
        setUniquePlcs(plcs);
      });
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: 'rgb(11, 180, 95)',
          width: '100%',
          marginLeft: '400px',
          paddingTop: '40px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            marginRight: '300px',
            color: '#FFFFFF',
            textAlign: 'center',
            fontFamily: 'monospace',
          }}
        >
          Auto Generated Report
        </h1>
      </div>
      {/* This is the Code for the template */}
      <Grid container direction='row'>
        <div
          style={{
            height: '100%',
            width: '200px',
            backgroundColor: 'rgb(11, 180, 95)',
            position: 'fixed',
            marginTop: '-100px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {' '}
          <img className='LogoA' src={Logo} alt='logo' />
          {isAdmin == 1 ? (
            <Link
              onClick={() => setToken(true)}
              style={{
                display: 'inline-flex',
                VerticalAlign: 'text-bottom',
                BoxSizing: 'inherit',
                textAlign: 'center',
                marginTop: '50px',
                marginRight: '10px',
                paddingLeft: '30px',
                fontSize: '20px',
                color: '#ffffff',
                textDecoration: 'none',
              }}
            >
              <DashboardIcon />
              Admin
            </Link>
          ) : null}
          <Link
            onClick={(event) => setToken(false)}
            style={{
              display: 'inline-flex',
              VerticalAlign: 'text-bottom',
              BoxSizing: 'inherit',
              textAlign: 'center',
              marginTop: '50px',
              marginRight: '10px',
              paddingLeft: '30px',
              fontSize: '20px',
              color: '#ffffff',
              textDecoration: 'none',
            }}
          >
            <DashboardIcon /> Dashboard
          </Link>
          <div style={{ flexGrow: '1' }}></div>
          <br />
          <Link
            onClick={() => {
              localStorage.removeItem('isAdmin');

              setToken(undefined);
              localStorage.removeItem('token');
            }}
            style={{
              display: 'inline-flex',
              VerticalAlign: 'text-bottom',
              BoxSizing: 'inherit',
              paddingLeft: '30px',
              marginBottom: '20px',
              marginRight: '30px',
              fontSize: '20px',
              color: '#ffffff',
              textDecoration: 'none',
            }}
          >
            <ExitToAppIcon /> Log Out
          </Link>
        </div>

        {/* This is where the template code finishes */}

        {/* This is the Interval Remote Button */}

        <Grid container direction='row' alignItems='flex-start'>
          <Grid item>
            <div style={{ marginLeft: '500px', marginTop: '50px' }}>
              <FormControl component='interval'>
                <RadioGroup
                  aria-label='Interval'
                  name='interval'
                  value={radioInt}
                  onClick={handleChangeRadioInt}
                >
                  <FormControlLabel
                    value='Bi-Monthly'
                    control={<Radio />}
                    label='Bi-Monthly'
                  />

                  <FormControlLabel
                    value='Monthly'
                    control={<Radio />}
                    label='Monthly'
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </Grid>

          {/* This is the second set of remote button for select all or by constraints */}
          <Grid item>
            <div style={{ marginLeft: '50px', marginTop: '50px' }}>
              <FormControl component='constraint'>
                <RadioGroup
                  aria-label='Constraints'
                  name='constraints'
                  value={radioCon}
                  onClick={handleChangeRadioCon}
                >
                  <FormControlLabel
                    value='selectAll'
                    control={<Radio />}
                    label='Select All Data'
                  />

                  <FormControlLabel
                    value='setConstaint'
                    control={<Radio />}
                    label='Set Constraint'
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </Grid>
        </Grid>

        {/* This is a Grid with the Select car ID, Select fields, select LTGT, enter amount */}

        <Grid container direction='row' alignItems='flex-start'>
          {/* This is where the select Car ID starts */}

          <Grid item>
            <div>
              <div style={{ marginLeft: '250px', marginBottom: '30px' }}>
                <h2>Select Car ID</h2>
              </div>
              <div style={{ marginLeft: '250px' }}>
                <FormControl
                  style={{ width: 150 }}
                  variant='outlined'
                  className='plcSelect'
                >
                  <Select
                    name='plc'
                    value={selectedPLC}
                    cursor='pointer'
                    //   className='customSelect'
                    onChange={(event) => {
                      setTheme({ main: 'rgb(181, 247, 162)' });
                      setSelectedPLC(event.target.value);
                    }}
                  >
                    {uniquePlcs.map((u) => {
                      return (
                        <MenuItem value={u} className='customOption'>
                          {u}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </div>
          </Grid>

          {/* Select Field */}

          <Grid item>
            <div
              className='fields'
              style={{ marginLeft: '50px', marginTop: '100px' }}
            >
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
                  onChange={handleChangeFields}
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

          {/* Select Less than or Greater than */}

          <Grid item>
            <div
              className=''
              style={{ marginLeft: '50px', marginTop: '100px' }}
            >
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

          {/* Text Field for the amount */}

          <Grid item>
            <div style={{ marginLeft: '50px', marginTop: '100px' }}>
              <form className='' noValidate autoComplete='off'>
                <TextField
                  id='amount'
                  label='Enter Target Constraint'
                  variant='outlined'
                  value={amount}
                  onChange={handleChangeAmount}
                />
              </form>
            </div>
          </Grid>
        </Grid>

        {/* This is where the constraint Box starts. 
        First the add constraint button and then the constraint box */}

        <Grid container direction='row' alignItems='flex-start'>
          <div style={{ marginLeft: '250px', marginBottom: '10px' }}>
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
          </div>
        </Grid>
        <Grid
          container
          direction='row'
          alignItems='flex-start'
          style={{ width: 700 }}
        >
          {' '}
          <h2
            style={{
              marginLeft: '250px',
              marginBottom: '10px',
            }}
          >
            List of Constraints
          </h2>
          <div
            className='constBox'
            style={{
              marginLeft: '250px',
              marginBottom: '45px',
            }}
          >
            {constraint.map((r, i) => (
              <tr className='constBox'>
                {' '}
                <span style={{ fontSize: '20px' }}>{r.field}</span>
                <span>&nbsp;&nbsp;</span>
                <span style={{ fontSize: '20px' }}>{r.LTGT}</span>
                <span>&nbsp;&nbsp;</span>
                <span
                  style={{
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

        {/* This is the end of the constraints box section */}

        <Grid container direction='row' alignItems='flex-start'>
          <div style={{ marginLeft: '250px', marginBottom: '50px' }}>
            <br />
            {selectedPLC != undefined && selectedPLC != '' ? (
              <button
                className='addReportBtn'
                type='submit'
                onClick={() => {
                  let trig = {
                    carId: selectedPLC,
                  };
                  trigger.push(trig);
                  setTrigger([...trigger]);
                }}
              >
                Add Report
              </button>
            ) : (
              <button
                disabled
                className='addReportBtn'
                style={{
                  backgroundColor: ' lightgray',
                  cursor: 'not-allowed',
                }}
              >
                Add Report
              </button>
            )}
          </div>
        </Grid>
        {/* This is the start of the Reports box at the bottom */}
        <Grid direction='row' alignItems='flex-start'>
          <h2>List of Reports</h2>
          <div className='BottomDiv'>
            {trigger.map((r, i) => (
              <tr className='liBottomDiv'>
                PLC ID :{' '}
                <span
                  style={{ color: 'rgb(73, 132, 243)', fontWeight: 'bold' }}
                >
                  {r.carId}
                </span>
                <span>&nbsp;&nbsp;</span> Interval :
                <span
                  style={{ color: 'rgb(73, 132, 243)', fontWeight: 'bold' }}
                >
                  {radioInt}
                </span>
                {/*
                <span>&nbsp;&nbsp;</span> To Date :
                <span
                  style={{
                    color: 'rgb(73, 132, 243)',
                    fontWeight: 'bold',
                  }}
                >
                  {r.finishDate}
                </span>{' '} */}
                {/* <span>&nbsp;&nbsp;</span> <span>&nbsp;&nbsp;</span>{" "}
                <span>&nbsp;&nbsp;</span> */}
                <button
                  className='removeBtn'
                  onClick={(e) => {
                    trigger.splice(i, 1);
                    setTrigger([...trigger]);
                  }}
                  style={{ marginLeft: '10px' }}
                >
                  Remove
                </button>
              </tr>
            ))}
          </div>{' '}
          <Grid alignItems='flex-start'>
            {selectedPLC != undefined && selectedPLC != '' ? (
              <button
                className='GenerateBTN'
                style={{ height: '50px' }}
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  {
                    trigger.map((t) => {
                      window.open(
                        'http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/report/filter?carId=' +
                          t.carId +
                          '&startDate=' +
                          t.startDate +
                          '&finishDate=' +
                          t.finishDate
                      );
                    });
                  }
                }}
              >
                Generate Report
              </button>
            ) : (
              <button
                disabled
                className='GenerateBTN'
                style={{
                  height: '50px',
                  backgroundColor: ' lightgray',
                  cursor: 'not-allowed',
                }}
              >
                Generate Report
              </button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default AutoGen;

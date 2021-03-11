import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Logo from '../../trig.PNG';
import './Dashboard.css';
import List from '../../Components/List/List';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import withListLoading from '../../Components/withListLoading/withListLoading';
import SearchBar from '../../Components/SearchBar/SearchBar';
import RadioGroup from '@material-ui/core/RadioGroup';
import Constraints from '../../Components/Constraints/Constraints';
import Styled, { ThemeProvider } from 'styled-components';
const useStyles = makeStyles((theme, themeTwo, themeThree) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function Dashboard(props) {
  const ListLoading = withListLoading(List);
  const [PLCs, setPLCs] = useState([]);
  const [selectedPLC, setSelectedPLC] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [trigger, setTrigger] = useState([]);
  let [uniquePlcs, setUniquePlcs] = useState([]);
  let [search, setSearch] = useState('');
  let [index, setIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') || 0);
  const [checkedA, setCheckedA] = useState(false);
  const [checkedB, setCheckedB] = useState(false);
  const [checkedC, setCheckedC] = useState(false);

  // const handleChange = (event) => {
  //   setThemeTwo({ main: "rgb(181, 247, 162)" });
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };

  function uniqueBy(arr, prop) {
    return arr.reduce((a, d) => {
      if (!a.includes(d[prop])) {
        a.push(d[prop]);
      }
      return a;
    }, []);
  }

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

  let [theme, setTheme] = useState({ main: ' rgba(211, 211, 211, 0.8);' });
  let [themeTwo, setThemeTwo] = useState({
    main: ' rgba(211, 211, 211, 0.8);',
  });
  let [themeThree, setThemeThree] = useState({
    main: ' rgba(211, 211, 211, 0.8);',
  });
  const classes = useStyles();

  const { setToken } = props;

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
          Dashboard
        </h1>
      </div>
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

        <Grid container direction='row' alignItems='flex-start'>
          <Grid item padding='10'>
            <div style={{ marginLeft: '250px', marginBottom: '45px' }}>
              <h2>Select PLC</h2>
            </div>
            <div style={{ marginLeft: '250px' }}>
              <select
                name='plc'
                className='customSelect'
                onChange={(event) => {
                  setTheme({ main: 'rgb(181, 247, 162)' });
                  setSelectedPLC(event.target.value);
                }}
              >
                <optgroup label='Select PLC'>
                  <option></option>
                  {uniquePlcs.map((u) => {
                    return (
                      <option value={u} className='customOption'>
                        {u}
                      </option>
                    );
                  })}
                </optgroup>
              </select>
            </div>
          </Grid>
          <Grid item padding='10'>
            <div style={{ marginLeft: '50px' }}>
              <h2>Start Date</h2>
              <TextField
                style={{ marginTop: '5px' }}
                id='date'
                label='From'
                type='date'
                defaultValue='today'
                onChange={(event) => {
                  setThemeThree({ main: 'rgb(181, 247, 162)' });
                  setFromDate(event.target.value);
                  //console.log(fromDate);
                }}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </Grid>
          <Grid item padding='10'>
            <div style={{ marginLeft: '50px' }}>
              <h2>End Date </h2>
              <TextField
                style={{ marginTop: '5px' }}
                id='date'
                label='To'
                type='date'
                defaultValue='today'
                onChange={(event) => {
                  setThemeThree({ main: 'rgb(181, 247, 162)' });
                  setToDate(event.target.value);
                }}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </Grid>
        </Grid>

        <div style={{ marginLeft: '250px', marginTop: '45px' }}>
          <Constraints />
        </div>
        {/* <FormGroup column>
              <h2>Select Type</h2>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedA}
                    onChange={(event) => {
                      setCheckedA(event.target.checked);
                      setThemeTwo({ main: "rgb(181, 247, 162)" });
                    }}
                    name="checkedA"
                    color="primary"
                  />
                }
                label="Volume"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedB}
                    onChange={(event) => {
                      setCheckedB(event.target.checked);
                      setThemeTwo({ main: "rgb(181, 247, 162)" });
                    }}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Pressure"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedC}
                    onChange={(event) => {
                      setCheckedC(event.target.checked);
                      setThemeTwo({ main: "rgb(181, 247, 162)" });
                    }}
                    name="checkedC"
                    color="primary"
                  />
                }
                label="Temprature"
              />
            </FormGroup> */}

        {/* <div style={{ width: '300px' }}>
            

            <br />
            {selectedPLC != undefined &&
            selectedPLC != '' &&
            fromDate != undefined &&
            toDate != undefined ? (
              <button
                className='GenerateBTN'
                type='submit'
                onClick={() => {
                  console.log(' ' + checkedC + checkedB + checkedA);
                  let trig = {
                    carId: selectedPLC,
                    startDate: fromDate,
                    finishDate: toDate,
                  };
                  trigger.push(trig);
                  setTrigger([...trigger]);
                }}
              >
                Set Trigger
              </button>
            ) : (
              <button
                disabled
                className='GenerateBTN'
                style={{
                  backgroundColor: ' lightgray',
                  cursor: 'not-allowed',
                }}
              >
                Set Trigger
              </button>
            )}
          </div> */}
        {/* <div>
            <h2>Select Type By Range</h2>
            <div className='sideDiv'>
              <label> Volume</label>
              <br /> <label>Min</label>{' '}
              <input type='number' className='sideInput' />
              <span>&nbsp;&nbsp;</span> <span>&nbsp;&nbsp;</span>{' '}
              <span>&nbsp;&nbsp;</span>
              <label>Max</label> <input type='number' className='sideInput' />
            </div>
            <div className='sideDiv'>
              <label>Pressure</label>
              <br />
              <label>Min</label> <input type='number' className='sideInput' />
              <span>&nbsp;&nbsp;</span> <span>&nbsp;&nbsp;</span>{' '}
              <span>&nbsp;&nbsp;</span> <label>Max</label>{' '}
              <input type='number' className='sideInput' />
            </div>
            <div className='sideDiv'>
              <label>Temprature</label>
              <br />
              <label>Min</label> <input type='number' className='sideInput' />
              <span>&nbsp;&nbsp;</span> <span>&nbsp;&nbsp;</span>{' '}
              <span>&nbsp;&nbsp;</span> <label>Max</label>{' '}
              <input type='number' className='sideInput' />
            </div>
          </div> */}

        <Grid container direction='row' justify='space-evenly'>
          <div className='BottomDiv'>
            {trigger.map((r, i) => (
              <tr className='liBottomDiv'>
                PLC ID :{' '}
                <span
                  style={{ color: 'rgb(73, 132, 243)', fontWeight: 'bold' }}
                >
                  {r.carId}
                </span>
                <span>&nbsp;&nbsp;</span> From Date :
                <span
                  style={{ color: 'rgb(73, 132, 243)', fontWeight: 'bold' }}
                >
                  {r.startDate}
                </span>
                <span>&nbsp;&nbsp;</span> To Date :
                <span
                  style={{
                    color: 'rgb(73, 132, 243)',
                    fontWeight: 'bold',
                    marginRight: '100px',
                  }}
                >
                  {r.finishDate}
                </span>{' '}
                {/* <span>&nbsp;&nbsp;</span> <span>&nbsp;&nbsp;</span>{" "}
                <span>&nbsp;&nbsp;</span> */}
                <button
                  className='removeBtn'
                  onClick={(e) => {
                    trigger.splice(i, 1);
                    setTrigger([...trigger]);
                  }}
                >
                  Remove
                </button>
              </tr>
            ))}
          </div>{' '}
          {selectedPLC != undefined &&
          selectedPLC != '' &&
          fromDate != undefined &&
          toDate != undefined ? (
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
    </>
  );
}
export default Dashboard;

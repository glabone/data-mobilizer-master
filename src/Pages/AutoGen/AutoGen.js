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
import { rgbToHex, TableRow } from '@material-ui/core';
import './AutoGen.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme, themeTwo, themeThree) => ({
  // container: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
  // textField: {
  //   marginLeft: theme.spacing(0),
  //   marginRight: theme.spacing(0),
  //   width: 200,
  // },
  // formControl: {
  //   marginLeft: theme.spacing(0),
  //   marginRight: theme.spacing(10),
  //   marginTop: theme.spacing(6),
  //   minWidth: 120,
  // },
  // selectEmpty: {
  //   marginTop: theme.spacing(4),
  // },
}));

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

  let [dataTypes, setDataTypes] = useState([]);
  let [conditions, setConditions] = useState([]);
  let constr = {};
  let [fieldTypeLookUp, setFieldTypeLookUp] = useState(new Map());
  let [conditionLookUp, setConditionLookUp] = useState(new Map());
  let [intervalLookUp, setIntervalLookUp] = useState(new Map());
  const [value, setValue] = useState('allData');
  const [fieldType, setFieldType] = useState('');
  const [fieldTypeId, setFieldTypeId] = useState(0);
  const [condition, setCondition] = useState('');
  const [intervals, setIntervals] = useState([]);
  const [interval, setInterval] = useState({});
  const [targetField, setTargetField] = useState('');
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem('userEmail') || ''
  );
  const [userId, setUserId] = useState(
    localStorage.getItem('userLoggedIn') || ''
  );

  const [conId, setConId] = useState('');
  const [amount, setAmount] = useState('');
  const [constraint, setConstraint] = useState([]);
  const [newConstraint, setNewConstraint] = useState([]);
  const [trigger, setTrigger] = useState([]);
  const [newTrigger, setNewTrigger] = useState([]);
  const [constraintIdList, setConstraintIdList] = useState([]);
  const [autoGen, setAutoGen] = useState([]);
  const [constraintCheckBox, setConstraintCheckBox] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const [checked, setChecked] = useState([]);
  const [constraintList, setConstraintList] = useState([]);

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

  const handleChangeConstraintList = (event) => {
    setConstraint(constraintList);
  };

  //   Handles the amount for the constraint
  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleChangeConstraintCheckBox = (event) => {
    setConstraintCheckBox({
      ...constraintCheckBox,
      [event.target.value]: event.target.checked,
    });
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

  const REST_API_URL =
    'http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/schedule/';
  const handleChange = (event) => {
    if (event.target.value === 'allData') {
      setFieldType('');
      setCondition('');
      setTargetField('');
    }
    setValue(event.target.value);
  };
  const REST_API_URL_CONS =
    'http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/constraint_schedule/';

  //   This pulls the value from the API and creates the PLC list
  useEffect(() => {
    const apiUrl = `http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/schedule/`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((schedules) => {
        setTrigger(schedules);
      });
  }, []);

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

  useEffect(() => {
    const apiUrlCon = `http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/constraint_schedule/`;
    fetch(apiUrlCon)
      .then((res) => res.json())
      .then((cons) => {
        setConstraintList(cons);
      });
  }, []);

  function getConstraintList() {
    const apiUrlCon = `http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/constraint_schedule/`;
    fetch(apiUrlCon)
      .then((res) => res.json())
      .then((cons) => {
        setConstraintList(cons);
      });
  }

  useEffect(() => {
    const apiUrl = `http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/data_type/`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((dataTypes) => {
        let fields = new Map();
        dataTypes.forEach((element) => {
          fields.set(element.id, element.name);
        });
        setFieldTypeLookUp(fields);
        setDataTypes(dataTypes);
      });
  }, []);
  useEffect(() => {
    const apiUrl = `http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/clause/
    `;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((conditions) => {
        let fields = new Map();
        conditions.forEach((element) => {
          fields.set(element.id, element.name);
        });
        setConditionLookUp(fields);
        setConditions(conditions);
      });
  }, []);

  useEffect(() => {
    const apiUrl = `http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/interval/
    `;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((intervals) => {
        let fields = new Map();
        intervals.forEach((element) => {
          fields.set(element.id, element.name);
        });
        setIntervalLookUp(fields);
        setIntervals(intervals);
      });
  }, []);

  const classes = useStyles();
  //const { setToken } = props;

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
      <Grid container direction='row' alignItems='flex-start'>
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
            <div style={{ marginLeft: '250px', marginTop: '50px' }}>
              <h2>Select Interval</h2>
              <FormControl component='interval'>
                <RadioGroup
                  aria-label='Interval'
                  name='interval'
                  value={radioInt}
                  onClick={handleChangeRadioInt}
                >
                  <FormControlLabel
                    value='2'
                    control={<Radio />}
                    label='Bi-Monthly'
                  />

                  <FormControlLabel
                    value='1'
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
              <h2>Select Contents of Report</h2>
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
                    value='setConstraint'
                    control={<Radio />}
                    label='Set Constraint'
                    onClick={handleChangeConstraintList}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </Grid>
        </Grid>
        <Grid container direction='row' alignItems='flex-start'>
          {/* <div style={{ marginLeft: '250px', marginBottom: '30px' }}>
                <h2>Select Car ID</h2>
              </div> */}
          <div style={{ marginLeft: '250px' }}>
            <FormControl
              style={{ marginTop: '50px', width: '180px' }}
              variant='outlined'
              className='plcSelect'
            >
              <InputLabel id='selected Car Id'>Selected Car ID</InputLabel>
              <Select
                labelId=''
                id=''
                name='plc'
                value={selectedPLC}
                cursor='pointer'
                label='selected Car Id'
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
        </Grid>

        {/* This is a Grid with the Select car ID, Select fields, select LTGT, enter amount */}
        {radioCon === 'setConstraint' ? (
          <Grid container direction='row' alignItems='flex-start'>
            {/* Select Field */}

            <Grid item>
              <div style={{ marginLeft: '250px', marginTop: '50px' }}>
                <FormControl
                  style={{ width: 200 }}
                  variant='outlined'
                  className={classes.formControl}
                >
                  <InputLabel id='selectFields'>Select Field</InputLabel>
                  <Select
                    labelId=''
                    id=''
                    value={fieldType}
                    onChange={(e) => {
                      setFieldType(e.target.value);

                      console.log(e.target.value);
                    }}
                    label='selectFields'
                  >
                    {dataTypes.map((d) => {
                      return (
                        <MenuItem value={d.id} className='customOption'>
                          {d.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </Grid>

            {/* Select Less than or Greater than */}

            <Grid item>
              <div
                className=''
                style={{ marginLeft: '50px', marginTop: '50px' }}
              >
                <FormControl
                  style={{ width: 150 }}
                  variant='outlined'
                  className={classes.formControl}
                >
                  <InputLabel id='select'>Select</InputLabel>
                  <Select
                    labelId=''
                    id=''
                    value={condition}
                    onChange={(e) => {
                      setCondition(e.target.value);
                    }}
                    label='Select'
                  >
                    {conditions.map((c) => {
                      return (
                        <MenuItem
                          value={c.id}
                          className='customOption'
                          onChange={(n) => {
                            if (c.name !== '') {
                              setLTGT(c.name);
                            }
                          }}
                        >
                          {c.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </Grid>

            {/* Text Field for the amount */}

            <Grid item>
              <div style={{ marginLeft: '50px', marginTop: '50px' }}>
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
        ) : null}

        {/* This is where the constraint Box starts. 
        First the add constraint button and then the constraint box */}
        {radioCon === 'setConstraint' ? (
          <Grid container direction='row' alignItems='flex-start'>
            <div style={{ marginLeft: '250px', marginBottom: '10px' }}>
              {fieldType != '' && condition != '' && amount != '' ? (
                <Button
                  className='addConstBtn'
                  type='submit'
                  variant='outlined'
                  style={{
                    backgroundColor: '#00c853',
                    marginTop: '20px',
                    width: '250px',
                  }}
                  onClick={(e) => {
                    let con = {
                      user_id: userId,
                      data_type_id: fieldType,
                      clause_id: condition,
                      value: amount,
                      status: '1',
                    };
                    newConstraint.push(con);
                    setNewConstraint([...newConstraint]);
                    {
                      console.log(newConstraint);
                    }
                    //e.preventDefault();

                    newConstraint.map((t, i) => {
                      {
                        fetch(REST_API_URL_CONS, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },

                          body: JSON.stringify({
                            user_id: t.user_id,
                            data_type_id: t.data_type_id,
                            clause_id: t.clause_id,
                            value: t.value,
                            status: t.status,
                          }),
                        })
                          .then((response) => {
                            if (response.ok) {
                              console.log(t.newTrigger);
                            } else {
                              throw new Error('Something went wrong');
                              console.log(t.trigger);
                            }
                          })
                          .then((data) => {
                            // HANDLE RESPONSE DATA
                            const apiUrlCon = `http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/constraint_schedule/`;
                            fetch(apiUrlCon)
                              .then((res) => res.json())
                              .then((cons) => {
                                setConstraint(cons);
                              });

                            console.log([...constraint]);
                            console.log([...constraintList]);
                            setNewConstraint([]);
                            setFieldType('');
                            setCondition('');
                            setAmount('');
                          })
                          .catch((error) => {
                            // HANDLE ERROR
                            console.log(error);
                          });
                        //
                      }
                    });
                  }}
                >
                  Add New Constraint
                </Button>
              ) : (
                <Button
                  variant='outlined'
                  disabled
                  className='addConstBtn'
                  style={{
                    backgroundColor: ' lightgray',
                    cursor: 'not-allowed',
                    marginTop: '20px',
                    width: '250px',
                  }}
                >
                  Add New Constraint
                </Button>
              )}
            </div>
          </Grid>
        ) : null}
        {radioCon === 'setConstraint' ? (
          <Grid container direction='row' alignItems='flex-start'>
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
              className='AutoconstBox'
              style={{
                marginLeft: '250px',
                marginBottom: '5px',
              }}
            >
              {constraint.map((r, i) => (
                <>
                  {r.user_id == userId && r.status == 1 ? (
                    <TableRow className='constBox' style={{ height: '30px' }}>
                      <span>
                        <Grid
                          container
                          direction='row'
                          alignItems='flex-start'
                          justify='space-between'
                        >
                          <Grid item justify='flex-start'>
                            <div
                              style={{
                                width: '80%',
                                marginLeft: '2px',
                                marginRight: '10px',
                              }}
                            >
                              User ID: {r.user_id} Where{' '}
                              {(() => {
                                switch (r.data_type_id) {
                                  case 1:
                                    return 'Flow Rate(L/min)';
                                  case 2:
                                    return 'Range(mm)';
                                  case 3:
                                    return 'Temperature(Deg C)';
                                  case 4:
                                    return 'Density(kg/m^3';
                                  case 5:
                                    return 'Net Volume(L)';
                                  case 6:
                                    return 'Pressure(kPa)';
                                  case 7:
                                    return 'Outage(in)';
                                  case 8:
                                    return 'Gross Volume(L)';

                                  default:
                                    return 'error';
                                }
                              })()}{' '}
                              is{' '}
                              {r.clause_id == '1'
                                ? 'Less Than'
                                : 'Greater Than'}{' '}
                              {r.value}
                              {' Constraint ID: ' + r.id}
                            </div>
                          </Grid>
                          <Grid item justify='flex-end'>
                            <Button
                              variant='outlined'
                              id='add'
                              startIcon={<SaveIcon />}
                              disabled={false}
                              style={{
                                backgroundColor: '#00c853',
                                margin: 5,
                              }}
                              onClick={(e) => {
                                constraintCheckBox.push(r.id);
                                let tempCon = {
                                  user_id: r.user_id,
                                  data_type_id: r.data_type_id,
                                  clause_id: r.clause_id,
                                  value: r.value,
                                  id: r.id,
                                };
                                checked.push(tempCon);
                                setChecked([...checked]);
                                setConstraintCheckBox([...constraintCheckBox]);
                                r.disabled = true;
                                r.backgroundColor = 'blue';
                              }}
                            >
                              Use constraint
                            </Button>
                            <Button
                              id='delete'
                              startIcon={<DeleteIcon />}
                              variant='outlined'
                              style={{
                                backgroundColor: '#f44336',
                              }}
                              onClick={(e) => {
                                let delCon = e.id;
                                console.log(e.id);
                                fetch(REST_API_URL_CONS + r.id, {
                                  method: 'Delete',
                                }).then((result) => {
                                  const apiUrlCon = `http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/constraint_schedule/`;
                                  fetch(apiUrlCon)
                                    .then((res) => res.json())
                                    .then((cons) => {
                                      setConstraint(cons);
                                    });

                                  console.log([...constraint]);
                                  console.log([...constraintList]);
                                });
                              }}
                            >
                              Delete
                            </Button>
                          </Grid>
                        </Grid>
                      </span>
                    </TableRow>
                  ) : null}{' '}
                </>
              ))}
            </div>{' '}
          </Grid>
        ) : null}
        {checked.length > 0 ? (
          <Grid
            container
            direction='row'
            alignContent='flex-start'
            justify='flex-start'
            style={{ width: '100%', height: '100px' }}
          >
            <div
              className='AutotempconstBox'
              style={{
                marginLeft: '250px',
                marginBottom: '5px',
              }}
            >
              {checked.map((r, i) => (
                <TableRow className='constBox' style={{ height: '30px' }}>
                  <Grid
                    container
                    direction='row'
                    alignItems='flex-start'
                    justify='space-between'
                  >
                    <Grid item>
                      <div
                        style={{
                          marginLeft: '2px',
                          marginRight: '100px',
                        }}
                      >
                        User ID: {r.user_id} Where{' '}
                        {(() => {
                          switch (r.data_type_id) {
                            case 1:
                              return 'Flow Rate(L/min)';
                            case 2:
                              return 'Range(mm)';
                            case 3:
                              return 'Temperature(Deg C)';
                            case 4:
                              return 'Density(kg/m^3';
                            case 5:
                              return 'Net Volume(L)';
                            case 6:
                              return 'Pressure(kPa)';
                            case 7:
                              return 'Outage(in)';
                            case 8:
                              return 'Gross Volume(L)';

                            default:
                              return 'error';
                          }
                        })()}{' '}
                        is {r.clause_id == '1' ? 'Less Than' : 'Greater Than'}{' '}
                        {r.value}
                        {' Constraint ID: ' + r.id}
                      </div>
                    </Grid>
                    <Grid item>
                      <Button
                        id='remove'
                        variant='outlined'
                        style={{
                          backgroundColor: '#f44336',
                        }}
                        onClick={(e) => {
                          checked.splice(i, 1);
                          constraintCheckBox.splice(i, 1);
                          setChecked([...checked]);
                          setConstraintCheckBox([...constraintCheckBox]);
                        }}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </TableRow>
              ))}
            </div>
          </Grid>
        ) : null}

        {/* This is the end of the constraints box section */}

        <Grid
          container
          direction='row'
          alignItems='flex-start'
          justify='flex-start'
        >
          <div style={{ marginLeft: '250px' }}>
            <br />
            {selectedPLC != undefined &&
            selectedPLC != '' &&
            radioCon === 'selectAll' &&
            radioInt != '' ? (
              <Button
                className='AutoaddReportBtn'
                type='submit'
                variant='outlined'
                style={{
                  backgroundColor: '#00c853',
                }}
                onClick={() => {
                  let trig = {
                    // id: 4,
                    car_id: selectedPLC,
                    interval_id: radioInt,
                    user_id: userId,
                    constraint_id: '-1',
                  };
                  console.log(trig);
                  newTrigger.push(trig);
                  setNewTrigger([...newTrigger]);
                }}
              >
                Add Report
              </Button>
            ) : null}

            {selectedPLC != undefined &&
            selectedPLC != '' &&
            radioCon === 'setConstraint' &&
            radioInt != '' ? (
              <Button
                className='AutoaddReportBtn'
                type='submit'
                variant='outlined'
                style={{
                  backgroundColor: '#00c853',
                }}
                onClick={() => {
                  let trig = {
                    car_id: selectedPLC,
                    interval_id: radioInt,
                    user_id: userId,
                    constraint_id: constraintCheckBox.toString(),
                  };
                  newTrigger.push(trig);
                  setNewTrigger([...newTrigger]);
                  setConstraintCheckBox([]);
                  setChecked([]);
                  console.log(constraintCheckBox.toString());
                }}
              >
                Add Report
              </Button>
            ) : null}
          </div>
        </Grid>
        {/* This is the start of the Reports box at the bottom */}
        <Grid
          container
          direction='row'
          alignItems='flex-start'
          style={{ width: '90%' }}
        >
          <h2 style={{ marginLeft: '250px' }}>List of Reports</h2>
          <div className='AutoBottomDiv'>
            {newTrigger.map((r, i) => (
              <>
                {r.user_id == userId ? (
                  <TableRow>
                    <span>
                      <Grid
                        container
                        direction='row'
                        alignItems='flex-start'
                        justify='space-between'
                      >
                        <Grid item style={{ margin: '2px' }}>
                          <div
                            style={{
                              marginLeft: '5px',
                              marginRight: '10px',
                            }}
                          >
                            <span>User Id: {r.user_id} </span>
                            <span>Car ID : {r.car_id}</span>

                            {r.interval_id == '1' ? (
                              <span> Interval : Monthly</span>
                            ) : (
                              <span> Interval : Bi-Monthly</span>
                            )}
                            {r.constraint_id != -1 ? (
                              <span> Constraint ID: {r.constraint_id}</span>
                            ) : null}
                          </div>
                        </Grid>
                        <Grid item>
                          <Button
                            onClick={(e) => {
                              newTrigger.splice(i, 1);
                              setNewTrigger([...newTrigger]);
                            }}
                            style={{
                              margin: '2px',
                              backgroundColor: '#f44336',
                            }}
                            variant='outlined'
                            startIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                        </Grid>
                      </Grid>
                    </span>
                  </TableRow>
                ) : null}
              </>
            ))}
            {trigger.map((r, i) => (
              <>
                {r.user_id == userId ? (
                  <TableRow>
                    <span>
                      <Grid container direction='row' alignItems='flex-start'>
                        <Grid item style={{ width: '570px', margin: '2px' }}>
                          <div
                            style={{
                              marginLeft: '5px',
                              marginRight: '10px',
                            }}
                          ></div>{' '}
                          <span>User Id: {r.user_id} </span>
                          <span>Car ID : {r.car_id}</span>
                          {r.interval_id == '1' ? (
                            <span> Interval : Monthly</span>
                          ) : (
                            <span> Interval : Bi-Monthly</span>
                          )}
                          {r.constraint_id !== -1 ? (
                            <span> Constraint ID: {r.constraint_id}</span>
                          ) : null}
                        </Grid>
                        <Grid item>
                          <Button
                            style={{
                              backgroundColor: '#f44336',
                              margin: '2px',
                            }}
                            variant='outlined'
                            startIcon={<DeleteIcon />}
                            onClick={(e) => {
                              let delId = e.id;
                              console.log(r.trigger);
                              console.log(delId);
                              fetch(REST_API_URL + r.id, {
                                method: 'Delete',
                              }).then((result) => {
                                const apiUrl = `http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/schedule/`;
                                fetch(apiUrl)
                                  .then((res) => res.json())
                                  .then((schedules) => {
                                    setTrigger(schedules);
                                  });

                                console.log([...trigger]);
                                console.log([...constraintList]);
                              });
                            }}
                          >
                            Delete
                          </Button>
                        </Grid>
                      </Grid>
                    </span>
                  </TableRow>
                ) : null}
              </>
            ))}
          </div>{' '}
          <Grid container direction='row' alignItems='flex-start'>
            {selectedPLC != undefined && selectedPLC != '' ? (
              <Button
                className='AutoGenerateBTN'
                variant='outlined'
                style={{
                  marginLeft: '250px',
                  marginBottom: '10px',
                  marginTop: '10px',
                  backgroundColor: '#00c853',
                }}
                type='submit'
                onClick={(e) => {
                  e.preventDefault();

                  newTrigger.map((t, i) => {
                    {
                      fetch(REST_API_URL, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },

                        body: JSON.stringify({
                          car_id: t.car_id,
                          interval_id: t.interval_id,
                          user_id: t.user_id,
                          constraint_id: t.constraint_id,
                        }),
                      })
                        .then((response) => {
                          if (response.ok) {
                            const apiUrl = `http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/schedule/`;
                            fetch(apiUrl)
                              .then((res) => res.json())
                              .then((schedules) => {
                                setTrigger(schedules);
                              });
                          } else {
                            throw new Error('Something went wrong');
                            console.log(t.trigger);
                          }
                          setNewTrigger([]);
                          setRadioInt('');
                          setRadioCon('');
                          setSelectedPLC('');
                        })
                        .catch((error) => {
                          // HANDLE ERROR
                          console.log(error);
                        });
                      //
                    }
                  });
                }}
              >
                Schedule Reports
              </Button>
            ) : (
              <Button
                disabled
                className='AutoGenerateBTN'
                variant='outlined'
                style={{
                  height: '50px',
                  backgroundColor: ' lightgray',
                  cursor: 'not-allowed',
                  marginLeft: '250px',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                Schedule Reports
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default AutoGen;

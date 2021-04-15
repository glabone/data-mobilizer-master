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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Styled, { ThemeProvider } from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import ArrowRightSharpIcon from '@material-ui/icons/ArrowRightSharp';

const useStyles = makeStyles((theme, themeTwo, themeThree) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    width: 200,
  },
  formControl: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(10),
    marginTop: theme.spacing(6),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(4),
  },
}));

function Dashboard(props) {
  const ListLoading = withListLoading(List);
  const [PLCs, setPLCs] = useState([]);
  const [selectedPLC, setSelectedPLC] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [trigger, setTrigger] = useState([]);
  const [constraint, setConstraint] = useState([]);
  const [tri, setTri] = useState({});
  const [triList, setTriList] = useState([]);
  let [uniquePlcs, setUniquePlcs] = useState([]);
  let [picked, setPicked] = useState(false);
  let [dataTypes, setDataTypes] = useState([]);
  let [conditions, setConditions] = useState([]);
  let [constraintId, setConstraintId] = useState([]);
  let constr = {};
  let [fieldTypeLookUp, setFieldTypeLookUp] = useState(new Map());
  let [conditionLookUp, setConditionLookUp] = useState(new Map());
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') || 0);
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem('userEmail') || ''
  );
  const [value, setValue] = useState('allData');
  const [fieldType, setFieldType] = useState('');
  const [fieldTypeId, setFieldTypeId] = useState(0);
  const [condition, setCondition] = useState('');
  const [targetField, setTargetField] = useState('');
  const [user_id, setUser_id] = useState(
    localStorage.getItem('userLoggedIn') || ''
  );
  const apiUrl = `http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/constraint/`;
  const REST_API_URL =
    'http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/constraint/';
  const handleChange = (event) => {
    if (event.target.value === 'allData') {
      setConstraint([]);
      setFieldType('');
      setCondition('');
      setTargetField('');
    }
    setValue(event.target.value);
  };
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

  // useEffect(() => {
  //   fetch(apiUrl)
  //     .then((res) => res.json())
  //     .then((constraintId) => {
  //       setConstraintId(constraintId);
  //     });
  // }, []);

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
          <Link
            onClick={() => setToken('auto')}
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
            Auto Generated Report
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

        <Grid container direction='row' justify='space-evenly'>
          <div style={{ marginLeft: '250px' }}>
            <h2>Select Car ID</h2>
            <FormControl
              className={classes.formControl}
              style={{ marginLeft: '50px', marginTop: '20px' }}
            >
              <InputLabel htmlFor='age-native-simple'>Select Car ID</InputLabel>
              <Select
                style={{ width: '170px' }}
                native
                // value={state.age}
                onChange={(event) => {
                  setSelectedPLC(event.target.value);
                }}
              >
                <optgroup label='Select PLC'>
                  <option aria-label='None' value='' />
                  {uniquePlcs.map((u) => {
                    if (u !== ' ' && u !== null && u !== '') {
                      return (
                        <option value={u} className='customOption'>
                          {u}
                        </option>
                      );
                    }
                  })}
                </optgroup>
              </Select>
            </FormControl>
            {/* <select
              name="plc"
              className="customSelect"
              onChange={(event) => {
                setSelectedPLC(event.target.value);
              }}
            >
              <optgroup label="Select PLC">
                <option></option>
                {uniquePlcs.map((u) => {
                  if (u !== " " && u !== null && u !== "") {
                    return (
                      <option value={u} className="customOption">
                        {u}
                      </option>
                    );
                  }
                })}
              </optgroup>
            </select> */}
          </div>{' '}
          <div style={{ width: '300px' }}>
            <h2>Select Start Date</h2>
            <TextField
              style={{ marginTop: '20px' }}
              id='date'
              label='From'
              type='date'
              defaultValue='today'
              onChange={(event) => {
                setFromDate(event.target.value);
                //console.log(fromDate);
              }}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <h2>Select End Date</h2>{' '}
            <TextField
              style={{ marginTop: '20px' }}
              id='date'
              label='To'
              type='date'
              defaultValue='today'
              onChange={(event) => {
                setToDate(event.target.value);
              }}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </Grid>

        <div style={{ flexGrow: '1' }}></div>

        {/* <Grid container direction="row" justify="space-evenly"> */}

        <div
          className='bollet'
          style={{
            marginLeft: '20%',
            marginRight: '25px',
          }}
        >
          <h2>Select Type</h2>

          <FormControl component='fieldset'>
            <FormLabel component='legend'></FormLabel>
            <RadioGroup
              aria-label='gender'
              name='gender1'
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value='allData'
                control={<Radio />}
                label='select All Data'
              />
              <FormControlLabel
                value='constraint'
                control={<Radio />}
                label='Select By Constraint.'
              />
            </RadioGroup>
          </FormControl>
        </div>

        {value !== 'allData' ? (
          <div
            style={{
              backgroundColor: '#f0f8ff',
              marginTop: '20px',
              paddingLeft: '20px',
              boxShadow: '5px 2px 5px #DCDCDC',
            }}
          >
            <div>
              {' '}
              <FormControl
                className={classes.formControl}
                style={{ marginLeft: '0px' }}
              >
                <InputLabel htmlFor='age-native-simple'>
                  Select Field
                </InputLabel>
                <Select
                  style={{ width: '170px', marginTop: '20px' }}
                  native
                  //  value={fieldTypeId}
                  onChange={(e) => {
                    setFieldType(e.target.value);
                    //  setFieldTypeId(e.target.id);
                    console.log(e.target.value);
                  }}
                  // inputProps={{
                  //   name: "age",
                  //   id: ,
                  //}}
                >
                  <optgroup label='Select PLC'>
                    <option aria-label='None' value='' />
                    {dataTypes.map((d) => {
                      return (
                        <option value={d.id} className='customOption'>
                          {d.name}
                        </option>
                      );
                    })}
                  </optgroup>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor='age-native-simple'>
                  Select Condition
                </InputLabel>
                <Select
                  style={{
                    width: '170px',
                    marginTop: '20px',
                    marginLeft: '20px',
                  }}
                  native
                  // value={state.age}
                  onChange={(e) => {
                    setCondition(e.target.value);
                  }}
                >
                  <optgroup label='Select PLC'>
                    <option aria-label='None' value='' />
                    {conditions.map((c) => {
                      return (
                        <option value={c.id} className='customOption'>
                          {c.name}
                        </option>
                      );
                    })}
                  </optgroup>
                </Select>
              </FormControl>
              <TextField
                style={{ marginTop: '50px', marginRight: '50px' }}
                type='number'
                id='amount'
                label='Enter Target Constraint'
                variant='outlined'
                onChange={(e) => {
                  setTargetField(e.target.value);
                }}
              />
            </div>{' '}
          </div>
        ) : null}
        {/* </Grid> */}

        <Grid container direction='row' justify='space-evenly'>
          <div>
            {value !== 'allData' &&
            fieldType !== '' &&
            condition !== '' &&
            targetField !== '' ? (
              <button
                className='setBTNConst'
                type='submit'
                onClick={() => {
                  constr = {
                    fieldType: fieldTypeLookUp.get(parseInt(fieldType)),
                    condition: conditionLookUp.get(parseInt(condition)),
                    targetField: targetField,
                  };
                  //  console.log(fieldTypeLookUp);
                  let tri = {
                    data_type_id: fieldType,
                    clause_id: condition,
                    value: targetField,
                    user_id: user_id,
                    car_id: selectedPLC,
                  };

                  console.log(tri);
                  // setTriList([...triList]);
                  triList.push(tri);
                  console.log(triList);

                  // fetch(REST_API_URL, {
                  //   method: "POST",
                  //   headers: {
                  //     "Content-Type": "application/json",
                  //   },

                  //   body: JSON.stringify(tri),
                  // })
                  //   .then((response) => {
                  //     if (response.ok) {
                  //     } else {
                  //       throw new Error("Something went wrong");
                  //     }
                  //   })
                  //   .catch((error) => {
                  //     // HANDLE ERROR
                  //     console.log(error);
                  //   });
                  constraint.push(constr);
                  setConstraint([...constraint]);
                }}
              >
                Set Constraint
              </button>
            ) : (
              <div></div>
            )}
            {value !== 'allData' ? <h2>Selected Constraints</h2> : null}
            {value !== 'allData' ? (
              <div className='costraintDiv'>
                {constraint.map((r, i) => (
                  <tr className='liBottomDiv'>
                    <td>
                      <ArrowRightSharpIcon />{' '}
                      <span
                        style={{
                          color: 'rgb(73, 132, 243)',
                          fontWeight: 'bold',
                        }}
                      >
                        {r.fieldType}
                      </span>
                      <span>&nbsp;&nbsp;</span>
                      <span
                        style={{
                          color: 'rgb(73, 132, 243)',
                          fontWeight: 'bold',
                        }}
                      >
                        {r.condition}
                      </span>
                      <span>&nbsp;&nbsp;</span>
                      <span
                        style={{
                          color: 'rgb(73, 132, 243)',
                          fontWeight: 'bold',
                          marginRight: '40px',
                        }}
                      >
                        {r.targetField}
                      </span>{' '}
                    </td>
                    <td>
                      <button
                        className='removeBtn'
                        onClick={(e) => {
                          constraint.splice(i, 1);
                          setConstraint([...constraint]);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </div>
            ) : null}

            {selectedPLC != undefined &&
            selectedPLC != '' &&
            fromDate != undefined &&
            toDate != undefined ? (
              <button
                className='setBTN'
                type='submit'
                onClick={() => {
                  let trig = {
                    carId: selectedPLC,
                    startDate: fromDate,
                    finishDate: toDate,
                    constraintArray: [...constraint],
                  };
                  console.log(trig.constraintArray);
                  trigger.push(trig);

                  setTrigger([...trigger]);
                }}
              >
                Set Constraints for Report
              </button>
            ) : (
              <button
                disabled
                className='setBTN'
                style={{
                  backgroundColor: ' lightgray',
                  cursor: 'not-allowed',
                }}
              >
                Set Constraints for Report
              </button>
            )}
          </div>
        </Grid>
      </Grid>
      <Grid container direction='row' justify='space-evenly'>
        <Grid container direction='row' justify='space-evenly'>
          <h2>Selected Reports</h2>
        </Grid>
        <div className='BottomDiv'>
          {trigger.map((r, i) => (
            <table>
              <tr className='liBottomDiv'>
                <td style={{ borderColor: 'white' }}>
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
                      marginRight: '40px',
                    }}
                  >
                    {r.finishDate}
                  </span>{' '}
                </td>

                <td>
                  <button
                    className='removeBtn'
                    onClick={(e) => {
                      trigger.splice(i, 1);
                      setTrigger([...trigger]);
                    }}
                  >
                    Remove
                  </button>
                </td>
                <td>
                  {' '}
                  <button
                    className='removeBtn'
                    type='submit'
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(triList.length);
                      {
                        triList.map((a) => {
                          fetch(apiUrl, {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },

                            body: JSON.stringify(a),
                          })
                            .then((response) => {
                              if (response.ok) {
                              } else {
                                throw new Error('Something went wrong');
                              }
                            })
                            .catch((error) => {
                              // HANDLE ERROR
                              console.log(error);
                            });
                        });
                      }

                      {
                        if (r.constraintArray.length > 0) {
                          window.open(
                            'http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/report/filter?carId=' +
                              r.carId +
                              '&startDate=' +
                              r.startDate +
                              '&finishDate=' +
                              r.finishDate +
                              '&userEmail=' +
                              userEmail
                          );
                        } else {
                          window.open(
                            'http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/report/filter?carId=' +
                              r.carId +
                              '&startDate=' +
                              r.startDate +
                              '&finishDate=' +
                              r.finishDate
                          );
                        }
                      }
                    }}
                    // constraintId.map((cId) => {
                    //   fetch(apiUrl+"email=" + cId.id, { method: "Delete" });
                    // });
                  >
                    Get PDF
                  </button>
                </td>
                <td>
                  {' '}
                  <button
                    className='removeBtn'
                    type='submit'
                    onClick={(e) => {
                      e.preventDefault();
                      {
                        triList.map((a) => {
                          fetch(apiUrl, {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },

                            body: JSON.stringify(a),
                          })
                            .then((response) => {
                              if (response.ok) {
                              } else {
                                throw new Error('Something went wrong');
                              }
                            })
                            .catch((error) => {
                              // HANDLE ERROR
                              console.log(error);
                            });
                        });
                      }

                      {
                        if (r.constraintArray.length > 0) {
                          window.open(
                            'http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/report/export?carId=' +
                              r.carId +
                              '&startDate=' +
                              r.startDate +
                              '&finishDate=' +
                              r.finishDate +
                              '&userEmail=' +
                              userEmail
                          );
                        } else {
                          window.open(
                            'http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/report/export?carId=' +
                              r.carId +
                              '&startDate=' +
                              r.startDate +
                              '&finishDate=' +
                              r.finishDate
                          );
                        }
                      }
                    }}
                  >
                    Get Excel
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ borderColor: 'blueviolet' }}>
                  {' '}
                  {r.constraintArray.map((h) => (
                    <li>
                      {' '}
                      {h.fieldType} {h.condition} {h.targetField}
                    </li>
                  ))}{' '}
                </td>
              </tr>
              {/* <tr>
                <td colSpan={4}>
                  {" "}
                  <hr style={{ borderColor: "darkgray" }} />
                </td>
              </tr> */}
            </table>
          ))}
        </div>{' '}
        {/* <div>
          {selectedPLC != undefined &&
          selectedPLC != "" &&
          fromDate != undefined &&
          toDate != undefined ? (
            <button
              className="GenerateBTN"
              style={{ height: "50px" }}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                {
                  console.log(constraintId);
                  trigger.map((t) => {
                    window.open(
                      "http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/report/filter?carId=" +
                        t.carId +
                        "&startDate=" +
                        t.startDate +
                        "&finishDate=" +
                        t.finishDate +
                        "&userEmail=" +
                        userEmail
                    );
                  });
                }
              }}
            >
              Generate PDF Reports
            </button>
          ) : (
            <button
              disabled
              className="GenerateBTN"
              style={{
                height: "50px",
                backgroundColor: " lightgray",
                cursor: "not-allowed",
              }}
            >
              Generate PDF Reports
            </button>
          )}{" "}
          <span>&nbsp;&nbsp;</span>
          {selectedPLC != undefined &&
          selectedPLC != "" &&
          fromDate != undefined &&
          toDate != undefined ? (
            <button
              className="GenerateBTN"
              style={{ height: "50px" }}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                {
                  trigger.map((t) => {
                    window.open(
                      "http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/report/export?carId=" +
                        t.carId +
                        "&startDate=" +
                        t.startDate +
                        "&finishDate=" +
                        t.finishDate
                    );
                  });
                }
              }}
            >
              Export Excel Files
            </button>
          ) : (
            <button
              disabled
              className="GenerateBTN"
              style={{
                height: "50px",
                backgroundColor: " lightgray",
                cursor: "not-allowed",
              }}
            >
              Export Excel File
            </button>
          )}
        </div> */}
        <div style={{ marginBottom: '100px' }}></div>
      </Grid>
    </>
  );
}
export default Dashboard;

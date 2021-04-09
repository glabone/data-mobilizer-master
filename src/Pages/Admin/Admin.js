import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';
import Switch from 'react-switch';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Logo from '../../trig.PNG';
import './Admin.css';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { Modal } from 'react-responsive-modal';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(3),
  },
}));

function Admin(props) {
  const [UserInfo, setUserInfo] = useState([]);
  const [adminId, setAdminId] = useState(localStorage.getItem('adminId') || '');
  let [enteredFirstName, setEnteredFirstName] = useState('');
  let [enteredLastName, setEnteredLastName] = useState('');
  let [enteredEmail, setEnteredEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const [opened, setOpened] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  let [search, setSearch] = useState('');
  let [temp, setTemp] = useState({});
  let [tempId, setTempId] = useState('');
  const REST_API_URL =
    'http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/users/';

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    console.log('here');
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let mounted = true;
    getList();
  }, []);

  function getList() {
    return fetch(REST_API_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((items) => setUserInfo(items));
  }
  const handleChangeEdit = (event) => {
    UserInfo.find((user) => {
      return user.id === event.target.value;
    });
  };
  const deleteUser = (id) => {
    delete UserInfo.find((user) => {
      return user.id === id;
    });

    fetch(REST_API_URL + id, { method: 'Delete' }).then((result) => {
      getList();
      setUserInfo([...UserInfo]);
    });
  };
  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleChangeAdmin = (id) => {
    UserInfo.find((user) => {
      return user.id === id;
    }).admin =
      UserInfo.find((user) => {
        return user.id === id;
      }).admin == 0
        ? 1
        : 0;
    const a = UserInfo.find((user) => {
      return user.id === id;
    });
    const REST_API_URL =
      'http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/users/';
    fetch(REST_API_URL + a.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(a),
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          // HANDLE ERROR
          throw new Error('Something went wrong');
        }
      })
      .then((data) => {
        // HANDLE RESPONSE DATA
        console.log([...UserInfo]);
        setUserInfo([...UserInfo]);
      })
      .catch((error) => {
        // HANDLE ERROR
        console.log(error);
      });
  };

  //////////////////

  const editUser = (event) => {
    setAnchorEl(event.currentTarget);
  };

  ////////////////////
  const handleChange = (id) => {
    UserInfo.find((user) => {
      return user.id === id;
    }).active =
      UserInfo.find((user) => {
        return user.id === id;
      }).active == 0
        ? 1
        : 0;
    const u = UserInfo.find((user) => {
      return user.id === id;
    });
    const REST_API_URL =
      'http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/users/';
    fetch(REST_API_URL + u.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(u),
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          // HANDLE ERROR
          console.log(u.id);
          throw new Error('Something went wrong');
        }
      })
      .then((data) => {
        // HANDLE RESPONSE DATA
        console.log([...UserInfo]);
        setUserInfo([...UserInfo]);
      })
      .catch((error) => {
        // HANDLE ERROR
        console.log(error);
      });
  };

  const handleSubmitModal = (event) => {
    event.preventDefault();

    console.log('modal');
    if (enteredFirstName != '' && enteredLastName != '' && enteredEmail != '') {
      const newUser = {
        firstName: enteredFirstName,
        lastName: enteredLastName,
        email: enteredEmail,
        password: 'Ab123456!',
      };
      console.log(newUser);

      fetch(REST_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(newUser),
      })
        .then((response) => {
          if (response.ok) {
            getList();
            setOpen(false);
          } else {
            throw new Error('Something went wrong');
          }
        })
        .catch((error) => {
          // HANDLE ERROR
          console.log(error);
        });
    }
  };

  const handleSubmitPopover = (event) => {
    event.preventDefault();

    console.log('jygfuxcfvghjkjihgfcghjkhgfcgvhjkljh');
    if (
      UserInfo.find((user) => {
        return user.id === tempId;
      }).firstName != '' &&
      UserInfo.find((user) => {
        return user.id === tempId;
      }).lastName != '' &&
      UserInfo.find((user) => {
        return user.id === tempId;
      }).email != ''
    ) {
      const newUser = {
        firstName: UserInfo.find((user) => {
          return user.id === tempId;
        }).firstName,
        lastName: UserInfo.find((user) => {
          return user.id === tempId;
        }).lastName,
        email: UserInfo.find((user) => {
          return user.id === tempId;
        }).email,
        password: UserInfo.find((user) => {
          return user.id === tempId;
        }).password,
        active: UserInfo.find((user) => {
          return user.id === tempId;
        }).active,
        admin: UserInfo.find((user) => {
          return user.id === tempId;
        }).admin,
      };
      console.log(newUser);

      fetch(
        REST_API_URL +
          UserInfo.find((user) => {
            return user.id === tempId;
          }).id,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(newUser),
        }
      )
        .then((response) => {
          if (response.ok) {
            setUserInfo([...UserInfo]);
            // getList();
            setOpened(false);
          } else {
            throw new Error('Something went wrong');
          }
        })
        .catch((error) => {
          // HANDLE ERROR
          console.log(error);
        });
    }
  };

  const opene = Boolean(anchorEl);
  const id = opene ? 'simple-popover' : undefined;

  const { setToken } = props;
  return (
    <Fragment>
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
          Admin Page
        </h1>
      </div>
      <Grid
        container
        direction='row'
        alignItems='center'
        style={{
          alignItems: 'unset',
        }}
      >
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
            onClick={(event) => {
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
            <ExitToAppIcon />
            Log Out
          </Link>
        </div>
        <div>
          {' '}
          <Grid container direction='row' justify='space-evenly'>
            <div>
              <button
                onClick={(event) => setOpen(true)}
                className='topButtons'
                style={{ marginLeft: '230px' }}
              >
                Add Client
              </button>{' '}
              <SearchBar handleInput={handleInput} />
            </div>
          </Grid>
          <table style={{ marginLeft: '300px' }}>
            <tr style={{ backgroundColor: 'rgba(162, 192, 159, 0.3)' }}>
              <th></th>

              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Activate</th>
              <th>Admin</th>
            </tr>
            {UserInfo.filter((dynamicData) => {
              return (
                dynamicData != null &&
                (dynamicData.firstName
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                  dynamicData.lastName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  dynamicData.id.toString().includes(search.toString()))
              );
            }).map((dynamicData, index) => (
              <tr>
                <td>
                  {' '}
                  {adminId != dynamicData.id ? (
                    <button onClick={() => deleteUser(dynamicData.id)}>
                      {' '}
                      <DeleteIcon />
                    </button>
                  ) : null}
                  {adminId != dynamicData.id ? (
                    <button
                      style={{ marginLeft: '3px' }}
                      aria-describedby={id}
                      onClick={() => {
                        setI(index);
                        temp = UserInfo[index];
                        setTempId(dynamicData.id);
                        setTemp(temp);
                        console.log(temp);
                        setOpened(true);
                      }}
                    >
                      <BorderColorIcon />
                    </button>
                  ) : null}
                </td>

                <td> {dynamicData.id}</td>
                <td> {dynamicData.firstName}</td>
                <td> {dynamicData.lastName}</td>
                <td> {dynamicData.email}</td>

                <td>
                  {adminId != dynamicData.id ? (
                    <Switch
                      checked={dynamicData.active === 1}
                      onChange={() => handleChange(dynamicData.id)}
                    />
                  ) : null}
                </td>
                <td>
                  {adminId != dynamicData.id ? (
                    <Switch
                      checked={dynamicData.admin === 1}
                      onChange={() => handleChangeAdmin(dynamicData.id)}
                    />
                  ) : null}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </Grid>
      <Modal open={open} onClose={onCloseModal} center>
        <div className='Modal'>
          <h4>Add a User</h4>
          <form onSubmit={handleSubmitModal}>
            <label className='Label'> First Name :</label>
            <input
              style={{ marginLeft: '0px' }}
              id='firstName'
              className='In'
              type='text'
              name='firstName'
              value={enteredFirstName}
              onChange={(event) => {
                setEnteredFirstName(event.target.value);
              }}
            />
            <br />
            <label className='Label'>Last Name</label>
            <input
              id='myInput'
              className='In'
              style={{ margin: '10px 40px 0px 10px' }}
              type='text'
              name='lastName'
              value={enteredLastName}
              onChange={(event) => {
                setEnteredLastName(event.target.value);
              }}
            />
            <br />
            <label className='Label'> Email:</label>
            <input
              id='myInput'
              className='In'
              style={{ marginLeft: '42px' }}
              type='email'
              name='email'
              value={enteredEmail}
              onChange={(event) => {
                setEnteredEmail(event.target.value);
              }}
            />

            <br />
            <button className='buttonSaveModal' type='submit'>
              Save
            </button>
          </form>
        </div>
      </Modal>
      <div>
        <Popover
          id={id}
          open={opened}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography className={classes.typography}>
            <div className='Modal'>
              <h4>Edit a User</h4>
              <form onSubmit={handleSubmitPopover}>
                <label className='Label'> First Name :</label>
                <input
                  style={{ marginLeft: '0px' }}
                  id='firstName'
                  className='In'
                  type='text'
                  name='firstName'
                  value={
                    UserInfo.find((user) => {
                      return user.id === tempId;
                    }) != null
                      ? UserInfo.find((user) => {
                          return user.id === tempId;
                        }).firstName
                      : 'jhbjb'
                  }
                  onChange={(event) => {
                    UserInfo.find((user) => {
                      return user.id === tempId;
                    }).firstName = event.target.value;
                    setUserInfo([...UserInfo]);
                  }}
                />
                <br />
                <label className='Label'>Last Name</label>
                <input
                  //  style={{ marginLeft: "40px" }}
                  id='myInput'
                  className='In'
                  style={{ margin: '10px 40px 0px 10px' }}
                  type='text'
                  name='lastName'
                  value={
                    UserInfo.find((user) => {
                      return user.id === tempId;
                    }) != null
                      ? UserInfo.find((user) => {
                          return user.id === tempId;
                        }).lastName
                      : 'jhbjb'
                  }
                  //onChange={handleChangeEdit(tempId)}
                  onChange={(event) => {
                    UserInfo.find((user) => {
                      return user.id === tempId;
                    }).lastName = event.target.value;
                    setUserInfo([...UserInfo]);
                  }}
                />
                <br />
                <label className='Label'> Email:</label>
                <input
                  style={{ marginLeft: '42px' }}
                  id='myInput'
                  className='In'
                  // style={{ margin: "10px 10px 10px 10px" }}
                  type='email'
                  name='email'
                  value={
                    UserInfo.find((user) => {
                      return user.id === tempId;
                    }) != null
                      ? UserInfo.find((user) => {
                          return user.id === tempId;
                        }).email
                      : 'jhbjb'
                  }
                  onChange={(event) => {
                    UserInfo.find((user) => {
                      return user.id === tempId;
                    }).email = event.target.value;
                    setUserInfo([...UserInfo]);
                  }}
                />

                <br />
                <button className='buttonSaveModal' type='submit'>
                  Save
                </button>
                <button
                  className='buttonSaveModal'
                  type='button'
                  onClick={() => {
                    setOpened(false);
                    getList();
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </Typography>
        </Popover>
      </div>
    </Fragment>
  );
}
export default Admin;

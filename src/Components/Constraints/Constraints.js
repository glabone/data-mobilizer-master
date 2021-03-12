import React, { useEffect, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
function Constraints() {
  const [radio, setRadio] = useState('');

  const handleChange = (event) => {
    setRadio(event.target.value);
  };
  return (
    <div>
      <FormControl component='constraint'>
        <RadioGroup
          aria-label='Constraints'
          name='constraints'
          value={radio}
          onClick={handleChange}
        >
          <FormControlLabel
            value='all'
            control={<Radio />}
            label='Select all data'
          />

          <FormControlLabel
            value='constraint'
            control={<Radio />}
            label='Select by constraint'
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default Constraints;

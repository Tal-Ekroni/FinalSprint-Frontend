import * as React from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};





const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: '#3a8589',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 3,
  },
}));

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

export default function PriceRangeSlider({ onSetPageFilter }) {
  const [value, setValue] = React.useState([20, 1500])

  const handleChange = (event, newValue) => {
    setValue(newValue)
    onSetPageFilter('priceRange', newValue)
  }

  return (
    <div className="price-range-container flex ">
      <Box sx={{ width: 320 }}>
        <h3 style={{ textAlign: 'center' }}>Pick Your Price Range</h3>
        <Box sx={{ m: 3 }} />
        <AirbnbSlider
          components={{ Thumb: AirbnbThumbComponent }}
          getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
          defaultValue={[20, 1500]}
          onChange={handleChange}
          max={1500}
        />
        <div className="picks-container ">
          <div className="min-price flex column align-center">
            <span className="price-range-span" htmlFor="minPrice">Min price</span>
            <input className="min-input" type="number" value={value[0]} />
          </div>
          <div className="max-price flex column align-center">
            <span className="price-range-span" htmlFor="maxPrice">Max price</span>
            <input className="max-input" type="number" value={value[1]} />
          </div>
        </div>
      </Box>
    </div>
  );
}

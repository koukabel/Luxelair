import React, { useCallback, useEffect, useState, useRef } from "react";
import { Stack, Flex, Input, Container } from "@chakra-ui/react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark, Tooltip
} from '@chakra-ui/react'


const PriceRangeSlider = () => {
  const min = 500;
  const max = 10000;
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const [intialValue, setInitialValue] = React.useState(500)
 const [showTooltip, setShowTooltip] = React.useState(false)
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  // useEffect(() => {
  //   onChange({ min: minVal, max: maxVal });
  // }, [minVal, maxVal, onChange]);

  return (
    <Flex justifyContent='center' alignItems='center' h='5rem'>
        <Input
        type="range"
        min={min}
        max={max}
       //value={minVal}
        // onChange={(event) => {
        //   const value = Math.min(Number(event.target.value), maxVal - 1);
        //   setMinVal(value);
        //   minValRef.current = value;
        // }}
        // className="thumb thumb--left"
        // style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <Input
        type="range"
        min={min}
        max={max}
       // value={maxVal}
        // onChange={(event) => {
        //   const value = Math.max(Number(event.target.value), minVal + 1);
        //   setMaxVal(value);
        //   maxValRef.current = value;
        // }}
        // className="thumb thumb--right"
      />
    </Flex>
  );
};





//  return (

//   <Flex justifyContent='center' alignItems='center' h='7rem'> 
// {/* <Input min="500" max="10000" step="100" type="range" w='300px'  />
// <Input min="500" max="10000" step="100" type="range" w='300px'  /> */}
// <Slider
//       id='slider'
//       defaultValue={5}
//       min={0}
//       max={100}
//       colorScheme='pink'
//       onChange={(v) => setInitialValue(v)}
//       onMouseEnter={() => setShowTooltip(true)}
//       onMouseLeave={() => setShowTooltip(false)}
//     >

//       <Tooltip
//         hasArrow
//         bg='black'
//         color='white'
//         placement='top'
//         isOpen={showTooltip}
//         label={`${intialValue}`}
//       >
//         <SliderThumb />
//       </Tooltip>
//     </Slider>
//     <Slider
//       id='slider'
//       defaultValue={5}
//       min={0}
//       max={100}
//       colorScheme='teal'
//       onChange={(v) => setInitialValue(v)}
//       onMouseEnter={() => setShowTooltip(true)}
//       onMouseLeave={() => setShowTooltip(false)}
//     >
//       <SliderTrack>
//         <SliderFilledTrack />
//       </SliderTrack>
//       <Tooltip
//         hasArrow
//         bg='teal.500'
//         color='white'
//         placement='top'
//         isOpen={showTooltip}
//         label={`${intialValue}%`}
//       >
//         <SliderThumb />
//       </Tooltip>
//     </Slider>
//   </Flex>

//  )




export default PriceRangeSlider;

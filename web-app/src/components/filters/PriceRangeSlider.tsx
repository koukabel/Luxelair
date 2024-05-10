
import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Tooltip
} from "@chakra-ui/react";

const PriceRangeSlider = ({ min, max,  onSliderValueChange, newSliderValue}) => {
  const priceValues = (value) => {
    const percentage = Math.round(((value - min) / (max - min)) * 100);
    return percentage.toFixed(2); // no decimal numbers
};

  const handleSliderChange = (newValue) => {
 
    const denormalizedValue = [
      min + (max - min) * (newValue[0] / 100),
      min + (max - min) * (newValue[1] / 100)
    ];
     onSliderValueChange(denormalizedValue);
  
  };

  return (
    <Flex justifyContent="center" alignItems="center" h="5rem">
      <RangeSlider
        aria-label={["min", "max"]}
        defaultValue={[priceValues(min), priceValues(max)]}
        onChange={handleSliderChange}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <Tooltip hasArrow closeOnClick={false} label={`${newSliderValue[0]}`}>
          <RangeSliderThumb boxSize={5} index={0} />
        </Tooltip>
        <Tooltip hasArrow closeOnClick={false} label={`${newSliderValue[1]}`}>
          <RangeSliderThumb boxSize={5} index={1} />
        </Tooltip>
      </RangeSlider>
    </Flex>
  );
};

export default PriceRangeSlider;

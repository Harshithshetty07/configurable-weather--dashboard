import React from 'react';

interface TemperatureContextType {
  unit: 'celsius' | 'fahrenheit';
  toggleUnit: () => void;
}

export const TemperatureContext = React.createContext<TemperatureContextType>({
  unit: 'celsius',
  toggleUnit: () => {},
});
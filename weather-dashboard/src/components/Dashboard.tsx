import React, { useState, useEffect } from 'react';
import { Box, Button, Grid } from '@mui/material';
import WeatherWidget from './WeatherWidget';
import { TemperatureContext } from './TemperatureContextType';

interface DashboardState {
  widgets: { id: string; city: string }[]; // Update to include city
}

const Dashboard: React.FC = () => {
  const [widgets, setWidgets] = useState<{ id: string; city: string }[]>([]);
  const [temperatureUnit, setTemperatureUnit] = useState<'celsius' | 'fahrenheit'>('celsius');

  useEffect(() => {
    const savedState = localStorage.getItem('dashboardState');
    if (savedState) {
      const parsedState: DashboardState = JSON.parse(savedState);
      setWidgets(parsedState.widgets);
    }
  }, []);

  useEffect(() => {
    const state: DashboardState = { widgets };
    localStorage.setItem('dashboardState', JSON.stringify(state));
  }, [widgets]);

  const addWidget = () => {
    // Example: You can prompt for city or use a default one
    const city = prompt("Enter city name:", "New York") || "New York"; // Default city
    setWidgets([...widgets, { id: `widget-${Date.now()}`, city }]);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prev => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  return (
    <TemperatureContext.Provider value={{ unit: temperatureUnit, toggleUnit: toggleTemperatureUnit }}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Button variant="contained" onClick={addWidget} sx={{ mb: 2 }}>
          Add Widget
        </Button>
        <Button variant="outlined" onClick={toggleTemperatureUnit} sx={{ ml: 2, mb: 2 }}>
          Toggle °C/°F
        </Button>
        <Grid container spacing={3}>
          {widgets.map(widget => (
            <Grid item xs={12} sm={6} md={4} key={widget.id}>
              <WeatherWidget id={widget.id} city={widget.city} onRemove={() => removeWidget(widget.id)} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </TemperatureContext.Provider>
  );
};

export default Dashboard;

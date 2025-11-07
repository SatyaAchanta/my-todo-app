import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { useWeatherData } from './hooks/useWeatherData';

const Footer = () => {
  const { days, isLoading, error } = useWeatherData();

  if (isLoading) {
    return (
      <div className="w-full bg-gray-50 py-8 mt-8 border-t-2 border-green-200">
        <div className="flex gap-2 justify-center items-center">
          <CircularProgress size={40} />

          <Typography variant="body2" className="ml-8">
            Loading weather data for New York...
          </Typography>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-gray-50 py-8 mt-8 border-t-2 border-gray-200">
        <div className="flex justify-center items-center">
          <Typography variant="body1" color="error">
            Unable to load weather data: {error}
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-r from-red-900 to-indigo-900 py-8 mt-8 border-t-2 border-blue-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <Typography
            variant="h5"
            component="h2"
            className="text-center mb-60 font-bold text-zinc-50"
          >
            🗽 New York Weather - 5 Day Forecast
          </Typography>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch">
          {days.map((day, index) => (
            <Card
              key={index}
              className="flex-1 min-w-[150px] max-w-[200px] hover:shadow-lg transition-shadow duration-300"
              elevation={3}
            >
              <CardContent className="text-center">
                <Typography
                  variant="h6"
                  component="div"
                  className="font-semibold mb-2 text-blue-900"
                >
                  {day.dayName}
                </Typography>

                <Box className="text-5xl my-3">{day.weatherEmoji}</Box>

                <Typography
                  variant="body2"
                  className="text-gray-600 mb-3 min-h-[40px]"
                >
                  {day.weatherDescription}
                </Typography>

                <div className="flex justify-center items-center gap-2">
                  <Typography variant="h6" className="font-bold text-red-600">
                    {day.maxTemp}°
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    /
                  </Typography>
                  <Typography variant="h6" className="font-bold text-blue-600">
                    {day.minTemp}°
                  </Typography>
                </div>

                <Typography
                  variant="caption"
                  className="text-gray-500 mt-2 block"
                >
                  {new Date(day.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;

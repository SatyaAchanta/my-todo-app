import { useState, useEffect } from 'react';

export type WeatherDay = {
  date: string;
  dayName: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  weatherDescription: string;
  weatherEmoji: string;
};

type WeatherData = {
  days: WeatherDay[];
  isLoading: boolean;
  error: string | null;
};

// Weather code to description and emoji mapping
const getWeatherInfo = (
  code: number
): { description: string; emoji: string } => {
  const weatherMap: { [key: number]: { description: string; emoji: string } } =
    {
      0: { description: 'Clear sky', emoji: '☀️' },
      1: { description: 'Mainly clear', emoji: '🌤️' },
      2: { description: 'Partly cloudy', emoji: '⛅' },
      3: { description: 'Overcast', emoji: '☁️' },
      45: { description: 'Foggy', emoji: '🌫️' },
      48: { description: 'Foggy', emoji: '🌫️' },
      51: { description: 'Light drizzle', emoji: '🌦️' },
      53: { description: 'Drizzle', emoji: '🌦️' },
      55: { description: 'Heavy drizzle', emoji: '🌧️' },
      61: { description: 'Light rain', emoji: '🌧️' },
      63: { description: 'Rain', emoji: '🌧️' },
      65: { description: 'Heavy rain', emoji: '⛈️' },
      71: { description: 'Light snow', emoji: '🌨️' },
      73: { description: 'Snow', emoji: '❄️' },
      75: { description: 'Heavy snow', emoji: '❄️' },
      77: { description: 'Snow grains', emoji: '🌨️' },
      80: { description: 'Light showers', emoji: '🌦️' },
      81: { description: 'Showers', emoji: '🌧️' },
      82: { description: 'Heavy showers', emoji: '⛈️' },
      85: { description: 'Light snow showers', emoji: '🌨️' },
      86: { description: 'Snow showers', emoji: '❄️' },
      95: { description: 'Thunderstorm', emoji: '⛈️' },
      96: { description: 'Thunderstorm with hail', emoji: '⛈️' },
      99: { description: 'Thunderstorm with hail', emoji: '⛈️' },
    };

  return weatherMap[code] || { description: 'Unknown', emoji: '🌡️' };
};

const getDayName = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
};

export const useWeatherData = (): WeatherData => {
  const [days, setDays] = useState<WeatherDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // New York coordinates
        const latitude = 40.7128;
        const longitude = -74.006;

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&temperature_unit=fahrenheit&timezone=America/New_York&forecast_days=5`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();

        const weatherDays: WeatherDay[] = data.daily.time.map(
          (date: string, index: number) => {
            const weatherInfo = getWeatherInfo(data.daily.weather_code[index]);
            return {
              date,
              dayName: getDayName(date),
              maxTemp: Math.round(data.daily.temperature_2m_max[index]),
              minTemp: Math.round(data.daily.temperature_2m_min[index]),
              weatherCode: data.daily.weather_code[index],
              weatherDescription: weatherInfo.description,
              weatherEmoji: weatherInfo.emoji,
            };
          }
        );

        setDays(weatherDays);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return { days, isLoading, error };
};

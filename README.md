# A simple weather app

This is a simple app that displays the weather for a given location. It uses the Weather API to get the weather data.

## Features

- Display the current weather for a given location

## Project Setup

Pull the repo and install the dependencies.

```sh
git clone https://github.com/KelvinNjihia/simple-vue-weather-app.git

cd simple-vue-weather-app

npm install
```

Run the app.

```sh
npm run dev
```

## API

The app uses the Weather API [WeatherAPI](https://www.weatherapi.com/) to get the weather data. Signup and get an API key. The API key is stored in the `.env` file.
Create a `.env` file in the root of the project and add the following:

```
VITE_WEATHER_API_KEY=your_api_key
```

## Testing

The app uses Vitest for testing.

```sh
npm run test:unit
```

## Style

The app uses Tailwind CSS v4 for styling.

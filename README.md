# 🌤️ Weather App

A beautiful and modern weather application built with React that provides real-time weather information and 5-day forecasts for cities worldwide.

## ✨ Features

- **Real-time Weather Data**: Get current weather conditions for any city
- **5-Day Forecast**: View weather predictions for the next 5 days
- **Beautiful UI**: Modern, responsive design with gradient backgrounds
- **Weather Icons**: Visual representation of weather conditions
- **Detailed Information**: Temperature, humidity, wind speed, pressure, and visibility
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your API Key**
   - Go to [OpenWeatherMap](https://openweathermap.org/)
   - Sign up for a free account
   - Navigate to your API keys section
   - Copy your API key

4. **Configure the API Key**
   - Open `src/App.js`
   - Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```javascript
   const API_KEY = "your_actual_api_key_here";
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload when you make changes

## 🎯 How to Use

1. **Enter a city name** in the search input field
2. **Press Enter** or click the "Search" button
3. **View current weather** information including:
   - Temperature and "feels like" temperature
   - Weather description with icons
   - Humidity, wind speed, pressure, and visibility
4. **Scroll down** to see the 5-day forecast

## 🛠️ Built With

- **React** - Frontend framework
- **OpenWeatherMap API** - Weather data provider
- **CSS3** - Styling with modern features like gradients and flexbox
- **JavaScript ES6+** - Modern JavaScript features

## 📱 Responsive Design

The app is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## 🌍 API Information

This app uses the OpenWeatherMap API which provides:
- Current weather data
- 5-day weather forecast
- Weather icons and descriptions
- Multiple units (metric/imperial)

## 📝 Notes

- The free tier of OpenWeatherMap API has rate limits
- API calls are made only when you search for a city
- Weather data is updated in real-time
- The app uses metric units (Celsius, m/s, hPa)

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [Create React App](https://create-react-app.dev/) for the project setup
- Weather icons and emojis for visual representation

---

**Happy Weather Tracking! ☀️🌧️❄️**

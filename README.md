# Weather Scraper – Current Conditions & Forecasts

Extract current weather conditions and forecasts. Get structured data for weather monitoring, travel planning, and climate analysis.

## What it extracts

- Current temperature and conditions
- Humidity and wind speed
- 3-day and 7-day forecasts
- Precipitation probability
- UV index and air quality

## Use cases

- **Travel planning** — Check weather for destinations
- **Event planning** — Prepare for outdoor events
- **Agriculture** — Monitor growing conditions
- **Energy trading** — Analyze temperature impact on demand

## Notes

- Scrapes publicly available weather data
- Supports multiple locations
- No API key required

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| location | string | Yes | City or zip code |
| units | string | No | celsius or fahrenheit (default: fahrenheit) |

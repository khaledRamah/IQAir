# 🧾 Air Quality Monitoring API – Technical Documentation

## 📌 Overview

This is a NestJS-based backend service that provides real-time air quality data using the **IQAir API**, stores pollution data for **Paris** every minute via a CRON job, and identifies when Paris experienced the **worst air pollution**.

---

## 🚀 Features

- 🌐 Fetch air quality by coordinates (`lat`, `lon`)
- ⏱️ CRON job to store pollution data for **Paris every minute**
- 📦 Save pollution records with timestamp and created time
- 🗂️ Get the datetime Paris was **most polluted**
- 🐘 PostgreSQL + MikroORM for persistence
- 📖 Swagger UI documentation (`/docs`)

---

## 🏗️ Architecture
- **Controller**: `AirQualityController` handles API requests
- **Service**: `AirQualityService` handles business logic
- **Utility**: `IQAirService` fetches data from IQAir API
- **Mapper**: Transforms IQAir response to DTO
- **Entity**: `AirQuality` for storing pollution logs
- **CRON Job**: Scheduled job to collect data for Paris
- **Migration**: Uses MikroORM for schema management.
- **Testing** : Unit & integration
- **Devops**
- **READ ME**
---

## 🧪 API Endpoints

### 1. Get Nearest City Air Quality

**GET** `/air-quality/nearest?lat=48.8566&lon=2.3522`

**Query Parameters:**

| Param | Type   | Description         |
|-------|--------|---------------------|
| lat   | string | Latitude (required) |
| lon   | string | Longitude (required)|


### 2. Get Most Polluted Date and Time for location

**GET** `/air-quality/most-polluted-date`

**Description:**  
Fetches the most polluted recorded timestamp for location, based on stored historical air quality data.

## 🏃 How to Run the Project
---
### 1. Install packages and add env file
```
  install packages: npm i 
  Duplicate .env.example and rename it to be .env 
```

### 2. Run the App with Docker Compose
```bash
  docker-compose up -d
```

This will start your NestJS app
Connect to your database (defined in docker-compose.yml)
Schedule cron jobs (e.g., fetch Paris air quality every minute)

### 3 Run migration scripts 
```
  docker-compose exec app npx mikro-orm migration:create
  docker-compose exec app npx mikro-orm migration:up
```
### 4. Access the API & swagger will allow you to call the apis
```
  API: http://localhost:3001
  Swagger Docs: http://localhost:3001/docs
```

### 4. Run test cases
```
Unit test : npm run test
Integration : npm run test:e2e 
```
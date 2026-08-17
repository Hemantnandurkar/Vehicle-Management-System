# Vehicle Management System — CDAC Mini Project 🚗

A complete, professional, production-grade **Vehicle Management System** built for **CDAC PG-DAC** academic project demonstrations and technical interviews.

This application features a fully decoupled architecture: an **ASP.NET Core 8 Web API** backend connected to **Microsoft SQL Server** via **Entity Framework Core 8 Code First**, paired with a modern **React 18 + Vite** frontend styled with a custom **Plain CSS** design system.

---

## 🌟 Key Features

### 🔐 Authentication & Security
- **JWT (JSON Web Token) Authentication**: Stateless authentication with claims.
- **Secure Password Hashing**: Hashed using **BCrypt.Net**.
- **Role-Based Authorization**:
  - **Admin**: Full CRUD privileges (Add, View, View Details, Edit, Delete, Search, Filter).
  - **User**: View, View Details, Search, and Filter privileges. Restricted from modifying data.
- **Protected Client Routes**: Automatic route protection based on authentication status and user role.

### 🚘 Vehicle Management (CRUD)
- Complete vehicle information tracking:
  - Vehicle ID, Unique Registration Number, Vehicle Name, Brand, Model, Fuel Type, Registration Date, Manufacturing Year, Owner Name, Contact Number, Status.
- Supported Fuel Types: `Petrol`, `Diesel`, `CNG`, `Electric`, `Hybrid`.
- Supported Operational Statuses: `Active`, `In Service`, `Inactive`.

### 🔍 Additional Specialized APIs
1. **Search by Vehicle Number**: `GET /api/vehicles/search?vehicleNumber=`
2. **Filter Active Vehicles**: `GET /api/vehicles/active`
3. **Filter Vehicles by Brand**: `GET /api/vehicles/brand/{brand}`
4. **Live Dashboard Metrics**: `GET /api/vehicles/dashboard-stats` (Returns real-time database counts for Total, Active, In Service, and Inactive vehicles).

### 🎨 User Interface & UX
- Modern glassmorphism dark theme built with pure **Plain CSS** (No heavy UI frameworks).
- Live real-time dashboard displaying database metrics.
- Instant search and multi-criteria filtering (Brand, Status, Fuel Type).
- Confirmation modal dialogs for critical actions (e.g., delete vehicle).
- Quick fill demo login buttons for seamless interview demonstrations.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Backend** | ASP.NET Core 8 Web API, C#, Async/Await, Dependency Injection |
| **Database & ORM** | Microsoft SQL Server, Entity Framework Core 8 Code First |
| **Security** | JWT Bearer Authentication, Role Authorization, BCrypt.Net-Next |
| **API Documentation** | Swagger UI / OpenAPI with Bearer Security Definition |
| **Frontend** | React 18, Vite, React Router DOM v6, Axios, React Context API |
| **Styling** | Plain Vanilla CSS (Custom Design System, Glassmorphism, Responsive Grid) |

---

## 📁 Project Structure

```
VehicleManagementSystem/
├── VehicleManagementSystem.sln            # .NET Solution File
├── VehicleManagementAPI/                   # ASP.NET Core 8 Web API Project
│   ├── Controllers/                        # REST Controller Endpoints
│   │   ├── AuthController.cs
│   │   └── VehiclesController.cs
│   ├── Services/                           # Business Logic Layer
│   │   ├── IAuthService.cs
│   │   ├── AuthService.cs
│   │   ├── IVehicleService.cs
│   │   └── VehicleService.cs
│   ├── Repositories/                        # Data Access Abstraction Layer
│   │   ├── IUserRepository.cs
│   │   ├── UserRepository.cs
│   │   ├── IVehicleRepository.cs
│   │   └── VehicleRepository.cs
│   ├── DTOs/                               # Data Transfer Objects
│   │   ├── AuthDtos.cs
│   │   └── VehicleDtos.cs
│   ├── Models/                             # EF Core Entity Definitions
│   │   ├── User.cs
│   │   └── Vehicle.cs
│   ├── Data/                               # DbContext & Seeder
│   │   ├── ApplicationDbContext.cs
│   │   └── DbSeeder.cs
│   ├── Helpers/                            # Security Utilities
│   │   ├── JwtHelper.cs
│   │   └── PasswordHasher.cs
│   ├── Middleware/                         # Global Exception Handler
│   │   └── ExceptionHandlingMiddleware.cs
│   ├── Migrations/                         # EF Core Code First Migrations
│   ├── appsettings.json                    # Configuration & Connection String
│   └── Program.cs                          # Web API Entrypoint & DI Setup
│
└── vehicle-management-ui/                 # React + Vite Frontend Application
    ├── src/
    │   ├── components/                     # Reusable UI Components
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── AdminRoute.jsx
    │   │   ├── ConfirmModal.jsx
    │   │   └── StatCard.jsx
    │   ├── context/                        # Global State
    │   │   └── AuthContext.jsx
    │   ├── pages/                          # Application Pages
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── VehicleList.jsx
    │   │   ├── VehicleDetails.jsx
    │   │   ├── AddVehicle.jsx
    │   │   ├── EditVehicle.jsx
    │   │   └── NotFound.jsx
    │   ├── services/                       # Axios API Integration
    │   │   ├── api.js
    │   │   ├── authService.js
    │   │   └── vehicleService.js
    │   ├── App.jsx                         # Main Router Definition
    │   ├── index.css                       # Complete Plain CSS Design System
    │   └── main.jsx                        # React Root Entry Point
    ├── package.json
    └── vite.config.js
```

---

## ⚡ Demo Credentials

For quick evaluation and interview demonstration, pre-seeded accounts are automatically created upon running the backend:

| Role | Email | Password | Allowed Actions |
|---|---|---|---|
| **Admin** | `admin@vms.com` | `Admin@123` | Full Access: View, Search, Filter, Add, Edit, Delete |
| **User** | `user@vms.com` | `User@123` | Read Access: View, Search, Filter, View Details |

*(You can also register a new account on the Register page, which defaults to `User` role).*

---

## 🚀 How to Run the Project

### Prerequisites
- **.NET 8 SDK** (or later)
- **Node.js** (v18+) & **npm**
- **Microsoft SQL Server** (LocalDB, SQL Express, or full SQL Server instance)

---

### Step 1: Database Setup & Configuration

1. Open `VehicleManagementAPI/appsettings.json`.
2. Update the `ConnectionStrings:DefaultConnection` setting to point to your local SQL Server instance if needed:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=VehicleManagementDb;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True"
}
```

3. *(Optional)* If you wish to manually apply migrations via CLI, run:
```bash
cd VehicleManagementAPI
dotnet ef database update
```
*(Note: The API automatically applies pending EF Core migrations and seeds initial database records on application startup!)*

---

### Step 2: Running the Backend (ASP.NET Core Web API)

```bash
# Navigate to API project directory
cd VehicleManagementAPI

# Restore dependencies and start server
dotnet run --urls=http://localhost:5000
```

- API Base URL: `http://localhost:5000`
- Interactive Swagger UI: `http://localhost:5000/swagger`

---

### Step 3: Running the Frontend (React + Vite)

Open a new terminal window:

```bash
# Navigate to UI project directory
cd vehicle-management-ui

# Install dependencies (if not already installed)
npm install

# Start Vite development server
npm run dev
```

- React App URL: `http://localhost:5173`

---

## 📡 API Endpoint Reference

### Authentication Endpoints
- `POST /api/auth/register` — Register new user account.
- `POST /api/auth/login` — Authenticate and retrieve JWT token.

### Vehicle Endpoints
- `GET /api/vehicles` — Get all vehicles (*Admin, User*).
- `GET /api/vehicles/{id}` — Get single vehicle by ID (*Admin, User*).
- `POST /api/vehicles` — Add new vehicle (*Admin Only*).
- `PUT /api/vehicles/{id}` — Update existing vehicle (*Admin Only*).
- `DELETE /api/vehicles/{id}` — Delete vehicle (*Admin Only*).

### Specialized Filter & Search Endpoints
- `GET /api/vehicles/search?vehicleNumber=` — Search vehicle by registration number (*Admin, User*).
- `GET /api/vehicles/active` — Fetch all active vehicles (*Admin, User*).
- `GET /api/vehicles/brand/{brand}` — Fetch vehicles by brand (*Admin, User*).
- `GET /api/vehicles/dashboard-stats` — Fetch database summary metrics (*Admin, User*).

---

## 🛡️ Testing APIs via Swagger

1. Open `http://localhost:5000/swagger` in your web browser.
2. Expand `POST /api/auth/login` and click **Try it out**.
3. Login using `admin@vms.com` and `Admin@123`.
4. Copy the `token` string from the JSON response.
5. Scroll up and click the green **Authorize** button at the top right of Swagger UI.
6. Type `Bearer ` followed by a space and paste your JWT token (e.g. `Bearer eyJhbGci...`).
7. Click **Authorize**. Now you can test all protected APIs directly from Swagger!

---

## 🎯 CDAC Interview Talking Points

1. **Layered Architecture**: Demonstrates clean separation of concerns using Repository pattern (`IVehicleRepository`), Service pattern (`IVehicleService`), DTO mapping, and REST Controllers.
2. **Security**: Password hashing using BCrypt salting, stateless JWT tokens with role claims, and backend role validation via `[Authorize(Roles = "Admin")]`.
3. **Database Integration**: Entity Framework Core 8 Code First approach with model constraints, unique index rules, and automatic migration execution via `DbSeeder`.
4. **Frontend Architecture**: Decoupled React app consuming REST APIs via Axios interceptors, managing session persistence via React Context API, and handling client-side role authorization cleanly.

---

## 📄 License
This project is created for educational and academic mini-project purposes as part of the CDAC PG-DAC curriculum.

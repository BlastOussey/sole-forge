# Sole Forge — Custom Sneaker Builder

**WEB103 Unit 4 Project** | CodePath Advanced Web Development

A full-stack item personalizer where users design custom sneakers, save them to a PostgreSQL database, and manage their collection.

---

## Demo Walkthrough

> Replace this with your GIF recording before submitting

![Sole Forge Walkthrough](walkthrough.gif)

---

## Features

### Required Features

- [x] The web app uses React to display data from an API
- [x] Data is supplied to the app using a Render PostgreSQL database
  - [x] The web app uses a Render PostgreSQL database
  - [x] The PostgreSQL database includes a table that matches the data displayed in the web app
- [x] The web app has a well-structured user interface
  - [x] The app provides multiple features of the `CustomItem` (sneaker) for the user to customize — silhouette, colorway, upper material, sole, lace color, and size
  - [x] Each customizable feature has multiple options to choose from
  - [x] The price of the `CustomItem` changes dynamically as different options are selected
  - [x] The visual interface changes in response to at least one customizable feature (SVG sneaker preview updates live with every selection — colorway, silhouette, sole, material, and lace color all produce visible changes)
- [x] The web app allows the user to save new `CustomItem`
  - [x] The user can submit their choices to save the `CustomItem` to the list of created `CustomItem`s
  - [x] Users can view a list of all submitted `CustomItem`s
  - [x] If a user submits a feature combo that is impossible, they receive an appropriate error message (3 validated combos: Canvas+Gum, HighTop+Mesh, CloudWhite+BlackRubber)
- [x] Saved `CustomItem`s can be updated and deleted in the list view
  - [x] Users can edit a submitted `CustomItem` from the list view
  - [x] Users can delete a submitted `CustomItem` from the list view

### Stretch Features

- [ ] User is alerted to impossible combos early (blocking UI before submission)

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, React Router v6, Vite |
| Backend | Node.js, Express |
| Database | PostgreSQL (Render) |
| Styling | Custom CSS with CSS variables |

---

## Project Structure

```
sole-forge/
├── client/                  # React frontend
│   └── src/
│       ├── components/      # Navbar, SneakerPreview (live SVG)
│       ├── pages/           # Customize, Collection, EditSneaker
│       ├── services/        # SneakersAPI.js (fetch wrappers)
│       └── utilities/       # sneakerUtils.js (pricing, validation, options)
└── server/                  # Express backend
    ├── config/              # database.js, reset.js
    ├── controllers/         # sneakers.js (CRUD logic)
    └── routes/              # sneakers.js (Express Router)
```

---

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/BlastOussey/sole-forge.git
cd sole-forge
npm install
cd server && npm install
cd ../client && npm install
```

### 2. Set up Render PostgreSQL

1. Go to [render.com](https://render.com), click **+New → PostgreSQL**
2. Name it, choose free tier, click **Create Database**
3. Copy the connection values

### 3. Configure environment

In `server/`, create a `.env` file (copy from `.env.example`):

```env
PGUSER="your_user"
PGPASSWORD="your_password"
PGHOST="your_host.oregon-postgres.render.com"
PGPORT=5432
PGDATABASE="your_database"
PORT=3001
```

### 4. Seed the database

```bash
cd server
npm run reset
```

### 5. Run the app

From the root:
```bash
npm run dev
```

- Frontend: http://localhost:5173  
- Backend API: http://localhost:3001/api

---

## API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/api/sneakers` | Get all sneakers |
| GET | `/api/sneakers/:id` | Get single sneaker |
| POST | `/api/sneakers` | Create sneaker |
| PUT | `/api/sneakers/:id` | Update sneaker |
| DELETE | `/api/sneakers/:id` | Delete sneaker |

---

## Impossible Combo Rules

| Combo | Why |
|---|---|
| Canvas + Gum sole | Adhesive bond fails under flex |
| High Top + Mesh upper | Insufficient ankle support |
| Cloud White + Black Rubber sole | Aesthetic clash |


# Budget Tracker - Fullstack Application Setup

This is a fullstack budget tracker application with React frontend and Flask backend.

## Frontend Setup (React + Material UI)

The frontend is already set up in the current directory. To run it:

```bash
npm install
npm run dev
```

The frontend will run on `http://localhost:8080` (or the port shown in the terminal).

## Backend Setup (Flask)

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
- On Windows: `venv\Scripts\activate`
- On macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the Flask application:
```bash
python run.py
```

The backend will run on `http://localhost:5000`.

## Application Features

### Current Features:
- ✅ User registration and authentication
- ✅ JWT token-based authentication
- ✅ Protected dashboard route
- ✅ Material UI components
- ✅ Responsive design
- ✅ CORS configuration
- ✅ SQLite database with SQLAlchemy

### Ready for Expansion:
- 📝 Budget categories management
- 📝 Income/expense transactions
- 📝 Financial analytics and reports
- 📝 Budget limits and alerts

## API Endpoints

### Authentication
- `POST /signup` - Create new user account
- `POST /login` - Authenticate user and get JWT token
- `GET /dashboard` - Get user dashboard data (protected)

## Database Models

### User
- id, email, username, password_hash, created_at

### Ready for Future Features:
- Category (budget categories)
- Transaction (income/expense tracking)

## Frontend Structure

```
src/
├── api/           # API service layer with Axios
├── components/    # Reusable components
├── contexts/      # React contexts (Auth)
├── pages/         # Page components
└── ...
```

## Backend Structure

```
backend/
├── __init__.py         # Flask app factory
├── models.py          # SQLAlchemy models
├── routes/            # API routes
├── run.py            # Application entry point
└── requirements.txt   # Python dependencies
```

## Usage

1. Start both frontend and backend servers
2. Visit the frontend URL
3. Sign up for a new account or log in
4. Access the protected dashboard
5. Ready to expand with budget tracking features!

## Security Notes

- Change secret keys in production
- Use environment variables for sensitive configuration
- Implement proper password requirements
- Add rate limiting for production use

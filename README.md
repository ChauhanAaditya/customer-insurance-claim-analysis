
# Car Insurance Claim Prediction – Full Stack App

## This project is a car insurance claim prediction system with:
```
   🧠 A trained Machine Learning model (.pkl file)
   🐍 A Flask backend API (app.py) that loads the model and serves predictions
   ⚛️ A React (Vite) frontend where users fill a form and see the prediction
```

### 1. Tech Stack
   
       Backend: Python, FastAPI
       ML: scikit-learn / any .pkl model
       Frontend: React + Vite

### 2. Project Structure:
```
   car-claim-project/
   ├─ backend/
   │  ├─ app.py
   │  ├─ claim_model.pkl
   │  ├─ requirements.txt
   ├─ frontend/
   │  ├─ index.html
   │  ├─ package.json
   │  ├─ vite.config.js
   │  └─ src/
   │     ├─ main.jsx
   │     └─ App.jsx
   └─ README.md
```


Make sure your .pkl model path in app.py matches where you actually placed the file.


### 3. Prerequisites
   
      Install these first:
   
         Python 3.9+
         Node.js + npm


### 4. Backend Setup (Flask + Model)
   
   i. Go to backend folder:
   
           cd backend
   
   ii. Create and activate virtual environment:


         Windows:
                   python -m venv venv
                   venv\Scripts\activate
   
         Linux/macOS:
                   python -m venv venv
                   source venv/bin/activate
   iii. Install dependencies:
   
           pip install -r requirements.txt
   
   iv. Run the backend:
   
         python app.py
   
         By default it typically runs at:
         http://127.0.0.1:5000 or http://localhost:5000

### 5. Frontend Setup (React + Vite)

   i. Open a new terminal and go to frontend folder:
   
        cd frontend
   
   ii. Install npm packages:
   
        npm install

   iii. Start the frontend dev server:
   
        npm run dev
   
        Vite will show something like:
           Local: http://localhost:5173

### 6. How to Run the Whole Project
   i. Start Backend
   
            cd backend #(Activate venv if you are using it)
            python app.py
   
   ii. Start Frontend (React) – in another terminal
   
            cd frontend
            npm run dev
   iii. Open your browser and go to:
   
            http://localhost:5173
   
   iv. Fill the form (policy details, car info, etc.) → click Submit → see prediction (e.g., "Claim Likely" / "No Claim").

### 7. Customization
    
        - Update form fields in App.jsx to match your model features.
        - Update feature extraction logic in app.py to match whatever the model was trained on.
        - Change UI text / labels to something like:
                “High Risk of Claim”
                “Low Risk of Claim”

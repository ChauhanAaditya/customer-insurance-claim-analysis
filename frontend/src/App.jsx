import { useState } from "react";
import "./App.css";
const API_URL = "https://customer-insurance-claim-analysis-backend.onrender.com";

function App() {
  const [form, setForm] = useState({
    credit_score: "",
    vehicle_ownership: "1",
    married: "0",
    children: "",
    postal_code: "",
    annual_mileage: "",
    speeding_violations: "",
    duis: "",
    past_accidents: "",
    age: "",
    driving_experience: "",
    gender: "male",
    race: "majority",
    education: "university",
    income: "middle class",
    vehicle_year: "after 2015",
    vehicle_type: "sedan",      // single dropdown
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const payload = {
        credit_score: Number(form.credit_score),
        vehicle_ownership: Number(form.vehicle_ownership),
        married: Number(form.married),
        children: Number(form.children),
        postal_code: Number(form.postal_code),
        annual_mileage: Number(form.annual_mileage),
        speeding_violations: Number(form.speeding_violations),
        duis: Number(form.duis),
        past_accidents: Number(form.past_accidents),
        age: Number(form.age),
        driving_experience: Number(form.driving_experience),
        gender: form.gender,
        race: form.race,
        education: form.education,
        income: form.income,
        vehicle_year: form.vehicle_year,
        vehicle_type: form.vehicle_type,
      };

      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });


      if (!res.ok) throw new Error("Backend error");

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to connect to backend. Is FastAPI running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 style={{ marginBottom: 16, textAlign: "center" }}>
          Car Claim Prediction
        </h1>

        <form onSubmit={handleSubmit} className="form" style={{ display: "grid", gap: 10 }}>
          {/* Numeric fields */}
          <div>
            <label>CREDIT SCORE</label>
            <input
              type="number"
              name="credit_score"
              value={form.credit_score}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Vehicle Ownership (0 = No, 1 = Yes)</label>
            <input
              type="number"
              name="vehicle_ownership"
              value={form.vehicle_ownership}
              onChange={handleChange}
              min="0"
              max="1"
              required
            />
          </div>

          <div>
            <label>Married (0 = No, 1 = Yes)</label>
            <input
              type="number"
              name="married"
              value={form.married}
              onChange={handleChange}
              min="0"
              max="1"
              required
            />
          </div>

          <div>
            <label>Children</label>
            <input
              type="number"
              name="children"
              value={form.children}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Postal Code</label>
            <input
              type="number"
              name="postal_code"
              value={form.postal_code}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Annual Mileage</label>
            <input
              type="number"
              name="annual_mileage"
              value={form.annual_mileage}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Speeding Violations</label>
            <input
              type="number"
              name="speeding_violations"
              value={form.speeding_violations}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>DUIs</label>
            <input
              type="number"
              name="duis"
              value={form.duis}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Past Accidents</label>
            <input
              type="number"
              name="past_accidents"
              value={form.past_accidents}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Driving Experience (years)</label>
            <input
              type="number"
              name="driving_experience"
              value={form.driving_experience}
              onChange={handleChange}
              required
            />
          </div>

          {/* Categorical dropdowns */}

          <div>
            <label>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label>Race</label>
            <select name="race" value={form.race} onChange={handleChange}>
              <option value="majority">Majority</option>
              <option value="minority">Minority</option>
            </select>
          </div>

          <div>
            <label>Education</label>
            <select
              name="education"
              value={form.education}
              onChange={handleChange}
            >
              <option value="none">None</option>
              <option value="high school">High School</option>
              <option value="university">University</option>
            </select>
          </div>

          <div>
            <label>Income</label>
            <select name="income" value={form.income} onChange={handleChange}>
              <option value="poverty">Poverty</option>
              <option value="working class">Working Class</option>
              <option value="middle class">Middle Class</option>
              <option value="upper class">Upper Class</option>
            </select>
          </div>

          <div>
            <label>Vehicle Year</label>
            <select
              name="vehicle_year"
              value={form.vehicle_year}
              onChange={handleChange}
            >
              <option value="before 2015">Before 2015</option>
              <option value="after 2015">After 2015</option>
            </select>
          </div>

          <div>
            <label>Vehicle Type</label>
            <select
              name="vehicle_type"
              value={form.vehicle_type}
              onChange={handleChange}
            >
              <option value="sedan">Sedan</option>
              <option value="sports car">Sports Car</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {result && (
  <div
    className="result-box"
    style={{
      border: "2px solid",
      borderColor: result.prediction === 1 ? "#22c55e" : "#ef4444",
      background:
        result.prediction === 1
          ? "rgba(239,68,68,0.15)"
          : "rgba(34,197,94,0.15)",
      padding: "15px",
      borderRadius: "12px",
      marginTop: "15px",
    }}
  >
    <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
      {result.prediction === 1 ? (
        <span style={{ color: "#22c55e" }}>✔️ CLAIM</span>
      ) : (
        <span style={{ color: "#ef4444" }}>❌NO CLAIM</span>
      )}
    </p>

    <p style={{ marginTop: "8px" }}>
      <strong>Probability:</strong>{" "}
      {(result.probability * 100).toFixed(2)}%
    </p>
  </div>
)}

      </div>
    </div>
  );
}

export default App;

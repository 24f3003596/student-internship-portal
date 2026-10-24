import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import InternshipList from "./pages/InternshipList";
import InternshipDetails from "./pages/InternshipDetails";
import ApplicationForm from "./pages/ApplicationForm";
import "./index.css";

export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export const internships = [
  {
    id: "1",
    title: "Full Stack Developer Intern",
    company: "TechNova Solutions",
    location: "Remote",
    duration: "3 Months",
    stipend: "₹10,000/month",
    description:
      "Develop modern web applications using React, Node.js, Express and MongoDB.",
    skills: ["React", "Node.js", "Express", "MongoDB"]
  },
  {
    id: "2",
    title: "Data Science Intern",
    company: "DataSphere Analytics",
    location: "Bangalore",
    duration: "4 Months",
    stipend: "₹12,000/month",
    description:
      "Work with datasets, build predictive models and create data visualizations.",
    skills: ["Python", "Pandas", "NumPy", "Machine Learning"]
  },
  {
    id: "3",
    title: "Machine Learning Intern",
    company: "AI Innovators",
    location: "Remote",
    duration: "3 Months",
    stipend: "₹15,000/month",
    description:
      "Build and evaluate machine learning models for real-world applications.",
    skills: ["Python", "Scikit-learn", "Statistics"]
  },
  {
    id: "4",
    title: "Backend Developer Intern",
    company: "CloudBridge Technologies",
    location: "Chennai",
    duration: "6 Months",
    stipend: "₹12,000/month",
    description:
      "Develop REST APIs and database-backed services using Node.js and MongoDB.",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs"]
  }
];

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        InternHub<span>.</span>
      </Link>
      <nav>
        <Link to="/">Internships</Link>
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="container">
        <Routes>
          <Route path="/" element={<InternshipList />} />
          <Route
            path="/internship/:id"
            element={<InternshipDetails />}
          />
          <Route path="/apply/:id" element={<ApplicationForm />} />
          <Route
            path="*"
            element={
              <section className="panel">
                <h1>Page not found</h1>
                <Link className="button" to="/">
                  Back to internships
                </Link>
              </section>
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        Student Internship Portal · 2026
      </footer>
    </BrowserRouter>
  );
}
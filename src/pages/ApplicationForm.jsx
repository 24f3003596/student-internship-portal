import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL, internships } from "../App";

export default function ApplicationForm() {
  const { id } = useParams();

  const internship = internships.find((item) => item.id === id);

  const [form, setForm] = useState({
    studentName: "",
    email: "",
    rollNumber: ""
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!internship) {
    return (
      <section className="panel">
        <h2>Internship not found</h2>
        <Link to="/" className="button">Back to internships</Link>
      </section>
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: ""
    }));

    setMessage("");
  }

  function validate() {
    const nextErrors = {};

    if (form.studentName.trim().length < 2) {
      nextErrors.studentName = "Enter your full name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.rollNumber.trim()) {
      nextErrors.rollNumber = "Enter your roll number.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setSuccess(false);

    if (!validate()) return;

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          studentName: form.studentName.trim(),
          email: form.email.trim(),
          rollNumber: form.rollNumber.trim(),
          internship: internship.title
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Application submission failed.");
      }

      setSuccess(true);
      setMessage("Application submitted successfully!");
      setForm({
        studentName: "",
        email: "",
        rollNumber: ""
      });
    } catch (error) {
      setSuccess(false);
      setMessage(
        error.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="form-wrapper">
      <Link to={`/internship/${id}`} className="back-link">
        ← Back to details
      </Link>

      <div className="panel">
        <span className="eyebrow">TAKE THE NEXT STEP</span>
        <h1>Apply for Internship</h1>
        <p className="description">
          Selected position: <strong>{internship.title}</strong>
        </p>

        {message && (
          <div className={`alert ${success ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="studentName">Student Name *</label>
            <input
              id="studentName"
              name="studentName"
              value={form.studentName}
              onChange={handleChange}
              placeholder="Enter your full name"
              maxLength={100}
            />
            {errors.studentName && (
              <small className="field-error">{errors.studentName}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email ID *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="student@example.com"
            />
            {errors.email && (
              <small className="field-error">{errors.email}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number *</label>
            <input
              id="rollNumber"
              name="rollNumber"
              value={form.rollNumber}
              onChange={handleChange}
              placeholder="Enter your roll number"
              maxLength={30}
            />
            {errors.rollNumber && (
              <small className="field-error">{errors.rollNumber}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="internship">Selected Internship</label>
            <input
              id="internship"
              value={internship.title}
              readOnly
            />
          </div>

          <button className="button full" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Application →"}
          </button>
        </form>
      </div>
    </section>
  );
}
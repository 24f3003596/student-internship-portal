import { Link, useParams } from "react-router-dom";
import { internships } from "../App";

export default function InternshipDetails() {
  const { id } = useParams();

  const internship = internships.find((item) => item.id === id);

  if (!internship) {
    return (
      <section className="panel">
        <h2>Internship not found</h2>
        <Link to="/" className="button">Back to internships</Link>
      </section>
    );
  }

  return (
    <section className="panel">
      <Link to="/" className="back-link">
        ← Back to internships
      </Link>

      <div className="details-header">
        <div className="company-icon large">
          {internship.company.charAt(0)}
        </div>
        <div>
          <p className="company">{internship.company}</p>
          <h1>{internship.title}</h1>
        </div>
      </div>

      <div className="details-meta">
        <div>
          <span>LOCATION</span>
          <strong>{internship.location}</strong>
        </div>
        <div>
          <span>DURATION</span>
          <strong>{internship.duration}</strong>
        </div>
        <div>
          <span>STIPEND</span>
          <strong>{internship.stipend}</strong>
        </div>
      </div>

      <h2>About this Internship</h2>
      <p className="description">{internship.description}</p>

      <h2>Required Skills</h2>
      <div className="skills">
        {internship.skills.map((skill) => (
          <span className="skill" key={skill}>{skill}</span>
        ))}
      </div>

      <Link to={`/apply/${internship.id}`} className="button">
        Apply Now →
      </Link>
    </section>
  );
}
import { Link } from "react-router-dom";
import { internships } from "../App";

export default function InternshipList() {
  return (
    <>
      <section className="hero">
        <span className="eyebrow">YOUR CAREER STARTS HERE</span>
        <h1>Discover Your Next Opportunity</h1>
        <p>
          Explore internships, develop practical skills and take
          the first step toward your dream career.
        </p>
        <span className="count">
          {internships.length} opportunities available
        </span>
      </section>

      <section>
        <div className="section-heading">
          <div>
            <h2>Available Internships</h2>
            <p>Find an opportunity that matches your interests.</p>
          </div>
        </div>

        <div className="grid">
          {internships.map((item) => (
            <article className="card" key={item.id}>
              <div className="card-top">
                <div className="company-icon">
                  {item.company.charAt(0)}
                </div>
                <span className="tag">{item.location}</span>
              </div>

              <h3>{item.title}</h3>
              <p className="company">{item.company}</p>
              <p className="description">{item.description}</p>

              <div className="meta">
                <span>{item.duration}</span>
                <strong>{item.stipend}</strong>
              </div>

              <Link
                to={`/internship/${item.id}`}
                className="button full"
              >
                View Details →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
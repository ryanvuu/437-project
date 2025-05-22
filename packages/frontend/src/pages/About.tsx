import Navbar from "../Navbar";
// import "../styles/about.css";

export function About() {
  return (
    <div>
      <h1 className="about-h">Music Recommender</h1>
      <div id="questions-container">
        <div className="question">
          <h2 className="about-h">What is Music Recommender?</h2>
          <p className="about-p">This is a paragraph to explain what music recommender is. What is its mission... to be completed when
            features get implemented.</p>
        </div>

        <div className="question">
          <h2 className="about-h">How do I get started?</h2>
          <p className="about-p">This is a paragraph to explain how to get started with using the music recommending application.
            When features get added, will mention how to filter, what it does, etc.</p>
        </div>
      </div>

      <Navbar />
    </div>
  )
}

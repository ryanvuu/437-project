import Navbar from "../Navbar";
import "../styles/about.css";

export function About() {
  return (
    <div>
      <h1 className="h1-about">Music Recommender</h1>
      <div id="questions-container">
        <div className="question">
          <h2 className="h2-about">What is Music Recommender?</h2>
          <p className="p-about">This is a paragraph to explain what music recommender is. What is its mission... to be completed when
            features get implemented.</p>
        </div>

        <div className="question">
          <h2 className="h2-about">How do I get started?</h2>
          <p className="p-about">This is a paragraph to explain how to get started with using the music recommending application.
            When features get added, will mention how to filter, what it does, etc.</p>
        </div>
      </div>

      <Navbar />
    </div>
  )
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import JobGrid from "./components/JobGrid/JobGrid";
import JobListing from "./components/JobListing/JobListing";
import JobListingT from "./types/JobListing";
import jobListings from "./utils/data.json";

function App() {
  function getJobListingById(id: number): JobListingT | null {
    return jobListings.find((job) => job.id === id) || null;
  }

  return (
    <>
      <Header />
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<JobGrid jobListings={jobListings.slice(0, 12)} />} />
            <Route path="/listing/:id" element={<JobListing getJobListingById={getJobListingById} />} />
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;

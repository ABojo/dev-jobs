import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import JobGrid from "./components/JobGrid/JobGrid";
import JobListing from "./components/JobListing/JobListing";
import JobListingT from "./types/JobListing";
import jobListings from "./utils/data.json";

const itemsPerPage = 12;

function App() {
  const [pagesVisible, setPagesVisible] = useState(1);
  const [visibleJobs, setVisibleJobs] = useState<JobListingT[]>([]);

  function getJobListingById(id: number): JobListingT | null {
    return jobListings.find((job) => job.id === id) || null;
  }

  function incrementPage() {
    setPagesVisible((prev) => prev + 1);
  }

  //adds another page of jobs to the grid
  useEffect(() => {
    setVisibleJobs(jobListings.slice(0, itemsPerPage * pagesVisible));
  }, [pagesVisible]);

  return (
    <>
      <Header />
      <main>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <JobGrid jobListings={visibleJobs} />
                  {visibleJobs.length >= itemsPerPage * pagesVisible && (
                    <button onClick={incrementPage} className="more">
                      Load More
                    </button>
                  )}
                </>
              }
            />
            <Route path="/listing/:id" element={<JobListing getJobListingById={getJobListingById} />} />
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;

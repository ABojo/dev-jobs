import { useState, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import JobGrid from "./components/JobGrid/JobGrid";
import JobListing from "./components/JobListing/JobListing";
import FilterForm from "./components/FilterForm/FilterForm";
import MobileFilterForm from "./components/MobileFilterForm/MobileFilterForm";

import JobListingT from "./types/JobListing";
import jobListings from "./utils/data.json";
import formReducer from "./reducer/formReducer";
import defaultState from "./utils/defaultFormState";

const itemsPerPage = 12;

function App() {
  const [formState, formDispatch] = useReducer(formReducer, defaultState);
  const [pagesVisible, setPagesVisible] = useState(1);
  const [filteredJobs, setFilteredJobs] = useState<JobListingT[]>([]);
  const [visibleJobs, setVisibleJobs] = useState<JobListingT[]>([]);

  function getJobListingById(id: number): JobListingT | null {
    return jobListings.find((job) => job.id === id) || null;
  }

  function incrementPage() {
    setPagesVisible((prev) => prev + 1);
  }

  function filterJob(job: JobListingT): boolean {
    const jobTitle = job.position.toLowerCase();
    const jobLocation = job.location.toLowerCase();
    const jobContract = job.contract.toLowerCase();
    const formTitle = formState.title.toLowerCase();
    const formLocation = formState.location.toLowerCase();

    if (!jobTitle.includes(formTitle)) return false;
    if (!jobLocation.includes(formLocation)) return false;
    if (formState.fullTime && jobContract !== "full time") return false;

    return true;
  }

  function runFilter() {
    const newFilteredJobs: JobListingT[] = jobListings.filter(filterJob);

    setFilteredJobs(newFilteredJobs);
    setPagesVisible(1);
  }

  //filter results on mount
  useEffect(runFilter, []);

  //adds another page of jobs to the grid
  useEffect(() => {
    setVisibleJobs(filteredJobs.slice(0, itemsPerPage * pagesVisible));
  }, [pagesVisible, filteredJobs]);

  return (
    <>
      <main>
        <Router>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FilterForm formState={formState} formDispatch={formDispatch} runFilter={runFilter} />
                  <MobileFilterForm formState={formState} formDispatch={formDispatch} runFilter={runFilter} />
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

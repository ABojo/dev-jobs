import styles from "./JobGrid.module.scss";
import JobListing from "../../types/JobListing";
import JobCard from "../JobCard/JobCard";

interface JobGridProps {
  jobListings: JobListing[];
}

function JobGrid({ jobListings }: JobGridProps) {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {jobListings.map((job) => {
          return <JobCard key={job.id} jobListing={job} />;
        })}
      </div>
      <button className={styles.more}>Load More</button>
    </div>
  );
}

export default JobGrid;

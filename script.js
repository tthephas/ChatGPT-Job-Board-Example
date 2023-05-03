// Get the job listings element
const jobListings = document.getElementById("job-listings");

// Get the keyword and location input fields
const keywordInput = document.getElementById("keywords");
const locationInput = document.getElementById("location");

// Fetch the JSON data
fetch("/jobs-data.json")
  .then(response => response.json())
  .then(data => {
    // Function to filter jobs by keyword and/or location
    const filterJobs = () => {
      // Get the input values
      const keyword = keywordInput.value.toLowerCase();
      const location = locationInput.value.toLowerCase();

      // Filter the jobs based on the input values
      const filteredJobs = data.jobs.filter(job => {
        const title = job.title.toLowerCase();
        const company = job.company.toLowerCase();
        const jobLocation = job.location.toLowerCase();

        return (
          (title.includes(keyword) || company.includes(keyword)) &&
          jobLocation.includes(location)
        );
      });

      // Remove existing job listings
      jobListings.innerHTML = "";

      // Loop through the filtered jobs and generate HTML for each one
      filteredJobs.forEach(job => {
        const li = document.createElement("li");
        li.innerHTML = `
          <h3>${job.title}</h3>
          <p><strong>${job.company}</strong> - ${job.location}</p>
          <p>${job.description}</p>
          <button class="apply-now">Apply Now</button>
        `;
        jobListings.appendChild(li);
      });
    };

    // Call the filterJobs function when the input fields are changed
    keywordInput.addEventListener("input", filterJobs);
    locationInput.addEventListener("input", filterJobs);

    // Call the filterJobs function initially to show all jobs
    filterJobs();
})
.catch(error => console.error(error));

const jobPostForm = document.getElementById("job-post-form");

jobPostForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const jobTitle = document.getElementById("job-title").value;
  const companyName = document.getElementById("company-name").value;
  const jobLocation = document.getElementById("job-location").value;
  const jobDescription = document.getElementById("job-description").value;

  const newJobListing = {
    title: jobTitle,
    company: companyName,
    location: jobLocation,
    description: jobDescription,
  };

  let jobListings = localStorage.getItem("jobListings");
  if (!jobListings) {
    jobListings = [];
  } else {
    jobListings = JSON.parse(jobListings);
  }

  jobListings.push(newJobListing);
  localStorage.setItem("jobListings", JSON.stringify(jobListings));
  alert("Job posted successfully!");
  window.location.href = "index.html"; // redirect to main job board page
});

  // Load job listings from local storage
function loadJobListings() {
    let jobListings = localStorage.getItem("jobListings");
    if (jobListings) {
      jobListings = JSON.parse(jobListings);
      const jobListingsContainer = document.getElementById("job-listings");
      jobListingsContainer.innerHTML = "";
  
      jobListings.forEach((jobListing) => {
        const jobListingHTML = `
          <div class="job-listing">
            <div class="job-title">${jobListing.title}</div>
            <div class="job-company">${jobListing.company}</div>
            <div class="job-location">${jobListing.location}</div>
            <div class="job-description">${jobListing.description}</div>
            <button class="apply-button">Apply Now</button>
          </div>
        `;
        jobListingsContainer.innerHTML += jobListingHTML;
      });
    }
  }
  
  // Load job listings on page load
  window.addEventListener("load", loadJobListings);
  
  
  

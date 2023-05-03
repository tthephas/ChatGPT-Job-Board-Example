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
          <button class="apply-now" data-job-id="1">
          <a href="applicationForm.html"></a>Apply Now
          </button>
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
  function renderJobs() {
    let jobs = getJobsFromStorage();
    let jobsContainer = document.getElementById("job-listings");
    jobsContainer.innerHTML = "";
    for (let i = 0; i < jobs.length; i++) {
      let job = jobs[i];
      let jobElement = `
        <div class="job-card">
          <div class="job-title">${job.title}</div>
          <div class="job-company">${job.company}</div>
          <div class="job-location">${job.location}</div>
          <div class="job-description">${job.description}</div>
          <button class="apply-now-btn">Apply Now</button>
        </div>
      `;
      jobsContainer.innerHTML += jobElement;
    }
  }

  function getJobsFromStorage() {
    let jobs = localStorage.getItem("jobs");
    if (jobs) {
      return JSON.parse(jobs);
    } else {
      return [];
    }
  }
  
  
  
  // Load job listings on page load
  window.addEventListener("load", loadJobListings);
  
  
  
  const applyButtons = document.querySelectorAll('.apply-now');

  applyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const jobId = e.target.dataset.jobId;
      const jobTitle = e.target.dataset.jobTitle;
      const applyFormUrl = `applicationForm.html?id=${jobId}&title=${encodeURIComponent(jobTitle)}`;
      window.location.href = applyFormUrl;
    });
  });
  
// Function to open the popup form
function openApplicationForm(jobId) {
  // Create a form element
  const form = document.createElement("form");
  
  // Add form fields (e.g. name, email, resume upload)
  // ...
  
  // Add a submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Submit";
  form.appendChild(submitButton);
  
  // Add an event listener to the form to handle submission
  form.addEventListener("submit", event => {
    event.preventDefault();
    
    // Send the form data to a server (e.g. using AJAX)
    // ...
    
    // Close the popup form and show a success message
    closeApplicationForm();
    showSuccessMessage();
  });
  
  // Add the form to the page (e.g. as a popup)
  // ...
}

// Function to close the popup form
function closeApplicationForm() {
  // Remove the form element from the page
  // ...
}

// Function to show a success message
function showSuccessMessage() {
  // Create a popup or alert to show the message
  // ...
}

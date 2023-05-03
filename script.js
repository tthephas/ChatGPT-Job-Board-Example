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

const jobPostForm = document.querySelector('#job-post-form');

jobPostForm.addEventListener('submit', function(event) {
event.preventDefault();

const jobTitle = document.querySelector('#job-title').value;
const companyName = document.querySelector('#company-name').value;
const jobLocation = document.querySelector('#job-location').value;
const jobDescription = document.querySelector('#job-description').value;

// You can use these values to send a POST request to your server and add the job posting to your database

// Reset the form
jobPostForm.reset();
});

document.getElementById("job-post-form").addEventListener("submit", addJobPosting);

function addJobPosting(event) {
    // Prevent the default form submit behavior
    event.preventDefault();
  
    // Get the form data
    const jobTitle = document.getElementById("job-title").value;
    const companyName = document.getElementById("company-name").value;
    const jobLocation = document.getElementById("job-location").value;
    const jobDescription = document.getElementById("job-description").value;
  
    // Create a new job posting object with the form data
    const newJobPosting = {
      title: jobTitle,
      company: companyName,
      location: jobLocation,
      description: jobDescription
    };
  
    // Add the new job posting to the recent job listings array
    recentJobListings.push(newJobPosting);
  
    // Update the HTML with the new job posting
    updateJobListings();
  
    // Clear the form inputs
    document.getElementById("job-title").value = "";
    document.getElementById("company-name").value = "";
    document.getElementById("job-location").value = "";
    document.getElementById("job-description").value = "";
  }

  function updateJobListings() {
    const recentJobListingsElement = document.getElementById("job-listings");
  
    // Clear the current job listings HTML
    recentJobListingsElement.innerHTML = "";
  
    // Loop through the recent job listings and create HTML for each job posting
    for (let i = 0; i < recentJobListings.length; i++) {
      const jobPosting = recentJobListings[i];
      const jobPostingHTML = `
        <div class="job-posting">
          <h3>${jobPosting.title}</h3>
          <p><strong>Company:</strong> ${jobPosting.company}</p>
          <p><strong>Location:</strong> ${jobPosting.location}</p>
          <p><strong>Description:</strong> ${jobPosting.description}</p>
          <button class="apply-now-button">Apply Now</button>
        </div>
      `;
      recentJobListingsElement.innerHTML += jobPostingHTML;
    }
  }
  
  
  

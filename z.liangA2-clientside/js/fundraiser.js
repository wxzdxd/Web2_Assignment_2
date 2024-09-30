// Get the fundraiser ID from the URL
function getFundraiserId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Load fundraiser details for ID
function loadFundraiserDetails() {
    const fundraiserId = getFundraiserId();

    if (!fundraiserId) {
        document.getElementById('fundraiser-details').innerHTML = 'No fundraiser selected.';
        return;
    }

    fetch(`http://localhost:3000/api/fundraiser/${fundraiserId}`)  // Api url
        .then(response => response.json())
        .then(data => {
            displayFundraiserDetails(data);
        })
        .catch(error => {
            console.error(error);
        });
}

// Init the fundraiser details on the html
function displayFundraiserDetails(fundraiser) {
    const detail = document.getElementById('fundraiser-details');
    
    // Random number between 1 and 3 for the image
    const number = Math.floor(Math.random() * 3) + 1;
    const randomUrl = `./img/home${number}.png`;

    const html = `
        <img src="${randomUrl}" alt="Fundraiser Image">
        <h2>${fundraiser.CAPTION}</h2>
        <p><strong>Organizer:</strong> ${fundraiser.ORGANIZER}</p>
        <p><strong>Target Funding:</strong> $${fundraiser.TARGET_FUNDING}</p>
        <p><strong>Current Funding:</strong> $${fundraiser.CURRENT_FUNDING}</p>
        <p><strong>City:</strong> ${fundraiser.CITY}</p>
        <p><strong>Category:</strong> ${fundraiser.CATEGORY_NAME}</p>
        <p><strong>Description:</strong> ${fundraiser.DESCRIPTION}</p>
    `;

    detail.innerHTML = html;
}

// Show modal
function showModal() {
    const modal = document.getElementById('donation-modal');
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('donation-modal');
    modal.style.display = 'none';
}

// Event listener for donate button
document.getElementById('donate-button').addEventListener('click', showModal);

// Event listener for close button
document.getElementById('close-button').addEventListener('click', closeModal);

// Call the function to load fundraiser details when the page loads
document.addEventListener('DOMContentLoaded', loadFundraiserDetails);

// Close modal when user clicks outside of it
window.onclick = function(event) {
    const modal = document.getElementById('donation-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

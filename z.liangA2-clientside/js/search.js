// Function to search fundraisers 
function search() {
    const organizer = document.getElementById('organizer').value;
    const city = document.getElementById('city').value;
    const category = document.getElementById('category').value;

    // Ensure at least one criterion is selected
    if (!organizer && !city && !category) {
        alert('Please select at least one search criterion');
        return;
    }

    // query string based on selected criteria
    let query = '?';
    if (organizer) query += `organizer=${organizer}&`;
    if (city) query += `city=${city}&`;
    if (category) query += `category=${category}`;

    // API to get fundraisers based on criteria
    fetch(`http://localhost:3000/api/search${query}`) // Url 
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                displayFundraisers(data);
            } else {
                showErrorMessage('No fundraisers found!');
                const fundraiserList = document.getElementById('fundraiser-list');
                // Clear any content
                fundraiserList.innerHTML = '';
            }
        })
        .catch(error => {
            console.error(error);
            showErrorMessage('No fundraisers found!');
        });
}

// Function to display fundraisers on the page
function displayFundraisers(fundraisers) {
    const fundraiserList = document.getElementById('fundraiser-list');

    // Clear any content
    fundraiserList.innerHTML = '';

    // foreach to create elements and assign values
    fundraisers.forEach((fundraiser, index) => {
        const card = document.createElement('div');
        card.classList.add('fundraiser-card');

        // Image element (use local image)
        const image = document.createElement('img');
        image.src = `./img/home${index % 3 + 1}.png`; // Local imag

        const title = document.createElement('h3');
        title.textContent = fundraiser.CAPTION;

        const organizer = document.createElement('p');
        organizer.innerHTML = `<strong>Organizer:</strong> ${fundraiser.ORGANIZER}`;

        const target = document.createElement('p');
        target.innerHTML = `<strong>Target Funding:</strong> $${fundraiser.TARGET_FUNDING}`;

        const current = document.createElement('p');
        current.innerHTML = `<strong>Current Funding:</strong> $${fundraiser.CURRENT_FUNDING}`;

        const city = document.createElement('p');
        city.innerHTML = `<strong>City:</strong> ${fundraiser.CITY}`;

        const category = document.createElement('p');
        category.innerHTML = `<strong>Category:</strong> ${fundraiser.NAME}`;

        const link = document.createElement('a');
        link.href = `fundraiser.html?id=${fundraiser.FUNDRAISER_ID}`;
        link.textContent = 'View Details';

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(organizer);
        card.appendChild(target);
        card.appendChild(current);
        card.appendChild(city);
        card.appendChild(category);
        card.appendChild(link);

        // Append the card to the list
        fundraiserList.appendChild(card);
    });
}

// Show error message
function showErrorMessage(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Clear the search form and hide error messages
function clearChechboxes() {
    document.getElementById('search-form').reset();
    document.getElementById('error-message').style.display = 'none'; // Hide error message
    document.getElementById('results-container').innerHTML = ''; // Clear results
}

// Fetch categories from the API 
function loadCategories() {
    fetch('http://localhost:3000/api/categories') // Url
        .then(response => response.json())
        .then(categories => {
            const categorySelect = document.getElementById('category');

            // Clear any existing options
            categorySelect.innerHTML = '<option value="">Select category</option>';

            // Add new options 
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.CATEGORY_ID;
                option.textContent = category.NAME;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

// Dunction to load categories when the page loads
document.addEventListener('DOMContentLoaded', loadCategories);
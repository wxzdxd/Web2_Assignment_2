// Function fetch to load Data
function loadData() {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:3000/api/fundraisers')  // Node serve api url
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    throw new Error('server error');
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

// Function to display fundraisers on the page
function initFundraisersData(fundraisers) {
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

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(organizer);
        card.appendChild(target);
        card.appendChild(current);
        card.appendChild(city);
        card.appendChild(category);

        // Append the card to the list
        fundraiserList.appendChild(card);
    });
}

// Listener DOMContentLoaded 
document.addEventListener('DOMContentLoaded', () => {
    loadData()
        .then(fundraisers => initFundraisersData(fundraisers))
        .catch(error => console.error(error));
});
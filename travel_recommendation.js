document.getElementById("btnSearch").addEventListener("click", function() {
    const input = document.getElementById("conditionInput").value.trim().toLowerCase();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; // Clear previous results

    // Fetch the data from the JSON file
    fetch("./travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            let results = [];

            // Match for 'beach' or 'beaches'
            if (input.includes("beach")) {
                results = data.beaches;
            }
            // Match for 'temple' or 'temples'
            else if (input.includes("temple")) {
                results = data.temples;
            }
            // Match for 'country' or search by specific country names
            else if (input.includes("country") || input.includes("australia") || input.includes("japan") || input.includes("brazil")) {
                results = data.countries.map(country => country.cities).flat();
            }

            // If results are found, display them
            if (results.length > 0) {
                results.forEach(item => {
                    resultDiv.innerHTML += `
                        <div class="result-item">
                            <h3>${item.name}</h3>
                            <img src="${item.imageUrl}" alt="${item.name}" width="200">
                            <p>${item.description}</p>
                            <button class="visit-btn">Visit</button>
                        </div>
                    `;
                });
            } else {
                // If no results found
                resultDiv.innerHTML = "<p>No matching results found. Try another keyword.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            resultDiv.innerHTML = "<p>Unable to fetch travel recommendations. Please try again later.</p>";
        });
});

document.getElementById('btnClear').addEventListener('click', () => {
    document.getElementById('conditionInput').value = "";
    document.getElementById('result').innerHTML = "";
})
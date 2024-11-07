function searchData() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const savedData = localStorage.getItem('excelData');

    if (!savedData) {
        document.getElementById('searchResults').innerHTML = '<p>No data available. Please upload some data first.</p>';
        return;
    }

    const excelData = JSON.parse(savedData);
    const filteredData = excelData.filter(row => row.some(cell => cell && cell.toString().toLowerCase().includes(query)));

    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';  // Clear previous results

    if (filteredData.length === 0) {
        resultsDiv.innerHTML = '<p>No matching data found.</p>';
        return;
    }

    // Create the table for displaying results
    const table = document.createElement('table');
    table.classList.add('styled-table');

    // Create the table headers for better readability
    const headers = ['Sl. No.' , 'REGD. NO.' ,	'NAME OF THE STUDENT' ,	'NAME OF THE MENTOR' ,	'MENTOR PHONE NO'];  // Adjust these labels as per your data
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create the table body with the search results
    const tbody = document.createElement('tbody');
    filteredData.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    resultsDiv.appendChild(table);
}

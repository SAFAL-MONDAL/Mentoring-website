document.addEventListener('DOMContentLoaded', function() {
    const savedData = localStorage.getItem('excelData');
    
    // If there is saved data, display it
    if (savedData) {
        const excelData = JSON.parse(savedData);
        displayExcelData(excelData);
    }
});

// Handle the form submission for file upload
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting traditionally

    const fileInput = document.getElementById('excelFile');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Save the data to localStorage
            localStorage.setItem('excelData', JSON.stringify(excelData));

            // Display the data in the table
            displayExcelData(excelData);
        };

        reader.readAsArrayBuffer(file);  // Read the file as an ArrayBuffer
    } else {
        alert("Please select a file.");
    }
});

// Handle the clear data button
document.getElementById('clearDataButton').addEventListener('click', function() {
    // Clear data from localStorage
    localStorage.removeItem('excelData');
    
    // Clear the displayed table
    document.getElementById('tableContainer').innerHTML = '<p>Data has been cleared.</p>';
});

// Function to display the Excel data in a table
function displayExcelData(data) {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';  // Clear any previous data

    if (data.length === 0) {
        tableContainer.innerHTML = '<p>No data available.</p>';
        return;
    }

    const table = document.createElement('table');
    table.border = '1';

    data.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell || '';  // Fill empty cells with an empty string
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    tableContainer.appendChild(table);
}

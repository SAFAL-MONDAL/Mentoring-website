document.addEventListener("DOMContentLoaded", function() {
  const queriesTbody = document.getElementById("queries-tbody");
  const clearButton = document.getElementById("clear-button");

  // Function to load queries from localStorage and populate the table
  function loadQueries() {
    const queries = JSON.parse(localStorage.getItem("queries")) || [];

    queries.forEach(query => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = query.name;
      row.appendChild(nameCell);

      const userTypeCell = document.createElement("td");
      userTypeCell.textContent = query.userType;
      row.appendChild(userTypeCell);

      const registrationCell = document.createElement("td");
      if (query.userType === 'Parent') {
        registrationCell.textContent = query.parentRegistration || '';
      } else {
        registrationCell.textContent = query.registration || '';
      }
      row.appendChild(registrationCell);

      const queryCell = document.createElement("td");
      queryCell.textContent = query.query;
      row.appendChild(queryCell);

      const parentTypeCell = document.createElement("td");
      parentTypeCell.textContent = query.parentType || '';
      row.appendChild(parentTypeCell);

      const parentStudentNameCell = document.createElement("td");
      parentStudentNameCell.textContent = query.parentStudentName || '';
      row.appendChild(parentStudentNameCell);

      const parentRegistrationCell = document.createElement("td");
      parentRegistrationCell.textContent = query.parentRegistration || '';
      row.appendChild(parentRegistrationCell);

      const statusCell = document.createElement("td");
      statusCell.className = "query-status";
      statusCell.textContent = query.status || 'Open';
      row.appendChild(statusCell);

      const doneButtonCell = document.createElement("td");
      const doneButton = document.createElement("button");
      doneButton.className = "done-button";
      doneButton.textContent = "Done";
      doneButtonCell.appendChild(doneButton);
      row.appendChild(doneButtonCell);

      queriesTbody.appendChild(row);

      // Add event listener to the "Done" button
      doneButton.addEventListener("click", () => {
        query.status = "Solved";
        statusCell.textContent = "Solved";
        queryCell.className = "query-solved";
        localStorage.setItem("queries", JSON.stringify(queries));
      });
    });
  }

  // Function to clear all data
  function clearAllData() {
    localStorage.removeItem("queries");
    while (queriesTbody.firstChild) {
      queriesTbody.removeChild(queriesTbody.firstChild);
    }
  }

  // Load queries when the page is loaded
  loadQueries();

  // Add event listener to the clear button
  clearButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all data?")) {
      clearAllData();
    }
  });
});
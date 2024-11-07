document.addEventListener("DOMContentLoaded", function() {
    const reportList = document.getElementById('report-list');
    const semesterFilter = document.getElementById('semester-filter');
    const searchBtn = document.getElementById('search-btn');
    const noReportMsg = document.getElementById('no-report-msg');

    // Function to render report cards
    function renderReportCards(reports) {
        reportList.innerHTML = '';
        noReportMsg.style.display = 'none'; // Hide "Report card not found" message
        if (reports.length === 0) {
            noReportMsg.style.display = 'block'; // Show "Report card not found" message
            return;
        }
        reports.forEach((report, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${report.reg_no}</td>
                <td>${report.name}</td>
                <td>${getSemesterName(report.semester)}</td>
                <td><a href="${report.report_card}" target="_blank">View Report Card</a></td>
                <td><button class="remove-btn" data-index="${index}">🗑</button></td>
            `;
            reportList.appendChild(row);
        });
    }

    // Function to get semester name from semester number
    function getSemesterName(semester) {
        const semesterNames = {
            '1': '1st Semester',
            '2': '2nd Semester',
            '3': '3rd Semester',
            '4': '4th Semester',
            '5': '5th Semester',
            '6': '6th Semester',
            '7': '7th Semester',
            '8': '8th Semester'
        };
        return semesterNames[semester] || 'Unknown Semester';
    }

    // Function to filter and search report cards
    function filterAndSearchReports() {
        const searchRegNo = document.getElementById('search-reg-no').value.trim();
        const selectedSemester = semesterFilter.value;
        const reports = JSON.parse(localStorage.getItem('reports')) || [];
        
        const filteredReports = reports.filter((report) => {
            const matchesRegNo = searchRegNo === '' || report.reg_no.includes(searchRegNo);
            const matchesSemester = selectedSemester === '' || report.semester === selectedSemester;
            return matchesRegNo && matchesSemester;
        });

        renderReportCards(filteredReports);
    }

    // Function to remove report
    function removeReport(index) {
        if (confirm('Are you sure you want to remove this student\'s report?')) {
            const reports = JSON.parse(localStorage.getItem('reports')) || [];
            reports.splice(index, 1);
            localStorage.setItem('reports', JSON.stringify(reports));
            filterAndSearchReports(); // Update the list after removal
            alert('Student report removed!');
        }
    }

    // Initial render of report cards
    filterAndSearchReports();

    // Add event listener to search button
    searchBtn.addEventListener('click', function() {
        filterAndSearchReports();
    });

    // Add event listener to remove buttons
    reportList.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-btn')) {
            const index = event.target.dataset.index;
            removeReport(index);
        }
    });

    // Add event listener to semester filter
    semesterFilter.addEventListener('change', function() {
        filterAndSearchReports();
    });
});

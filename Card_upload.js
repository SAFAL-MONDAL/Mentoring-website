document.addEventListener("DOMContentLoaded", function() {
    const semesterDropdown = document.createElement('select');
    semesterDropdown.id = 'semester';
    semesterDropdown.name = 'semester';
    semesterDropdown.required = true;

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = 'Select Semester';
    semesterDropdown.appendChild(defaultOption);

    const semesters = [
        '1st Semester', '2nd Semester', '3rd Semester', '4th Semester',
        '5th Semester', '6th Semester', '7th Semester', '8th Semester'
    ];

    semesters.forEach((semester, index) => {
        const option = document.createElement('option');
        option.value = (index + 1).toString() + (index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th');
        option.textContent = semester;
        semesterDropdown.appendChild(option);
    });

    const nameField = document.getElementById('name'); // Insert after the name field
    nameField.parentNode.insertBefore(semesterDropdown, nameField.nextSibling);
});

document.getElementById('report-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const regNo = document.getElementById('reg_no').value;
    const name = document.getElementById('name').value;
    const semester = document.getElementById('semester').value;
    const fileInput = document.getElementById('report_card');
    const reportCard = fileInput.files[0];

    if (!reportCard || reportCard.type !== 'application/pdf') {
        alert("Please upload a valid PDF file.");
        return;
    }

    if (!semester) {
        alert("Please select a semester.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const reportData = {
            reg_no: regNo,
            name: name,
            semester: semester.replace(/\D/g, ''), // Store semester as a number
            report_card: reader.result
        };

        const reports = JSON.parse(localStorage.getItem('reports')) || [];
        reports.push(reportData);
        localStorage.setItem('reports', JSON.stringify(reports));

        alert("Report card uploaded successfully!");
        document.getElementById('report-form').reset();
    };
    reader.readAsDataURL(reportCard);
});
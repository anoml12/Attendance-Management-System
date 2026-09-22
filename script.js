let students = [];

function addStudent() {
    const nameInput = document.getElementById("studentName");
    const rollInput = document.getElementById("rollNumber");

    const name = nameInput.value.trim();
    const roll = rollInput.value.trim();

    if (name === "" || roll === "") {
        alert("Please enter student name and roll number.");
        return;
    }

    students.push({
        name: name,
        roll: roll,
        present: 0,
        absent: 0
    });

    nameInput.value = "";
    rollInput.value = "";

    displayStudents();
}

function markAttendance(index, status) {
    if (status === "present") {
        students[index].present++;
    } else {
        students[index].absent++;
    }

    displayStudents();
}

function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}

function displayStudents() {
    const tableBody = document.getElementById("studentTableBody");

    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        const total = student.present + student.absent;

        let percentage = 0;

        if (total > 0) {
            percentage = ((student.present / total) * 100).toFixed(1);
        }

        const row = `
            <tr>
                <td>${student.roll}</td>
                <td>${student.name}</td>
                <td>${student.present}</td>
                <td>${student.absent}</td>
                <td>${percentage}%</td>
                <td>
                    <button class="present"
                        onclick="markAttendance(${index}, 'present')">
                        Present
                    </button>

                    <button class="absent"
                        onclick="markAttendance(${index}, 'absent')">
                        Absent
                    </button>

                    <button class="delete"
                        onclick="deleteStudent(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });

    updateSummary();
}

function updateSummary() {
    let totalStudents = students.length;
    let totalPresent = 0;
    let totalAbsent = 0;

    students.forEach(student => {
        totalPresent += student.present;
        totalAbsent += student.absent;
    });

    document.getElementById("totalStudents").textContent = totalStudents;
    document.getElementById("totalPresent").textContent = totalPresent;
    document.getElementById("totalAbsent").textContent = totalAbsent;
}
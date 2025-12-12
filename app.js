let currentUser = null;

// sign up
function signup() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    if (!email || !pass) {
        alert("Enter email and password");
        return;
    }

    localStorage.setItem("user_" + email, pass);
    alert("Account created! You can login now.");
}

// login
function login() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    let savedPass = localStorage.getItem("user_" + email);

    if (savedPass === pass) {
        currentUser = email;
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("appBox").style.display = "block";
        document.getElementById("welcome").innerText = "Welcome, " + email;

        loadNotes();
    } else {
        document.getElementById("loginMsg").innerText = "Invalid email or password.";
    }
}

// add note
function addNote() {
    let text = document.getElementById("noteInput").value;

    if (!text) return;

    let notes = JSON.parse(localStorage.getItem("notes_" + currentUser)) || [];
    notes.push(text);
    localStorage.setItem("notes_" + currentUser, JSON.stringify(notes));

    document.getElementById("noteInput").value = "";
    loadNotes();
}

// show notes
function loadNotes() {
    let notes = JSON.parse(localStorage.getItem("notes_" + currentUser)) || [];
    let listDiv = document.getElementById("notesList");

    listDiv.innerHTML = "";

    notes.forEach((n, index) => {
        listDiv.innerHTML += `
            <div class="noteBox">
                ${n} <br><br>
                <button onclick="deleteNote(${index})">Delete</button>
            </div>
        `;
    });
}

// delete note
function deleteNote(i) {
    let notes = JSON.parse(localStorage.getItem("notes_" + currentUser)) || [];
    notes.splice(i, 1);
    localStorage.setItem("notes_" + currentUser, JSON.stringify(notes));
    loadNotes();
}

// logout
function logout() {
    currentUser = null;
    document.getElementById("appBox").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
}

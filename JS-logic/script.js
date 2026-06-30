// ── CHARITY MINDS ADMIN DASHBOARD ──
// We build this together. Each TODO is your next task.

/* When getting info from an api we need to fetch() it which is like 
ordering a type of food by teling a water in a restaurant which the food you require takes time to be prepared by the chef..


=== So like the waiter goes to the kitchen to give the chef your order...


-- What the .fetch() gives out back to us is a PROMISE= which in plain english is like
I don't have your meal rady but i promise to have it ready and give it to you later


==> Now when once we've given out our order we need to wait for the waiter to come back with our food...
   So you wait for him to get it for you... => await fetch('url')
   const order= await fetch('url') -- this is what the waiter brings back...


!! What the waiter brought back is a sealed food item and in order to see it's contents we need to open it..
const food= await order.json()
console.log(food) --- we have our food..

IN JAVASCRIPT:
      --A Server sends data in JSON because every programming language can understand it and the only way to get what was gotten
      from it we need to open it up and convert the JSON to a JS object
*/

const API_URL = "https://charity-minds-backend.onrender.com/api/v1/users";

async function fetchUsers() {
  const response = await fetch(API_URL);
  const data = await response.json();
  const users = data.data;
  users.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
  const localUsers = JSON.parse(localStorage.getItem("localUsers")) || [];
  const allUsers = [...users, ...localUsers];

  console.log(users);

  renderStats(allUsers); //Pass the users to this function
  renderTable(allUsers);
  setupSearch(allUsers);
}

fetchUsers();

// ── STEP 2: RENDER STATS ──
function renderStats(allUsers) {
  // TODO: Count total, male, female, other users
  // Then update the innerHTML of these 4 elements:
  // document.getElementById("stat-total")
  // document.getElementById("stat-male")
  // document.getElementById("stat-female")
  const total = allUsers.length;
  const males = allUsers.filter((user) => user.gender.toLowerCase() === "male");
  const totalMales = males.length;
  const females = allUsers.filter(
    (user) => user.gender.toLowerCase() === "female",
  );
  const totalFemales = females.length;
  const other = allUsers.filter(
    (user) => user.gender.toLowerCase() === "other",
  );
  const otherTotal = other.length;

  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-male").textContent = totalMales;
  document.getElementById("stat-female").textContent = totalFemales;
  document.getElementById("stat-other").textContent = otherTotal;
}

// ── STEP 3: MASK THE ID ──
function maskId(id) {
  // TODO: Return first 4 chars + "****" + last 4 chars
  const maskedId = id.slice(0, 4) + "****" + id.slice(id.length - 4);
  return maskedId;
}

// ── STEP 4: FORMAT THE DATE ──
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ── STEP 5: RENDER THE TABLE ──
function renderTable(allUsers) {
  const tbody = document.getElementById("users-tbody");
  tbody.innerHTML = "";

  // TODO: Loop through users with .forEach()
  // For each user, create a <tr> with <td> cells for:
  // index (#), masked id, full name, username, email, phone, gender, dob, joined date

  allUsers.forEach((user, index) => {
    tbody.innerHTML += `<tr>
    <td>${index + 1}</td>
    <td>${user._id ? maskId(user._id) : "loca****user"}</td>
    <td>${user.firstName}   ${user.lastName} </td>
    <td>${user.username}</td>
    <td>${user.email}</td>
    <td>${user.phone}</td>
    <td>${user.gender}</td>
    <td>${formatDate(user.dob)}</td>
    <td>${formatDate(user.createdAt)}</td>
    </tr>`;
  });
}

// ── STEP 6: SEARCH ──
function setupSearch(allUsers) {
  const input = document.getElementById("search-input");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // A single helper function that checks BOTH search and gender filter states together
  const filterAndRender = () => {
    const searchTerm = input.value.toLowerCase();
    const activeBtn = document.querySelector(".filter-btn.active");
    const activeGenderFilter = activeBtn
      ? activeBtn.getAttribute("data-filter")
      : "all";

    const filteredUsers = allUsers.filter((user) => {
      // 1. Check against the active placeholder/filter button selection
      const matchesGender =
        activeGenderFilter === "all" ||
        user.gender.toLowerCase() === activeGenderFilter;

      // 2. Check against the search input text (including your email TODO!)
      const matchesSearch =
        (user.firstName || "").toLowerCase().includes(searchTerm) ||
        (user.lastName || "").toLowerCase().includes(searchTerm) ||
        (user.username || "").toLowerCase().includes(searchTerm) ||
        (user.email || "").toLowerCase().includes(searchTerm);

      return matchesGender && matchesSearch;
    });

    renderTable(filteredUsers);
  };

  // Listen to keyboard typing inside your search box
  input.addEventListener("input", filterAndRender);

  // Listen to clicks on your placeholders / filter pills
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Visual switch: clear 'active' from all pills, then apply to the clicked one
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Re-run the table renderer dynamically
      filterAndRender();
    });
  });
}

// TODO: Call fetchUsers() at the bottom here

// TODO: Handle the error handling for UX when the API
// fails to bring back the data

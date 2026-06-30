const localUsers = JSON.parse(localStorage.getItem("localUsers")); //to get all the items stored in the DB
const lastUser = localUsers[localUsers.length - 1];

document.getElementById("userGreeting").textContent = lastUser.firstName;
// when a user has filled in the form his info will be the last item in the array

const API_URL = "https://charity-minds-backend.onrender.com/api/v1/users";

const form = document.getElementById("registrationForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault(); //to avoid the page reload when submitting

  const id = 728729767969;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const username = document.getElementById("username").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const dob = document.getElementById("dob").value;
  const gender = document.getElementById("gender").value;
  const password = document.getElementById("password").value;

  // confirmation--to check whether info is collected
  console.log("--- Form Submission Info ---");
  console.log("id:", id);
  console.log("First Name:", firstName);
  console.log("Last Name:", lastName);
  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Phone:", phone);
  console.log("Date of Birth:", dob);
  console.log("Gender:", gender);
  console.log("Password:", password);

  const newUser = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    username: username,
    phone: phone,
    email: email,
    dob: dob,
    gender: gender,
    password: password,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      alert(
        errorData.message || "Registration failed. Please check your data.",
      );
      return;
    }

    const data = await response.json();
    console.log("User registered successfully:", data);
  } catch (error) {
    console.error("Network error connecting to Render:", error);
    alert("Server is sleeping or unreachable. Please try again in a moment.");
    return;
  }
  //-----  Condition to check who is Admin--(REDIRECT)-----------

  if (username === "admin" && password === "rowland@gomycode") {
    window.location.href = "./src/dashboard.html";
  } else {
    window.location.href = "./src/welcome.html"; //users who are not admin
  }
});

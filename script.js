import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const btn = document.getElementById("submitBtn");

btn.addEventListener("click", async () => {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const rating = document.getElementById("rating").value;
  const msg = document.getElementById("msg");

  // ✅ Validation
  if (!name || !email || !message || !rating) {
    alert("Fill all fields!");
    return;
  }

  if (!email.includes("@")) {
    alert("Enter valid email!");
    return;
  }

  btn.innerText = "Submitting...";
  btn.disabled = true;

  try {
    await addDoc(collection(db, "feedbacks"), {
      name,
      email,
      message,
      rating,
      createdAt: new Date().toLocaleString()
    });

    // ✅ Updated message
    msg.innerText = "🎉 Thank you for your feedback!";
    msg.style.animation = "fade 1s";

    // Clear form
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
    document.getElementById("rating").value = "";

  } catch (error) {
    alert("Error ❌");
  }

  btn.innerText = "Submit";
  btn.disabled = false;
});
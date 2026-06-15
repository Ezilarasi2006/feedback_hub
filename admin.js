import { db } from "./firebase-config.js";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const list = document.getElementById("list");
const totalEl = document.getElementById("total");
const avgEl = document.getElementById("avg");
const searchInput = document.getElementById("search");

let allData = []; // ✅ store all data

// 🔽 Query
const q = query(collection(db, "feedbacks"), orderBy("createdAt", "desc"));

// 🔄 REAL-TIME FETCH
onSnapshot(q, (snapshot) => {
  allData = []; // reset

  snapshot.forEach((docSnap) => {
    allData.push({
      id: docSnap.id,
      ...docSnap.data()
    });
  });

  renderData(); // show data
});

// 🎯 RENDER FUNCTION
function renderData() {
  list.innerHTML = "";

  let total = 0;
  let sumRating = 0;

  const searchValue = searchInput.value.toLowerCase();

  allData.forEach((data) => {
    total++;
    sumRating += Number(data.rating || 0);

    // 🔍 SEARCH FILTER
    if (!data.name.toLowerCase().includes(searchValue)) return;

    let stars = "⭐".repeat(data.rating || 0);

    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <p><b>Name:</b> ${data.name}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Message:</b> ${data.message}</p>
      <p><b>Rating:</b> ${stars}</p>
      <p><b>Date:</b> ${data.createdAt || ""}</p>
      <button>Delete</button>
    `;

    // ❌ DELETE
    div.querySelector("button").onclick = async () => {
      if (confirm("Delete this feedback?")) {
        await deleteDoc(doc(db, "feedbacks", data.id));
      }
    };

    list.appendChild(div);
  });

  // 📊 Stats
  totalEl.innerText = total;
  avgEl.innerText = total ? (sumRating / total).toFixed(1) : 0;
}

// 🔍 LIVE SEARCH
searchInput.addEventListener("input", renderData);

window.login = function () {
  const pass = document.getElementById("adminPass").value;

  if (pass === "admin123") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("mainPanel").style.display = "block";
  } else {
    alert("Wrong password ❌");
  }
}
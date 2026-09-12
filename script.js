// ==========================================
// NEW ISRAEL HIGHSCHOOL - STUDENT SAFEREPORT
// ==========================================

const reportSection = document.getElementById("reportSection");
const trackSection = document.getElementById("trackSection");
const helpSection = document.getElementById("helpSection");
const privacySection = document.getElementById("privacySection");
const successSection = document.getElementById("successSection");

const sections = [
  reportSection,
  trackSection,
  helpSection,
  privacySection,
  successSection
];

function hideSections() {
  sections.forEach(section => {
    if (section) {
      section.classList.add("hidden");
    }
  });
}

function goHome() {
  hideSections();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ==========================================
// REPORT
// ==========================================

function showReport() {
  hideSections();

  if (reportSection) {
    reportSection.classList.remove("hidden");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ==========================================
// TRACK REPORT
// ==========================================

function showTrack() {
  hideSections();

  if (trackSection) {
    trackSection.classList.remove("hidden");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ==========================================
// IMMEDIATE HELP
// ==========================================

function showHelp() {
  hideSections();

  if (helpSection) {
    helpSection.classList.remove("hidden");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ==========================================
// PRIVACY
// ==========================================

function showPrivacy() {
  hideSections();

  if (privacySection) {
    privacySection.classList.remove("hidden");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ==========================================
// CATEGORY SELECTION
// ==========================================

let selectedCategory = "";

function selectCategory(category) {

  selectedCategory = category;

  const categoryText =
    document.getElementById("selectedCategory");

  const form =
    document.getElementById("reportForm");

  if (categoryText) {
    categoryText.textContent = category;
  }

  if (form) {
    form.classList.remove("hidden");

    form.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


// ==========================================
// ANONYMOUS / NAME
// ==========================================

const anonymousSelect =
  document.getElementById("anonymous");

if (anonymousSelect) {

  anonymousSelect.addEventListener("change", function () {

    const nameBox =
      document.getElementById("nameBox");

    if (!nameBox) return;

    if (this.value.includes("No")) {
      nameBox.classList.remove("hidden");
    } else {
      nameBox.classList.add("hidden");
    }

  });

}


// ==========================================
// SUBMIT REPORT
// ==========================================

function submitReport() {

  const description =
    document.getElementById("description").value.trim();

  const location =
    document.getElementById("location").value;

  const incidentDate =
    document.getElementById("incidentDate").value;

  const repeated =
    document.getElementById("repeated").value;

  const urgency =
    document.getElementById("urgency").value;

  if (!selectedCategory) {
    alert("Please select a concern category.");
    return;
  }

  if (!description) {
    alert("Please describe what happened.");
    return;
  }

  if (!location) {
    alert("Please select where it happened.");
    return;
  }

  if (!incidentDate) {
    alert("Please select the date.");
    return;
  }

  if (!repeated) {
    alert("Please answer if this is happening repeatedly.");
    return;
  }

  if (!urgency) {
    alert("Please select the urgency.");
    return;
  }


  // Generate demo Report ID

  const randomNumber =
    Math.floor(1000 + Math.random() * 9000);

  const reportID =
    "SR-2026-" + randomNumber;


  const generatedID =
    document.getElementById("generatedID");

  if (generatedID) {
    generatedID.textContent = reportID;
  }


  hideSections();

  if (successSection) {
    successSection.classList.remove("hidden");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


// ==========================================
// TRACK REPORT
// ==========================================

function trackReport() {

  const input =
    document.getElementById("reportID");

  const result =
    document.getElementById("trackingResult");

  if (!input || !result) return;

  const id =
    input.value.trim();

  if (!id) {

    result.innerHTML = `
      <div class="privacy-warning">
        ⚠️ Please enter your Report ID.
      </div>
    `;

    return;
  }


  // Demo status

  result.innerHTML = `
    <div class="info-box">

      <h3>📄 Report Found</h3>

      <p>
        <strong>Report ID:</strong>
        ${id}
      </p>

      <p>
        <strong>Status:</strong>
        🟡 Under Review
      </p>

      <p>
        Your concern has been received
        and is awaiting review by authorized
        school personnel.
      </p>

    </div>
  `;

}


// ==========================================
// PAGE START
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

  hideSections();

});

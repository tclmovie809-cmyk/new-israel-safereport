// ==========================================
// NEW ISRAEL HIGHSCHOOL - STUDENT SAFEREPORT
// ==========================================

// Sections
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


// ==========================================
// NAVIGATION
// ==========================================

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
// CATEGORY
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
// ANONYMOUS OPTION
// ==========================================

const anonymousSelect =
  document.getElementById("anonymous");


if (anonymousSelect) {

  anonymousSelect.addEventListener(
    "change",
    function () {

      const nameBox =
        document.getElementById("nameBox");

      if (!nameBox) return;

      if (this.value.includes("No")) {

        nameBox.classList.remove("hidden");

      } else {

        nameBox.classList.add("hidden");

        document.getElementById("studentName").value = "";
        document.getElementById("gradeSection").value = "";

      }

    }
  );

}


// ==========================================
// GENERATE REPORT ID
// ==========================================

function generateReportID() {

  const year = new Date().getFullYear();

  const randomNumber =
    Math.floor(100000 + Math.random() * 900000);

  return `SR-${year}-${randomNumber}`;

}


// ==========================================
// SUBMIT REPORT
// ==========================================

async function submitReport() {

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

  const anonymous =
    document.getElementById("anonymous").value;

  const studentName =
    document.getElementById("studentName")
      ? document.getElementById("studentName").value.trim()
      : "";

  const gradeSection =
    document.getElementById("gradeSection")
      ? document.getElementById("gradeSection").value.trim()
      : "";


  // ========================================
  // VALIDATION
  // ========================================

  if (!selectedCategory) {

    alert("Please select a concern category.");

    return;
  }


  if (!description) {

    alert("Please describe what happened.");

    return;
  }


  if (description.length < 10) {

    alert("Please provide a little more detail about what happened.");

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

    alert(
      "Please answer if this is happening repeatedly."
    );

    return;
  }


  if (!urgency) {

    alert("Please select the urgency.");

    return;
  }


  // ========================================
  // ANONYMOUS DATA
  // ========================================

  const isAnonymous =
    anonymous === "Yes - Anonymous";


  const finalStudentName =
    isAnonymous ? null : studentName;


  const finalGradeSection =
    isAnonymous ? null : gradeSection;


  // ========================================
  // REPORT ID
  // ========================================

  const reportID =
    generateReportID();


  // ========================================
  // BUTTON
  // ========================================

  const submitButton =
    document.querySelector(".submit-btn");


  const originalButtonText =
    submitButton
      ? submitButton.textContent
      : "";


  if (submitButton) {

    submitButton.disabled = true;

    submitButton.textContent =
      "⏳ Sending Report...";

  }


  try {

    // ======================================
    // SUPABASE INSERT
    // ======================================

    const { data, error } =
      await supabaseClient
        .from("reports")
        .insert([

          {
            report_code: reportID,

            category: selectedCategory,

            description: description,

            location: location,

            incident_date: incidentDate,

            repeated: repeated,

            urgency: urgency,

            anonymous: isAnonymous,

            student_name: finalStudentName,

            grade_section: finalGradeSection,

            status: "Received"

          }

        ])
        .select()
        .single();


    // ======================================
    // ERROR
    // ======================================

    if (error) {

      console.error(
        "Supabase error:",
        error
      );

      alert(
        "Hindi naisumite ang report.\n\n" +
        "Maaaring hindi pa naka-configure ang database security policy."
      );

      return;
    }


    // ======================================
    // SUCCESS
    // ======================================

    console.log(
      "Report successfully saved:",
      data
    );


    const generatedID =
      document.getElementById("generatedID");


    if (generatedID) {

      generatedID.textContent =
        reportID;

    }


    // Clear form
    clearReportForm();


    // Show success
    hideSections();


    if (successSection) {

      successSection.classList.remove("hidden");

    }


    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });


  } catch (error) {

    console.error(
      "Unexpected error:",
      error
    );

    alert(
      "May error habang ipinapadala ang report. " +
      "Pakisubukan muli."
    );


  } finally {

    if (submitButton) {

      submitButton.disabled = false;

      submitButton.textContent =
        originalButtonText ||
        "🔒 Submit Confidential Report";

    }

  }

}


// ==========================================
// CLEAR REPORT FORM
// ==========================================

function clearReportForm() {

  selectedCategory = "";

  const description =
    document.getElementById("description");

  const location =
    document.getElementById("location");

  const incidentDate =
    document.getElementById("incidentDate");

  const repeated =
    document.getElementById("repeated");

  const urgency =
    document.getElementById("urgency");

  const anonymous =
    document.getElementById("anonymous");

  const studentName =
    document.getElementById("studentName");

  const gradeSection =
    document.getElementById("gradeSection");

  const categoryText =
    document.getElementById("selectedCategory");

  const reportForm =
    document.getElementById("reportForm");

  const nameBox =
    document.getElementById("nameBox");


  if (description) {
    description.value = "";
  }

  if (location) {
    location.value = "";
  }

  if (incidentDate) {
    incidentDate.value = "";
  }

  if (repeated) {
    repeated.value = "";
  }

  if (urgency) {
    urgency.value = "";
  }

  if (anonymous) {
    anonymous.value = "Yes - Anonymous";
  }

  if (studentName) {
    studentName.value = "";
  }

  if (gradeSection) {
    gradeSection.value = "";
  }

  if (categoryText) {
    categoryText.textContent = "";
  }

  if (nameBox) {
    nameBox.classList.add("hidden");
  }

  if (reportForm) {
    reportForm.classList.add("hidden");
  }

}


// ==========================================
// TRACK REPORT
// ==========================================

async function trackReport() {

  const input =
    document.getElementById("reportID");

  const result =
    document.getElementById("trackingResult");


  if (!input || !result) {
    return;
  }


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


  // ========================================
  // SEARCH SUPABASE
  // ========================================

  result.innerHTML = `
    <div class="info-box">
      ⏳ Checking report status...
    </div>
  `;


  try {

    const { data, error } =
      await supabaseClient
        .from("reports")
        .select(
          "report_code,status,created_at"
        )
        .eq("report_code", id)
        .maybeSingle();


    if (error) {

      console.error(
        "Tracking error:",
        error
      );

      result.innerHTML = `
        <div class="privacy-warning">
          ⚠️ Unable to check the report right now.
        </div>
      `;

      return;
    }


    if (!data) {

      result.innerHTML = `
        <div class="privacy-warning">
          ❌ Report ID not found.
          <br><br>
          Please check your Report ID and try again.
        </div>
      `;

      return;
    }


    // ======================================
    // STATUS
    // ======================================

    let statusIcon = "🟡";


    if (data.status === "Received") {
      statusIcon = "🟡";
    }

    else if (data.status === "Under Review") {
      statusIcon = "🔵";
    }

    else if (data.status === "Resolved") {
      statusIcon = "🟢";
    }

    else if (data.status === "Closed") {
      statusIcon = "⚪";
    }


    result.innerHTML = `
      <div class="info-box">

        <h3>
          📄 Report Found
        </h3>

        <p>
          <strong>Report ID:</strong>
          ${escapeHTML(data.report_code)}
        </p>

        <p>
          <strong>Status:</strong>
          ${statusIcon}
          ${escapeHTML(data.status)}
        </p>

        <p>
          Your report has been received by the
          Student SafeReport system.
        </p>

      </div>
    `;


  } catch (error) {

    console.error(
      "Unexpected tracking error:",
      error
    );

    result.innerHTML = `
      <div class="privacy-warning">
        ⚠️ Something went wrong.
        Please try again.
      </div>
    `;

  }

}


// ==========================================
// SECURITY HELPER
// ==========================================

function escapeHTML(value) {

  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  function () {

    hideSections();

    console.log(
      "New Israel Highschool SafeReport loaded."
    );

  }
);

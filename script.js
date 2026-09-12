

        // ==========================================
// NEW ISRAEL HIGHSCHOOL
// STUDENT SAFEREPORT
// FINAL SCRIPT.JS
// ==========================================


// ==========================================
// SECTIONS
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


// ==========================================
// HIDE ALL SECTIONS
// ==========================================

function hideSections() {

  sections.forEach(section => {

    if (section) {
      section.classList.add("hidden");
    }

  });

}


// ==========================================
// HOME
// ==========================================

function goHome() {

  hideSections();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


// ==========================================
// SHOW REPORT
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
// SHOW TRACK
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
// SHOW HELP
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
// SHOW PRIVACY
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

      if (!nameBox) {
        return;
      }


      if (this.value.includes("No")) {

        nameBox.classList.remove("hidden");

      } else {

        nameBox.classList.add("hidden");

        const studentName =
          document.getElementById("studentName");

        const gradeSection =
          document.getElementById("gradeSection");


        if (studentName) {
          studentName.value = "";
        }

        if (gradeSection) {
          gradeSection.value = "";
        }

      }

    }
  );

}


// ==========================================
// GENERATE REPORT ID
// ==========================================

function generateReportID() {

  const year =
    new Date().getFullYear();

  const randomNumber =
    Math.floor(
      100000 +
      Math.random() * 900000
    );

  return `SR-${year}-${randomNumber}`;

}


// ==========================================
// SUBMIT REPORT
// ==========================================

async function submitReport() {


  // ========================================
  // GET FORM VALUES
  // ========================================

  const descriptionElement =
    document.getElementById("description");

  const locationElement =
    document.getElementById("location");

  const incidentDateElement =
    document.getElementById("incidentDate");

  const repeatedElement =
    document.getElementById("repeated");

  const urgencyElement =
    document.getElementById("urgency");

  const anonymousElement =
    document.getElementById("anonymous");

  const studentNameElement =
    document.getElementById("studentName");

  const gradeSectionElement =
    document.getElementById("gradeSection");


  const description =
    descriptionElement
      ? descriptionElement.value.trim()
      : "";

  const location =
    locationElement
      ? locationElement.value
      : "";

  const incidentDate =
    incidentDateElement
      ? incidentDateElement.value
      : "";

  const repeated =
    repeatedElement
      ? repeatedElement.value
      : "";

  const urgency =
    urgencyElement
      ? urgencyElement.value
      : "";

  const anonymous =
    anonymousElement
      ? anonymousElement.value
      : "Yes - Anonymous";

  const studentName =
    studentNameElement
      ? studentNameElement.value.trim()
      : "";

  const gradeSection =
    gradeSectionElement
      ? gradeSectionElement.value.trim()
      : "";


  // ========================================
  // VALIDATION
  // ========================================

  if (!selectedCategory) {

    alert(
      "Please select a concern category."
    );

    return;
  }


  if (!description) {

    alert(
      "Please describe what happened."
    );

    return;
  }


  if (description.length < 10) {

    alert(
      "Please provide at least 10 characters describing what happened."
    );

    return;
  }


  if (description.length > 5000) {

    alert(
      "Your description is too long. Please keep it under 5000 characters."
    );

    return;
  }


  if (!location) {

    alert(
      "Please select where it happened."
    );

    return;
  }


  if (!incidentDate) {

    alert(
      "Please select the date."
    );

    return;
  }


  if (!repeated) {

    alert(
      "Please answer if this is happening repeatedly."
    );

    return;
  }


  if (!urgency) {

    alert(
      "Please select the urgency."
    );

    return;
  }


  // ========================================
  // ANONYMOUS
  // ========================================

  const isAnonymous =
    anonymous === "Yes - Anonymous";


  const finalStudentName =
    isAnonymous
      ? null
      : studentName;


  const finalGradeSection =
    isAnonymous
      ? null
      : gradeSection;


  // ========================================
  // GENERATE REPORT CODE
  // ========================================

  const reportID =
    generateReportID();


  // ========================================
  // SUBMIT BUTTON
  // ========================================

  const submitButton =
    document.querySelector(".submit-btn");


  const originalText =
    submitButton
      ? submitButton.textContent
      : "🔒 Submit Confidential Report";


  if (submitButton) {

    submitButton.disabled = true;

    submitButton.textContent =
      "⏳ Sending Report...";

  }


  // ========================================
  // CHECK SUPABASE
  // ========================================

  if (
    typeof supabaseClient === "undefined"
  ) {

    alert(
      "Supabase is not connected. Please check your index.html."
    );

    if (submitButton) {

      submitButton.disabled = false;

      submitButton.textContent =
        originalText;

    }

    return;
  }


  // ========================================
  // SAVE TO SUPABASE
  // ========================================

  try {

    const { error } =
      await supabaseClient
        .from("reports")
        .insert([
          {

            report_code:
              reportID,

            category:
              selectedCategory,

            description:
              description,

            location:
              location,

            incident_date:
              incidentDate,

            repeated:
              repeated,

            urgency:
              urgency,

            anonymous:
              isAnonymous,

            student_name:
              finalStudentName,

            grade_section:
              finalGradeSection,

            status:
              "Received"

          }
        ]);


    // ======================================
    // SUPABASE ERROR
    // ======================================

    if (error) {

      console.error(
        "Supabase Error:",
        error
      );


      alert(
        "Hindi naisumite ang report.\n\n" +
        "Error: " +
        error.message
      );


      return;

    }


    // ======================================
    // SUCCESS
    // ======================================

    const generatedID =
      document.getElementById("generatedID");


    if (generatedID) {

      generatedID.textContent =
        reportID;

    }


    clearReportForm();


    hideSections();


    if (successSection) {

      successSection.classList.remove(
        "hidden"
      );

    }


    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });


    console.log(
      "Report successfully submitted:",
      reportID
    );


  } catch (error) {

    console.error(
      "Unexpected error:",
      error
    );


    alert(
      "May unexpected error habang ipinapadala ang report.\n\n" +
      error.message
    );


  } finally {

    if (submitButton) {

      submitButton.disabled = false;

      submitButton.textContent =
        originalText;

    }

  }

}


// ==========================================
// CLEAR FORM
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
    anonymous.value =
      "Yes - Anonymous";
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
    document.getElementById(
      "trackingResult"
    );


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


  if (
    typeof supabaseClient === "undefined"
  ) {

    result.innerHTML = `
      <div class="privacy-warning">
        ⚠️ Supabase is not connected.
      </div>
    `;

    return;
  }


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
        .eq(
          "report_code",
          id
        )
        .maybeSingle();


    if (error) {

      console.error(
        "Tracking Error:",
        error
      );


      result.innerHTML = `
        <div class="privacy-warning">
          ⚠️ Hindi pa available ang report tracking.
          <br><br>
          Please try again later.
        </div>
      `;

      return;
    }


    if (!data) {

      result.innerHTML = `
        <div class="privacy-warning">
          ❌ Report ID not found.
          <br><br>
          Please check your Report ID.
        </div>
      `;

      return;
    }


    let statusIcon =
      "🟡";


    if (data.status === "Received") {

      statusIcon =
        "🟡";

    }

    else if (
      data.status === "Under Review"
    ) {

      statusIcon =
        "🔵";

    }

    else if (
      data.status === "Resolved"
    ) {

      statusIcon =
        "🟢";

    }

    else if (
      data.status === "Closed"
    ) {

      statusIcon =
        "⚪";

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
          Your report has been received
          and is awaiting review by
          authorized school personnel.
        </p>

      </div>
    `;


  } catch (error) {

    console.error(
      "Tracking Error:",
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
// ESCAPE HTML
// ==========================================

function escapeHTML(value) {

  if (
    value === null ||
    value === undefined
  ) {

    return "";

  }


  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}


// ==========================================
// START
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  function () {

    hideSections();

    console.log(
      "New Israel Highschool Student SafeReport is ready."
    );

  }
);

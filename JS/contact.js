/* ---------- CONTACT FORM VALIDATION ---------- */
function setupContactValidation() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const age = document.getElementById("age");
  const password = document.getElementById("password");
  const repassword = document.getElementById("repassword");
  const submitBtn = document.getElementById("submitBtn");

  const nameRegex = /^[A-Za-z\u0600-\u06FF ]{2,50}$/; // allow Arabic letters too
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegex = /^[0-9+\-() ]{7,20}$/;
  const ageRegex = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  function validateAll() {
    const v1 = nameRegex.test(name.value.trim());
    const v2 = emailRegex.test(email.value.trim());
    const v3 = phoneRegex.test(phone.value.trim());
    const v4 = ageRegex.test(age.value.trim());
    const v5 = passwordRegex.test(password.value.trim());
    const v6 = repassword.value.trim() === password.value.trim();

    toggleValidity(name, v1);
    toggleValidity(email, v2);
    toggleValidity(phone, v3);
    toggleValidity(age, v4);
    toggleValidity(password, v5);
    toggleValidity(repassword, v6);

    submitBtn.disabled = !(v1 && v2 && v3 && v4 && v5 && v6);
  }

  function toggleValidity(el, ok) {
    el.classList.toggle("is-valid", ok);
    el.classList.toggle("is-invalid", !ok);
  }

  [name, email, phone, age, password, repassword].forEach((inp) =>
    inp.addEventListener("input", validateAll)
  );
  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Form submitted (for exam demo).");
  });
}

controls.innerHTML = `
      <form id="contactForm" class="row g-3 w-75">
        <div class="col-md-6">
          <input id="name" type="text" class="form-control" placeholder="Name" required />
          <div class="invalid-feedback">Enter a valid name (letters & spaces only)</div>
        </div>
        <div class="col-md-6">
          <input id="email" type="tel" class="form-control" type="email" placeholder="Email" required />
          <div class="invalid-feedback">Enter a valid email</div>
        </div>
        <div class="col-md-6">
          <input id="phone" class="form-control" placeholder="Phone" required />
          <div class="invalid-feedback">Enter a valid phone</div>
        </div>
        <div class="col-md-6">
          <input id="age" type="number" class="form-control" placeholder="Age" required />
          <div class="invalid-feedback">Enter a valid age (1-120)</div>
        </div>
        <div class="col-md-6">
          <input id="password" type="password" class="form-control" placeholder="Password" required />
          <div class="invalid-feedback">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
        </div>
        <div class="col-md-6">
          <input id="repassword" type="password" class="form-control" placeholder="Re-Password" required />
          <div class="invalid-feedback">Re-password must match password</div>
        </div>
        <div class="col-12">
          <button id="submitBtn" class="btn btn-success" disabled>Submit</button>
        </div>
      </form>
    `;
setupContactValidation();

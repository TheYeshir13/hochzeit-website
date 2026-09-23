(() => {
  "use strict";
  const CONFIGURED = false;
  const form = document.querySelector("#rsvp-form");
  if (!form) return;

  const attending = form.querySelector("#attending");
  const section = form.querySelector("#attendees-section");
  const count = form.querySelector("#guest_count");
  const fields = form.querySelector("#guest-fields");
  const consentWrap = form.querySelector("#consent-wrap");
  const consent = form.querySelector("#allergy_consent");
  const button = form.querySelector("#submit-button");
  const status = form.querySelector("#form-status");
  const notice = document.querySelector("#setup-notice");
  const choices = [
    ["", "Bitte wählen"], ["vegan", "Vegan"],
    ["vegetarian", "Vegetarisch"], ["meat", "Fleisch"]
  ];

  function input(labelText, id, name, required = false) {
    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = labelText;
    const control = document.createElement("input");
    control.id = id;
    control.name = name;
    control.maxLength = 120;
    control.required = required;
    return [label, control];
  }

  function renderGuests() {
    const yes = attending.value === "yes";
    section.hidden = !yes;
    count.disabled = !yes;
    if (!yes) {
      fields.replaceChildren();
      consentWrap.hidden = true;
      consent.disabled = true;
      consent.checked = false;
      consent.required = false;
      return;
    }
    const n = Number(count.value);
    if (!Number.isInteger(n) || n < 1 || n > 10) {
      fields.replaceChildren();
      return;
    }
    const previous = Array.from(fields.querySelectorAll("input, select"))
      .reduce((values, control) => (values[control.name] = control.value, values), {});
    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= n; i++) {
      const group = document.createElement("div");
      group.className = "card";
      const heading = document.createElement("h3");
      heading.textContent = `Person ${i}`;
      group.append(heading);
      const [nameLabel, nameControl] = input("Name", `guest_${i}_name`, `guest_${i}_name`, true);
      nameControl.value = previous[nameControl.name] || "";
      group.append(nameLabel, nameControl);
      const mealLabel = document.createElement("label");
      mealLabel.htmlFor = `guest_${i}_meal`;
      mealLabel.textContent = "Essenswunsch";
      const meal = document.createElement("select");
      meal.id = mealLabel.htmlFor;
      meal.name = `guest_${i}_meal`;
      meal.required = true;
      for (const [value, text] of choices) meal.add(new Option(text, value));
      meal.value = previous[meal.name] || "";
      group.append(mealLabel, meal);
      const [allergyLabel, allergy] = input(
        "Allergien oder Unverträglichkeiten (freiwillig, nur soweit für das Essen nötig)",
        `guest_${i}_allergies`, `guest_${i}_allergies`
      );
      allergy.value = previous[allergy.name] || "";
      allergy.maxLength = 300;
      group.append(allergyLabel, allergy);
      fragment.append(group);
    }
    fields.replaceChildren(fragment);
    updateConsent();
  }

  function updateConsent() {
    const hasAllergies = Array.from(fields.querySelectorAll('input[name$="_allergies"]'))
      .some((control) => control.value.trim());
    consentWrap.hidden = !hasAllergies;
    consent.disabled = !hasAllergies;
    consent.required = hasAllergies;
    if (!hasAllergies) consent.checked = false;
  }

  attending.addEventListener("change", renderGuests);
  count.addEventListener("input", renderGuests);
  fields.addEventListener("input", updateConsent);
  if (CONFIGURED && /^https:\/\//.test(form.action) && form.getAttribute("action")) {
    button.disabled = false;
    notice.hidden = true;
  }
  renderGuests();

  form.addEventListener("submit", (event) => {
    if (!CONFIGURED || !form.getAttribute("action")) {
      event.preventDefault();
      status.textContent = "Das Formular ist noch nicht freigeschaltet.";
      return;
    }
    if (attending.value === "yes" && !fields.children.length) {
      event.preventDefault();
      status.textContent = "Bitte eine gültige Personenzahl zwischen 1 und 10 eingeben.";
      count.focus();
      return;
    }
    if (consent.required && !consent.checked) {
      event.preventDefault();
      status.textContent = "Bitte bestätige die Verarbeitung der angegebenen Allergien oder entferne diese Angaben.";
      consent.focus();
      return;
    }
    status.textContent = "Die Rückmeldung wird an den Formularanbieter übermittelt …";
  });
})();
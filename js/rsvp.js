(() => {
  "use strict";

  const RSVP_ENDPOINT = "https://hochzeit-rsvp.jonathan-sudermann.workers.dev/rsvp";
  const MAX_GUESTS = 10;
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
  const honeypot = form.querySelector("#website");
  const choices = [
    ["", "Bitte wählen"],
    ["vegan", "Vegan"],
    ["vegetarian", "Vegetarisch"],
    ["meat", "Fleisch"]
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

  function updateConsent() {
    const hasAllergies = Array.from(fields.querySelectorAll('input[name$="_allergies"]'))
      .some((control) => control.value.trim());

    consentWrap.hidden = !hasAllergies;
    consent.disabled = !hasAllergies;
    consent.required = hasAllergies;

    if (!hasAllergies) consent.checked = false;
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

    const numberOfGuests = Number(count.value);
    if (!Number.isInteger(numberOfGuests) || numberOfGuests < 1 || numberOfGuests > MAX_GUESTS) {
      fields.replaceChildren();
      return;
    }

    const previous = Array.from(fields.querySelectorAll("input, select"))
      .reduce((values, control) => {
        values[control.name] = control.value;
        return values;
      }, {});

    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= numberOfGuests; i++) {
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

      for (const [value, text] of choices) {
        meal.add(new Option(text, value));
      }

      meal.value = previous[meal.name] || "";
      group.append(mealLabel, meal);

      const [allergyLabel, allergy] = input(
        "Allergien oder Unverträglichkeiten (freiwillig, nur soweit für das Essen nötig)",
        `guest_${i}_allergies`,
        `guest_${i}_allergies`
      );
      allergy.value = previous[allergy.name] || "";
      allergy.maxLength = 300;
      group.append(allergyLabel, allergy);

      fragment.append(group);
    }

    fields.replaceChildren(fragment);
    updateConsent();
  }

  function getGuests() {
    return Array.from(fields.querySelectorAll(".card")).map((group, index) => {
      const position = index + 1;
      return {
        name: group.querySelector(`#guest_${position}_name`).value.trim(),
        meal: group.querySelector(`#guest_${position}_meal`).value,
        allergies: group.querySelector(`#guest_${position}_allergies`).value.trim()
      };
    });
  }

  function setStatus(message, isError = false) {
    status.textContent = message;
    status.classList.toggle("form-error", isError);
    status.classList.toggle("form-success", !isError && message !== "");
  }

  attending.addEventListener("change", renderGuests);
  count.addEventListener("input", renderGuests);
  fields.addEventListener("input", updateConsent);

  if (notice) notice.hidden = true;
  button.disabled = false;
  renderGuests();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus("");

    if (!form.reportValidity()) return;

    const guests = attending.value === "yes" ? getGuests() : [];

    if (attending.value === "yes" && (guests.length < 1 || guests.length > MAX_GUESTS)) {
      setStatus(`Bitte gib zwischen 1 und ${MAX_GUESTS} teilnehmende Personen an.`, true);
      count.focus();
      return;
    }

    const hasAllergies = guests.some((guest) => guest.allergies !== "");
    if (hasAllergies && !consent.checked) {
      setStatus("Bitte bestätige die Verarbeitung der angegebenen Allergien oder entferne diese Angaben.", true);
      consent.focus();
      return;
    }

    const payload = {
      contactName: form.querySelector("#contact_name").value.trim(),
      email: form.querySelector("#reply_email").value.trim(),
      attendance: attending.value,
      guests,
      allergyConsent: hasAllergies && consent.checked,
      website: honeypot ? honeypot.value : ""
    };

    button.disabled = true;
    button.textContent = "Rückmeldung wird gesendet …";
    setStatus("Rückmeldung wird sicher übermittelt …");

    try {
      const response = await fetch(RSVP_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Die Rückmeldung konnte nicht gespeichert werden.");
      }

      form.reset();
      fields.replaceChildren();
      section.hidden = true;
      count.disabled = true;
      consentWrap.hidden = true;
      consent.disabled = true;
      consent.required = false;
      setStatus("Danke, eure Rückmeldung ist bei uns eingegangen.");
      button.hidden = true;
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Die Rückmeldung konnte gerade nicht gespeichert werden. Bitte versuche es später erneut.",
        true
      );
      button.disabled = false;
      button.textContent = "Rückmeldung senden";
    }
  });
})();

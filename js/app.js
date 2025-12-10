// Mobilmeny
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

// Årstall i footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Enkel booking-kalkulator
const bookingForm = document.getElementById("booking-form");
const estimateEl = document.getElementById("booking-estimate");

// Fiktive priser per natt (du kan endre disse)
const nightlyRates = {
  apt1: 1100,
  apt2: 1400,
  apt3: 1600,
  apt4: 1800,
  apt5: 1500,
  apt6: 1700,
};

function dateDiffInNights(start, end) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = end - start;
  const nights = Math.round(diff / msPerDay);
  return nights > 0 ? nights : 0;
}

if (bookingForm && estimateEl) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const apartment = bookingForm.apartment.value;
    const checkin = new Date(bookingForm.checkin.value);
    const checkout = new Date(bookingForm.checkout.value);
    const guests = Number(bookingForm.guests.value || 1);
    const email = bookingForm["email"].value;

    if (!apartment || isNaN(checkin) || isNaN(checkout)) {
      estimateEl.textContent =
        "Vennligst fyll inn leilighet og gyldige datoer.";
      estimateEl.style.color = "#ffb4c2";
      return;
    }

    const nights = dateDiffInNights(checkin, checkout);
    if (nights <= 0) {
      estimateEl.textContent =
        "Utsjekk må være etter innsjekk. Sjekk datoene dine.";
      estimateEl.style.color = "#ffb4c2";
      return;
    }

    const rate = nightlyRates[apartment] || 0;
    const basePrice = rate * nights;
    const cleaningFee = 450;
    const total = basePrice + cleaningFee;

    estimateEl.style.color = "#cfe9ff";
    estimateEl.textContent = `Estimert pris for ${nights} natt(er) for ${guests} gjest(er): ca. ${total.toLocaleString(
      "nb-NO"
    )} kr inkl. rengjøring. Du sendes videre til vår bookingside for å fullføre.`;

    // HER ville du normalt sende videre til Smoobu
    // Eksempel på redirect til booking-side (bytt URL til din Smoobu-booking):
    // const smoobuUrl = "https://login.smoobu.com/en/booking-engine/YOUR-ID";
    // window.location.href = smoobuUrl;

    // For nå: bare scroll ned til widgetområdet
    const widget = document.querySelector(".smoobu-widget-placeholder");
    if (widget) {
      widget.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

let contenedorCard = document.getElementById("contenedor-cards-general");
let searchInput = document.getElementById("searchInput");
let contenedorCheck = document.getElementById("checkbox-contain");
let categories = new Set(events.map((element) => element.category).sort());
let hrefHome = "./pages/details.html";
let hrefOtros = "./details.html";

function htmlCard(array, ruta) {
  contenedorCard.innerHTML += `
    <div
    class="card m-3 shadow-lg p-3 mb-5 bg-body rounded"
    style="width: 18rem ; height:30rem" 
  >
    <img
      src="${array.image}"
      class="card-img-top "
      height="171"
      alt="foto-disfraces"
    />
    <div class="card-body marginCardBody">
      <h6 class="card-title text-center pt-1 pb-2 rounded-pill text-bg-dark ">${array.category}</h6>
      <h5 class="card-title pt-2 text-center text-decoration-underline">${array.name}</h5>
      <p class="card-text">
        ${array.description}
      </p>
    </div> 
    <div class="card-body d-flex justify-content-around mt-2 pt-4">
      <p class="card-link mt-2">Price $${array.price}</p>
      <a
        href="${ruta}"
        class="btn btn-primary"
        style="height: 39.99px"
        >See more</a
      >
    </div>
  `;
}

function htmlCheck(array) {
  contenedorCheck.innerHTML += `
  <div class="form-check form-check-inline">
            <label class="form-check-label"
              >${array}
              <input
                class="form-check-input"
                type="checkbox"
                id="checkbox"
                name="check"
                value="${array}"
            /></label>
          </div>
  `;
}

function htmlActualizado(contenedorPadre) {
  contenedorPadre.innerHTML = "";
}

let upcoming = events.filter((event) => event.date > currentDate);
let past = events.filter((event) => event.date < currentDate);

categories.forEach((events) => htmlCheck(events));

switch (document.title) {
  case "Upcoming Events-Amazing Events":
    upcoming.forEach((e) => htmlCard(e, hrefOtros));

    searchInput.addEventListener("input", (event) => {
      htmlActualizado(contenedorCard);
      let escribir = upcoming.filter((evento) =>
        evento.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      escribir.forEach((e) => htmlCard(e, hrefOtros));
    });

    let categoriesUpcoming = [];
    contenedorCheck.addEventListener("change", (event) => {
      htmlActualizado(contenedorCard);
      if (event.target.checked) {
        categoriesUpcoming = categoriesUpcoming.concat(
          past.filter((evento) =>
            evento.category
              .toLowerCase()
              .includes(event.target.value.toLowerCase())
          )
        );
        categoriesUpcoming.forEach((e) => htmlCard(e, hrefOtros));
      } else {
        if (categoriesUpcoming.length > 0) {
          categoriesUpcoming = categoriesUpcoming.filter(
            (evento) =>
              evento.category.toLowerCase() !== event.target.value.toLowerCase()
          );
          categoriesUpcoming.forEach((e) => htmlCard(e, hrefOtros));
        }
        if (categoriesUpcoming.length === 0) {
          upcoming.forEach((e) => htmlCard(e, hrefOtros));
        }
      }
    });
    break;

  case "Past Events-Amazing Events":
    past.forEach((e) => htmlCard(e, hrefOtros));

    searchInput.addEventListener("input", (event) => {
      htmlActualizado(contenedorCard);
      let escribir = past.filter((evento) =>
        evento.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      escribir.forEach((e) => htmlCard(e, hrefOtros));
    });

    let categoriesPast = [];
    contenedorCheck.addEventListener("change", (event) => {
      htmlActualizado(contenedorCard);
      if (event.target.checked) {
        categoriesPast = categoriesPast.concat(
          past.filter((evento) =>
            evento.category
              .toLowerCase()
              .includes(event.target.value.toLowerCase())
          )
        );
        categoriesPast.forEach((e) => htmlCard(e, hrefOtros));
      } else {
        if (categoriesPast.length > 0) {
          categoriesPast = categoriesPast.filter(
            (evento) =>
              evento.category.toLowerCase() !== event.target.value.toLowerCase()
          );
          categoriesPast.forEach((e) => htmlCard(e, hrefOtros));
        }
        if (categoriesPast.length === 0) {
          past.forEach((e) => htmlCard(e, hrefOtros));
        }
      }
    });
    break;

  default:
    events.forEach((e) => htmlCard(e, hrefHome));

    searchInput.addEventListener("input", (event) => {
      htmlActualizado(contenedorCard);
      let escribir = events.filter((evento) =>
        evento.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      escribir.forEach((e) => htmlCard(e, hrefHome));
    });

    let categories = [];
    contenedorCheck.addEventListener("change", (event) => {
      htmlActualizado(contenedorCard);
      if (event.target.checked) {
        categories = categories.concat(
          events.filter((evento) =>
            evento.category
              .toLowerCase()
              .includes(event.target.value.toLowerCase())
          )
        );
        categories.forEach((e) => htmlCard(e, hrefHome));
      } else {
        if (categories.length > 0) {
          categories = categories.filter(
            (evento) =>
              evento.category.toLowerCase() !== event.target.value.toLowerCase()
          );
          categories.forEach((e) => htmlCard(e, hrefHome));
        }
        if (categories.length === 0) {
          events.forEach((e) => htmlCard(e, hrefHome));
        }
      }
    });
    break;
}

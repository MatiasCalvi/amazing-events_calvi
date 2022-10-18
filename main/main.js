let contenedorCard = document.getElementById("contenedor-cards-general");
let searchInput = document.getElementById("searchInput");
let contenedorCheck = document.getElementById("checkbox-contain");
let contenedorDetails = document.getElementById("contenedorDetails");
let categories = new Set(events.map((element) => element.category).sort());
let upcoming = events.filter((event) => event.date > currentDate);
let past = events.filter((event) => event.date < currentDate);
let applied = {};
let categoriesFiltradas = [];
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
        href="${ruta}?id=${array._id}"
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

function htmlDetails(obj) {
  contenedorDetails.innerHTML = `
      <div
        class="card mb-3 shadow-lg p-3 mb-5 bg-body rounded d-flex flex-column justify-content-center"
        style="width: 100%; height: 35rem contenedor-cards-general"
      >
        <div class="row g-0">
          <div class="col-md-6 p-4">
            <img
              src=${obj.image}
              class="img-fluid rounded-end mt-sm-4 mt-md-0 w-100 h-100"
              alt="foto-maraton"
            />
          </div>
          <div class="col-md-6">
            <div class="card-body">
            <h6 class="text-center pt-1 pb-1 text-bg-dark fs-5">${obj.category}</h6>
              <h1 class="card-title text-center fs-3 text-decoration-underline">${obj.name}</h1>
              <p class="text-center fs-4">${obj.date}</p>
              <p class="card-text pb-2 fs-5 text-center">
              ${obj.description}
              </p>
              <p class="text-center fs-5" style="padding-right:5%"><span class="fw-bold">Place: </span>${obj.place}</p>
              <p class="text-center fs-5" style="padding-right:5%"><span class="fw-bold">Capacity: </span>${obj.capacity}</p>
              <p class="text-center fs-5" style="padding-right:5%"><span class="fw-bold">Assistance: </span>${obj.assistance}</p>
              <p class="text-center fs-5" style="padding-right:5%"><span class="fw-bold">Price:</span> $${obj.price}</p>
            </div>
          </div>
        </div>
      </div>`;
}

function imprimir(array, ruta) {
  contenedorCard.innerHTML = "";
  array.forEach((e) => htmlCard(e, ruta));
}

function filterFn(fn, value, array, check) {
  applied[fn] = value;

  check
    ? categoriesFiltradas.push(value)
    : (categoriesFiltradas = categoriesFiltradas.filter(
        (element) => element !== value
      ));

  for (let date in applied) {
    if (date == "matchWithSearchBar") {
      array = array.filter((evento) =>
        evento.name.toLowerCase().includes(applied[date].toLowerCase())
      );
    }

    if (date == "matchWithCheck") {
      let auxiliar = [];
      categoriesFiltradas.forEach(
        (categoria) =>
          (auxiliar = auxiliar.concat(
            array.filter((element) =>
              element.category.toLowerCase().includes(categoria.toLowerCase())
            )
          ))
      );
      console.log(auxiliar);
      if (auxiliar.length > 0) {
        array = auxiliar;
      }
    }
  }

  return array;
}

switch (document.title) {
  case "Upcoming Events-Amazing Events":
    imprimir(upcoming, hrefOtros);
    categories.forEach((events) => htmlCheck(events));
    searchInput.addEventListener("input", (event) => {
      let escribir = filterFn(
        "matchWithSearchBar",
        event.target.value,
        upcoming
      );
      imprimir(escribir, hrefOtros);
    });

    contenedorCheck.addEventListener("change", (event) => {
      let prueba = filterFn(
        "matchWithCheck",
        event.target.value,
        upcoming,
        event.target.checked
      );
      imprimir(prueba, hrefOtros);
    });
    break;

  case "Past Events-Amazing Events":
    imprimir(past, hrefOtros);
    categories.forEach((events) => htmlCheck(events));
    searchInput.addEventListener("input", (event) => {
      let escribir = filterFn("matchWithSearchBar", event.target.value, past);
      imprimir(escribir, hrefOtros);
    });

    contenedorCheck.addEventListener("change", (event) => {
      let prueba = filterFn(
        "matchWithCheck",
        event.target.value,
        past,
        event.target.checked
      );
      imprimir(prueba, hrefOtros);
    });
    break;

  case "Details Event Amazing Events":
    let id = location.search.slice(4);
    let details = events.filter((element) => element._id === Number(id));
    details = details[0];
    console.log(details);
    htmlDetails(details);
    break;
  default:
    imprimir(events, hrefHome);
    categories.forEach((events) => htmlCheck(events));
    searchInput.addEventListener("input", (event) => {
      let escribir = filterFn("matchWithSearchBar", event.target.value, events);
      imprimir(escribir, hrefHome);
    });

    contenedorCheck.addEventListener("change", (event) => {
      let prueba = filterFn(
        "matchWithCheck",
        event.target.value,
        events,
        event.target.checked
      );
      imprimir(prueba, hrefHome);
    });
    break;
}

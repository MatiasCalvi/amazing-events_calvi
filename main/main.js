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

function imprimir(array, ruta) {
  contenedorCard.innerHTML = "";
  array.forEach((e) => htmlCard(e, ruta));
}

let applied = {};
let categoriesFiltradas = [];

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

let upcoming = events.filter((event) => event.date > currentDate);
let past = events.filter((event) => event.date < currentDate);

categories.forEach((events) => htmlCheck(events));

switch (document.title) {
  case "Upcoming Events-Amazing Events":
    imprimir(upcoming, hrefOtros);

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

    searchInput.addEventListener("input", (event) => {
      let escribir = filterFn(
        "matchWithSearchBar",
        event.target.value,
        past
      );
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

  default:
    imprimir(events, hrefHome);

    searchInput.addEventListener("input", (event) => {
      let escribir = filterFn(
        "matchWithSearchBar",
        event.target.value,
        events
      );
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

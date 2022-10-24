let containerCard = document.getElementById("contenedor-cards-general");
let searchInput = document.getElementById("searchInput");
let containerCheck = document.getElementById("checkbox-contain");
let containerDetails = document.getElementById("contenedorDetails");
let applied = {};
let categoriesFilter = [];
let hrefHome = "./pages/details.html";
let hrefOthers = "./details.html";

function htmlCard(array, route) {
  containerCard.innerHTML += `
    <div
    class="card m-3 shadow-lg p-3 mb-5 bg-body rounded"
    style="width: 18rem ; height:35rem" 
  >
    <img
      src="${array.image}"
      class="card-img-top mb-2"
      height="180px"
      alt="${array.name}"
    />
    <div class="card-body marginCardBody"style="height:13rem">
      <h6 class="card-title text-center pt-1 pb-2 rounded-pill text-bg-dark ">${array.category}</h6>
      <h5 class="card-title pt-2 text-center text-decoration-underline">${array.name}</h5>
      <p class="card-text text-center pt-3">
        ${array.description}
      </p>
    </div> 
    <div class="card-body d-flex justify-content-around mt-2 pt-5">
      <p class="card-link mt-2">Price $${array.price}</p>
      <a
        href="${route}?id=${array.id}"
        class="btn btn-primary"
        style="height: 39.99px"
        >See more</a
      >
    </div>
  `;
}

function htmlCheck(array) {
  containerCheck.innerHTML += `
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

function htmlDetails(obj, phrase, property) {
  containerDetails.innerHTML = `
      <div
        class="card  shadow-lg pb-2 bg-body rounded d-flex flex-column justify-content-center"
        style="width: 100%; height: 35rem contenedor-cards-general"
      >
      <h6 class="text-center pt-1 pb-1 text-bg-dark fs-4 rounded-3">${obj.category}</h6>
        <div class="row g-0">
          <div class="col-md-6 p-4">
            <img
              src=${obj.image}
              class="img-fluid rounded-end mt-sm-4 mt-md-0 w-100 h-100"
              alt="${obj.name}"
            />
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h1 class="card-title text-center fs-3 text-decoration-underline">${obj.name}</h1>
              <p class="text-center fs-4">${obj.date}</p>
              <p class="card-text pb-2 fs-5 text-center">
              ${obj.description}
              </p>
              <p class="text-center fs-5" style="padding-right:5%"><span class="fw-bold">Place: </span>${obj.place}</p>
              <p class="text-center fs-5" style="padding-right:5%"><span class="fw-bold">Capacity: </span>${obj.capacity}</p>
              <p class="text-center fs-5" style="padding-right:5%"><span class="fw-bold">${phrase}: </span>${obj[property]}</p>
              <p class="text-center fs-5" style="padding-right:2%"><span class="fw-bold">Price:</span> $${obj.price}<a href="#" class="btn btn-dark px-5" style="margin-left:4%">Buy</a></p>
            </div>
            </div>
        </div>
      </div>`;
}

function htmlStatsFirst(contenedor, id, obj, phrase, property, signo) {
  contenedor = document.getElementById(id);
  contenedor.innerHTML = `<td class="fs-6 mb-0"><span class="text-dark text-decoration-underline">${obj.name}</span><span class="text-info px-1"> ${phrase}: </span><span class="text-info px-2 ">${obj[property]} ${signo}</span></td>`;
}

function htmlStatsUpcoming(container, id, arrayFilt) {
  container = document.getElementById(id);
  arrayFilt.forEach((element) => {
    container.innerHTML += `<tr>
    <td class="text-center text-info text-decoration-underline" style="padding-left:5%">${element.category}</td>
    <td class="text-center text-info" style="padding-left:8%">$ ${element.revenues}</td>
    <td class="text-center" style="padding-left:8%">${element.percentageOfAttendance} %</td>
  </tr>`;
  });
}

function printHtml(array, ruta) {
  containerCard.innerHTML = "";
  array.forEach((e) => htmlCard(e, ruta));
}

function filterFn(fn, value, array, check) {
  applied[fn] = value;

  check
    ? categoriesFilter.push(value)
    : (categoriesFilter = categoriesFilter.filter(
        (element) => element !== value
      ));

  for (let date in applied) {
    if (date == "matchWithSearchBar") {
      array = array.filter((event) =>
        event.name.toLowerCase().includes(applied[date].toLowerCase())
      );
    }

    if (date == "matchWithCheck") {
      let auxiliar = [];
      categoriesFilter.forEach(
        (categoria) =>
          (auxiliar = auxiliar.concat(
            array.filter((element) =>
              element.category.toLowerCase().includes(categoria.toLowerCase())
            )
          ))
      );
      if (auxiliar.length > 0) {
        array = auxiliar;
      }
    }
  }

  return array;
}

function createdArrayStatsFirst(array, attendanceOrCapacity, minOrMax) {
  if (attendanceOrCapacity === "attendance") {
    let attendance = array.map((element) => ({
      name: element.name,
      assistance: ((element.assistance * 100) / element.capacity).toFixed(2),
    }));
    let attendanceOrder = [...attendance].sort(
      (a, b) => b.assistance - a.assistance
    );
    if (minOrMax === "min") {
      array = attendanceOrder[attendanceOrder.length - 1];
    } else if (minOrMax === "max") {
      array = attendanceOrder[0];
    }
  }
  if (attendanceOrCapacity === "capacity") {
    let attendanceCapacity = array.map((element) => ({
      name: element.name,
      capacity: element.capacity,
    }));
    let attendanceCapacityOrder = [...attendanceCapacity].sort(
      (a, b) => b.capacity - a.capacity
    );
    array = attendanceCapacityOrder[0];
  }
  return array;
}

function categoryRevenues(array) {
  let categoriesStatsUpcoming =[...array].map((element) => ({
    category: element.category,
    capacity: element.capacity,
    estimate: element.estimate,
    price: element.price,
  }))
  return categoriesStatsUpcoming;
}

function categoryRevenuesPast(array) {
  let categoriesStatsUpcoming =[...array].map((element) => ({
    category: element.category,
    capacity: element.capacity,
    assistance: element.assistance,
    price: element.price,
  }))
  return categoriesStatsUpcoming;
}

function categoriesNames(array) {
  let arrayFull = categoryRevenues(array);
  let arrayName = Array.from(
    new Set(arrayFull.map((element) => element.category).sort())
  );
  return arrayName;
}

let prices=[]//array de categorias con sus respectivas propiedades

function pricesByCategory(arrayF,arrayCate){
 
  let general=[]
  let arrayFull=[...arrayF]
  let arrayNamesCategory=[...arrayCate]
  arrayNamesCategory.forEach(element=>general.push(prices=arrayFull.filter(elemento=>elemento.category.includes(element))))
  let pricesByCategory=[]//categorias por precios en un array unicamente
  let priceAllCategory=[]//la concatenacion de categorias por el precio, array de arrays
  let results=[]//array con el resultado de los ingresos totales por categoria
  let assistance=[]//porcentage total por categoria
  let assistanceAllCategory=[] //array con las asistencias totales por categoria
  let capacity=[]//capacidad por cada categoria
  let capacityAllCategory=[]//la concatenacion de capacidad por categorias array de arrays
  let estimate=[]//estimacion por cada categoria
  let estimateAll=[]//la concatenacion de estimaciones por categorias array de arrays
  let armade=[]//array de objetos que se va a devolver
  

  if(arrayFull[1].hasOwnProperty("assistance")){
    
      general.forEach((element)=>assistance.push(arrayFull=element.map(arrayitem=>(arrayitem.assistance))))
      assistance.forEach(element=>assistanceAllCategory=assistanceAllCategory.concat(element.reduce((a,b)=>a+b)))
    
      general.forEach((element)=>capacity.push(arrayFull=element.map(arrayitem=>(arrayitem.capacity))))
      capacity.forEach(element=>capacityAllCategory=capacityAllCategory.concat(element.reduce((a,b)=>a+b)))

      general.forEach((element)=>priceAllCategory.push(pricesByCategory=element.map(arrayitem=>arrayitem.price*arrayitem.assistance)))
      priceAllCategory.forEach(element=>results=results.concat(element.reduce((a,b)=>a+b))) 

      armade=arrayNamesCategory.map(category=>({category:category}))

      let j=0
      for(let i of armade){
          {i.revenues=results[j],i.percentageOfAttendance=(assistanceAllCategory[j]*100/capacityAllCategory[j]).toFixed(1)}
          j++
        }
      console.log(armade)
      return armade
    }
    else{

      general.forEach((element)=>priceAllCategory.push(pricesByCategory=element.map(arrayitem=>arrayitem.price*arrayitem.estimate)))
      priceAllCategory.forEach(element=>results=results.concat(element.reduce((a,b)=>a+b)))

      general.forEach((element)=>estimate.push(arrayFull=element.map(arrayitem=>(arrayitem.estimate))))
      estimate.forEach(element=>estimateAll=estimateAll.concat(element.reduce((a,b)=>a+b)))
    
      general.forEach((element)=>capacity.push(arrayFull=element.map(arrayitem=>(arrayitem.capacity))))
      capacity.forEach(element=>capacityAllCategory=capacityAllCategory.concat(element.reduce((a,b)=>a+b)))


      armade=arrayNamesCategory.map(category=>({category:category}))
      
      let j=0
      for(let i of armade){
        {i.revenues=results[j],i.percentageOfAttendance=((estimateAll[j]*100)/capacityAllCategory[j]).toFixed(2)}
        j++
      }
      return armade
    }

}

async function capture() {
  try {
    let api = await fetch("https://mind-hub.up.railway.app/amazing");
    let data = await api.json();
    console.log(data)
    let events = data.events;
    let currentDate = (data.date);
    let categories = new Set(events.map((element) => element.category).sort());
    let upcoming = events.filter((event) => event.date >= currentDate);
    let past = events.filter((event) => event.date < currentDate);
    switch (document.title) {
      case "Upcoming Events-Amazing Events":
        printHtml(upcoming, hrefOthers);
        categories.forEach((events) => htmlCheck(events));
        searchInput.addEventListener("input", (event) => {
          let escribir = filterFn(
            "matchWithSearchBar",
            event.target.value,
            upcoming,
            event.target.checked
          );
          printHtml(escribir, hrefOthers);
          console.log(event.target.value);
        });

        containerCheck.addEventListener("change", (event) => {
          let prueba = filterFn(
            "matchWithCheck",
            event.target.value,
            upcoming,
            event.target.checked
          );
          printHtml(prueba, hrefOthers);
        });
        break;

      case "Past Events-Amazing Events":
        printHtml(past, hrefOthers);
        categories.forEach((events) => htmlCheck(events));
        searchInput.addEventListener("input", (event) => {
          let escribir = filterFn(
            "matchWithSearchBar",
            event.target.value,
            past,
            event.target.checked
          );
          printHtml(escribir, hrefOthers);
        });

        containerCheck.addEventListener("change", (event) => {
          let prueba = filterFn(
            "matchWithCheck",
            event.target.value,
            past,
            event.target.checked
          );
          printHtml(prueba, hrefOthers);
        });
        break;

      case "Details Event Amazing Events":
        let id = location.search.slice(4);
        let details = events.filter((element) => element.id === id);
        details = details[0];
        details.date = details.date.slice(0, 10);
        details.date < currentDate
          ? htmlDetails(details, "Assistance", "assistance")
          : htmlDetails(details, "Expectative", "estimate");
        break;

      case "Stats Amazing Events":
        let maxAttendance = createdArrayStatsFirst(past, "attendance", "max");
        let minAttendance = createdArrayStatsFirst(past, "attendance", "min");
        let attendanceCapacityOrder = createdArrayStatsFirst(past, "capacity");
        htmlStatsFirst(
          "containerMaxAttendance",
          "eventMaxPorcentage",
          maxAttendance,
          "Assistance",
          "assistance",
          "%"
        );
        htmlStatsFirst(
          "containerMinAttendance",
          "eventLowPorcentage",
          minAttendance,
          "Assistance",
          "assistance",
          "%"
        );
        htmlStatsFirst(
          "containerLargerCapacity",
          "eventMaxCapacity",
          attendanceCapacityOrder,
          "Capacity",
          "capacity",
          ""
        );

        htmlStatsUpcoming("container", "categoriesRowCell", pricesByCategory(categoryRevenues(upcoming),categoriesNames(upcoming)))
        htmlStatsUpcoming("container", "categoriesRowCell2",pricesByCategory(categoryRevenuesPast(past),categoriesNames(past)))
        break;

      default:
        printHtml(events, hrefHome);
        categories.forEach((events) => htmlCheck(events));
        searchInput.addEventListener("input", (event) => {
          let escribir = filterFn(
            "matchWithSearchBar",
            event.target.value,
            events,
            event.target.checked
          );
          printHtml(escribir, hrefHome);
        });

        containerCheck.addEventListener("change", (event) => {
          let prueba = filterFn(
            "matchWithCheck",
            event.target.value,
            events,
            event.target.checked
          );
          printHtml(prueba, hrefHome);
        });
        break;
    }
  } catch (error) {
    console.log(error);
  }
}
capture();

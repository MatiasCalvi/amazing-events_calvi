let contenedor=document.getElementById("contenedor-cards-general")
/* let contenedorUpcoming=document.getElementById("contenedor-cards-general-2")
let contenedorPast=document.getElementById("contenedor-cards-general-3") */

function imprimir(array,contenedor) {
  for(let i=0; i<array.length;i++){
      contenedor.innerHTML +=`
      <div
      class="card m-3 shadow-lg p-3 mb-5 bg-body rounded"
      style="width: 18rem"
    >
      <img
        src="${array[i].image}"
        class="card-img-top"
        height="171"
        alt="foto-disfraces"
      />
      <div class="card-body marginCardBody">
        <h5 class="card-title">${array[i].name}</h5>
        <p class="card-text">
          ${array[i].description}
        </p>
      </div>
      <div class="card-body d-flex justify-content-around pt-5">
        <p class="card-link mt-2">Price $${array[i].price}</p>
        <a
          href="./pages/details.html"
          class="btn btn-primary"
          style="height: 39.99px"
          >See more</a
        >
      </div>
    `
  }
}
let upconmig=events.filter(event=>event.date>currentDate)
console.log(upconmig)
let past=events.filter(event=>event.date<currentDate)
console.log(past)
switch(document.title){
  case 'Upcoming Events-Amazing Events':
    imprimir(upconmig,contenedor)
    break
  case 'Past Events-Amazing Events':
    imprimir(past,contenedor)
    break
  default:
    imprimir(events,contenedor)
    break
}








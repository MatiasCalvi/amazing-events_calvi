let contenedor=document.getElementById("contenedor-cards-general")
let hrefHome="./pages/details.html"
let hrefOtros="./details.html"

function imprimir(array,contenedor,condicion) {
  for(let i=0; i<array.length;i++){
      contenedor.innerHTML +=`
      <div
      class="card m-3 shadow-lg p-3 mb-5 bg-body rounded"
      style="width: 18rem"
    >
      <img
        src="${array[i].image}"
        class="card-img-top "
        height="171"
        alt="foto-disfraces"
      />
      <div class="card-body marginCardBody">
        <h5 class="card-title">${array[i].name}</h5>
        <p class="card-text">
          ${array[i].description}
        </p>
      </div>
      <div class="card-body d-flex justify-content-around ">
        <p class="card-link mt-2">Price $${array[i].price}</p>
        <a
          href="${condicion}"
          class="btn btn-primary"
          style="height: 39.99px"
          >See more</a
        >
      </div>
    `
  }
}
let upconmig=events.filter(event=>event.date>currentDate)
let past=events.filter(event=>event.date<currentDate)

switch(document.title){
  case 'Upcoming Events-Amazing Events':
    imprimir(upconmig,contenedor,hrefOtros)
    break
  case 'Past Events-Amazing Events':
    imprimir(past,contenedor,hrefOtros)
    break
  default:
    imprimir(events,contenedor,hrefHome)
    break
}








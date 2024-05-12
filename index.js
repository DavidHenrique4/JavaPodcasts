fetch(`podcast.xml`)
  .then(response => response.text()) 
  .then(data => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "text/xml");
    const posts = xml.querySelectorAll("post");
    let tarjetas = '';
    posts.forEach(post => {
        const titulo = post.getAttribute("titulo");
        const fecha = post.getAttribute("fecha");
        const autorNombre = post.querySelector("autor nombre").textContent;
        const introduccion = post.querySelector("introduccion").textContent;
        const tiempoLectura = post.querySelector("tiempo_lectura").textContent;
        const visualizaciones = post.querySelector("num_visualizaciones").textContent;
        const comentarios = post.querySelector("num_comentarios").textContent;
        const meGusta = post.querySelector("num_megusta").textContent;
        const imagen = post.querySelector("imagen").textContent;
        const descripcion = post.querySelector("descripcion").textContent;

        const tarjeta = `
        <div class="container">
            <div class="blog-post">
                <div class="post-image"><img src="${imagen}" alt="" ></div>
                <div class="post-info">
                    <p><span><i class="fas fa-user" style="color: #93969a;"></i> ${autorNombre} </span></p>
                    <p class="gray-text">${fecha} • ${tiempoLectura} min.</p>
                </div>
                <h2>${titulo}</h2>
                <p>${descripcion}</p>
                <div class="separador"></div>
                <div class="interactions">
                    <span>${visualizaciones} visualizaciones</span>
                    <span>${comentarios} comentarios</span>
                    <span>${meGusta} <i class="fas fa-heart"></i></span>
                </div>
            </div>
        </div>
        <div class="separadorficha"></div>
    `;

        tarjetas += tarjeta;
    });
    
    document.querySelector('#contenidoPodcasts').innerHTML = tarjetas;
  })

let songs = [];

let entryIndex = 0;

songs = (JSON.parse(localStorage.getItem("songs")) || []);

function listarCanciones() {

    let songsJSON = JSON.stringify(songs);
    localStorage.setItem("songs", songsJSON || []);
    let cont = document.getElementById("canciones");
    cont.innerHTML = "";

    console.log(songs)
    songs.forEach((item, index) => {

        cont.innerHTML += `
        <tr>
            <th class="table-text" scope="row">${index}</th>
            <td class="table-text">${item.name}</td>
            <td class="table-text">${item.band}</td>
            <td class="table-text">${item.year}</td>
            <td class="d-flex justify-content-center align-items-center"><img class="logo-img" src="${item.img}" alt=""></td>
            <td>
                <div class="d-flex justify-content-center align-items-center buttons">
                    <button type="button" class="m-2 btn btn-primary" data-bs-toggle="modal" onclick="updateIndex(${index})" data-bs-target="#editSong">
                        Editar
                    </button>
                    <button type="button" class="m-2 btn btn-secondary" onclick="borrarCancion(${index})">Delete</button>
                </div>
            </td>
        </tr>`
    })
}

function agregarCancion() {

    const name = document.querySelector("#Nombre").value;
    const band = document.querySelector("#Banda").value;
    const year = document.querySelector("#Año").value;
    const img = document.querySelector("#Img").value;

    if (name == null || name == undefined || name == "") {

        alert("Nombre invalido");
        return;
    } else if (band == null || band == undefined || band == "") {

        alert("Banda invalida");
        return;
    } else if (year == null || year == undefined || year == "") {

        alert("Año invalida");
        return;
    } else if (!validURL(img)) {

        alert("Link de imagen invalido");
        return;
    }

    songs.push({

        name: name,
        band: band,
        year: year,
        img: img,
    });

    listarCanciones();
}

function borrarCancion(index) {

    songs.splice(index, 1);
    listarCanciones();
}

function editarCancion() {

    const name = document.querySelector("#NombreEdit").value;
    const band = document.querySelector("#BandaEdit").value;
    const year = document.querySelector("#AñoEdit").value;
    const img = document.querySelector("#ImgEdit").value;
    const modal = document.getElementById("editSong");
    const myModal = new bootstrap.Modal(modal);

    if (name == null || name == undefined || name == "") {

        alert("Nombre invalido");
        return;
    } else if (band == null || band == undefined || band == "") {

        alert("Banda invalida");
        return;
    } else if (year == null || year == undefined || year == "") {

        alert("Año invalida");
        return;
    } else if (!validURL(img)) {

        alert("Link de imagen invalido");
        return;
    }

    modal.addEventListener("click", () => {

        myModal.hide();
    })

    songs[entryIndex] = {

        name: name,
        band: band,
        year: year,
        img: img,
    };

    listarCanciones();


}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

function updateIndex(index) {

    entryIndex = index;
}

/* Busqueda */

const searchBtn = document.getElementById("searchBtn"),
    searchInput = document.getElementById("searchInput"),
    result = document.getElementById("searchResult");

function searchItem() {

    let value = searchInput.value;
    let searchRes = songs.filter(item => value === item.name || value === item.band || value === item.year);

    result.innerHTML = "";

    if (searchRes == "" || searchRes == undefined || searchRes == null) {

        result.innerHTML += ` 
                        <div class="container border searchMargin">
                            <div class="row justify-content-center align-items-center text-center flex-column">
                                <p class="p-2 text-center">No se encontró un resultado que coincida con tu búsqueda</p>
                            </div>
                        </div>
            `

    } else {

        searchRes.forEach((item, index) => {

            result.innerHTML += ` 
                        <div class="container border searchMargin">
                            <div class="row justify-content-center align-items-center text-center flex-column">
                                <p class="p-2">Cancion: ${item.name}</p>
                                <p class="p-2">Banda: ${item.band}</p>
                                <p class="p-2">Año: ${item.year}</p>
                                <div class="img-fluid">
                                    <img class="logo-img" src="${item.img}">
                                </div>
                            </div>
                        </div>
            `
        })
    }

}

searchBtn.addEventListener("click", () => {

    searchItem();
})

listarCanciones();
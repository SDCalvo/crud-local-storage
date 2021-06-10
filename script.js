let entryIndex = 0;

const songs = (JSON.parse(localStorage.getItem("songs")) || []);

function listarCanciones() {

    const songsJSON = JSON.stringify(songs);
    localStorage.setItem("songs", songsJSON || "");
    const cont = document.getElementById("canciones");
    cont.innerHTML = "";

    songs.forEach((item, index) => {

        cont.innerHTML += `
        <tr>
            <th class="table-text" scope="row">${index}</th>
            <td class="table-text">${item.name}</td>
            <td class="table-text">${item.band}</td>
            <td class="table-text">${item.year}</td>
            <td class="d-flex justify-content-center align-items-center"><img class="logo-img" src="${item.img}" alt=""></td>
            <td>
                <div class="d-flex justify-content-center align-items-center btnH buttons">
                    <button type="button" class="m-2 btn btn-primary" data-bs-toggle="modal" onclick="updateIndex(${index})" data-bs-target="#editSong">
                        Editar
                    </button>
                    <button type="button" class="m-2 btn btn-secondary" onclick="borrarCancion(${index})">Eliminar</button>
                </div>
            </td>
        </tr>`
    })
}

function agregarCancion() {

    const name = document.querySelector("#Nombre").value,
        band = document.querySelector("#Banda").value,
        year = document.querySelector("#Año").value,
        img = document.querySelector("#Img").value;

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

function updateIndex(index) {

    entryIndex = index;
}

function editarCancion() {

    const name = document.querySelector("#NombreEdit").value,
        band = document.querySelector("#BandaEdit").value,
        year = document.querySelector("#AñoEdit").value,
        img = document.querySelector("#ImgEdit").value,
        modal = document.getElementById("editSong"),
        myModal = new bootstrap.Modal(modal);

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

/* Busqueda */

function searchItem() {

    const value = document.getElementById("searchInput").value,
        cont = document.getElementById("canciones"),
        searchRes = songs.filter(item => value === item.name || value === item.band || value === item.year);

    if (value == "" || value == null || value == undefined) {

        alert("No se encontraron resultados que coincidan con tu búsqueda");

    } else {

        cont.innerHTML = "";
        searchRes.forEach((item, index) => {

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
}

searchBtn.addEventListener("click", () => {

    searchItem();
})

listarCanciones();
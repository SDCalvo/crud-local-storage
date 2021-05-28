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
            <th scope="row">${index}</th>
            <td>${item.name}</td>
            <td>${item.band}</td>
            <td>${item.year}</td>
            <td><img class="logo-img" src="${item.img}" alt=""></td>
            <td>
                <button type="button" class="ms-2 btn btn-primary" data-bs-toggle="modal" onclick="updateIndex(${index})" data-bs-target="#editSong">
                    Editar cancion
                </button></td>
            <td><button type="button" class="btn btn-secondary" onclick="borrarCancion(${index})">Delete</button></td>
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
    } else if (img == null || img == undefined || img == "") {

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

    if (name == null || name == undefined || name == "") {

        alert("Nombre invalido");
        return;
    } else if (band == null || band == undefined || band == "") {

        alert("Banda invalida");
        return;
    } else if (year == null || year == undefined || year == "") {

        alert("Año invalida");
        return;
    } else if (img == null || img == undefined || img == "") {

        alert("Link de imagen invalido");
        return;
    }

    songs[entryIndex] = {

        name: name,
        band: band,
        year: year,
        img: img,
    };

    listarCanciones();
}

function updateIndex(index) {

    entryIndex = index;
}

listarCanciones();
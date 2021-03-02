const modal = document.querySelector("#massage");

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function modal_show(massage){
    modal.querySelector('p').innerHTML = massage;
    modal.style.display = "block";

    setTimeout(() => {
        modal.style.display = "none";
    }, 5 * 1000);
}

const del_btn = document.querySelector('#delete');
del_btn.addEventListener("click", (event) => {
    const json = {
        id: window.location.pathname.split('/')[2],
        nev: document.querySelector('.lista_nev').innerHTML.split(/\s+/)[0]
    }

    fetch("/delete/", {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': document.querySelector('.info').querySelector('input[name="csrfmiddlewaretoken"]').value
        },
        credentials: 'same-origin'
    }).then(response => response.json())
    .then(({
        response
    }) => {
        modal_show(response)
    })

    console.log(json);
});

const elemek = document.querySelectorAll('.targy');
elemek.forEach((elem) => {
    const torles_btn = elem.querySelector('#torles');
    torles_btn.addEventListener("click", (event) => {
        const json = {
            id: window.location.pathname.split('/')[2],
            tetel_id: parseInt(elem.querySelector('.id').innerHTML.split('#')[1])
        }

        fetch("/torles/", {
            method: "POST",
            body: JSON.stringify(json),
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': elem.querySelector('input[name="csrfmiddlewaretoken"]').value
            },
            credentials: 'same-origin'
        }).then(response => response.json())
        .then(({
            response
        }) => {
            modal_show(response)
        })

        console.log(json);
    });

    const frissit_btn = elem.querySelector('#frissit');
    frissit_btn.addEventListener("click", (event) => {
        const json = {
            id: window.location.pathname.split('/')[2],
            tetel_id: parseInt(elem.querySelector('.id').innerHTML.split('#')[1]),
            db: parseInt(elem.querySelector('input[name="db"]').value)
        }

        fetch("/frissit/", {
            method: "POST",
            body: JSON.stringify(json),
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': elem.querySelector('input[name="csrfmiddlewaretoken"]').value
            },
            credentials: 'same-origin'
        }).then(response => response.json())
        .then(({
            response
        }) => {
            modal_show(response)
        })

        console.log(json);
    });
});


const form = document.querySelector('form');
const add_btn = document.querySelector('#add');
add_btn.addEventListener("click", (event) => {

    add_btn.style.display = "none";
    form.style.display = "block";
});

const submit_btn = document.querySelector('#submit');
submit_btn.addEventListener("click", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const json = {
        id: window.location.pathname.split('/')[2],
        nev: formData.get('nev'),
        db: parseInt(formData.get('db')),
    }
    const csrftoken = formData.get('csrfmiddlewaretoken');

    fetch("/add/", {
            method: "POST",
            body: JSON.stringify(json),
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': csrftoken
            },
            credentials: 'same-origin'
        }).then(response => response.json())
        .then(({
            response
        }) => {
            modal_show(response)

            form.style.display = "none";
            add_btn.style.display = "block";

            console.log(json);
        })
});
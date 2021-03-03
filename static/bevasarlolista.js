const modal = document.querySelector("#massage");
const error = document.querySelector("#alert");

window.onclick = function (event) {
    if (event.target === error) {
        error.style.display = "none";
    }
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function modal_show(massage) {
    modal.querySelector('p').innerHTML = massage;
    modal.style.display = "block";

    setTimeout(() => {
        modal.style.display = "none";
    }, 5 * 1000);
}

let error_show = (massage, bool) => new Promise((resolve, reject) => {

    error.querySelector('.muvelet').innerHTML = massage;
    if(bool){
        error.querySelector('#bool').innerHTML = 'Ez a művelet <span class="red">visszavonhatatlan</span>.';
    }
    error.setAttribute("style", "display: block;")

    const megerosit = error.querySelector("#megerosit");
    megerosit.onclick = () => {
        error.setAttribute("style", "display: none;")
        resolve(true);
    };
    const megsem = error.querySelector("#megsem");
    megsem.onclick = () => {
        error.setAttribute("style", "display: none;")
        resolve(false);
    };
});

const rename_btn = document.querySelector('#rename');
const name_field = document.querySelector('.lista_nev');
name_field.addEventListener("click", (event) => {
    name_field.querySelector('#lista_nev').style.display = 'none';
    name_field.querySelector('.elnevezes').style.display = 'block';

    rename_btn.style.display = "block";
})

rename_btn.addEventListener("click", (event) => {
    error_show("Bevásárlólista átnevezés", false).then((value) => {
        if (value) {
            const json = {
                id: window.location.pathname.split('/')[2],
                nev: document.querySelector('.elnevezes').value
            }

            fetch("/rename/", {
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
        }
    })
});

const del_btn = document.querySelector('#delete');
del_btn.addEventListener("click", (event) => {
    error_show("Bevásárlólista törlés", true).then((value) => {
        if (value) {
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
        }
    })

});

const elemek = document.querySelectorAll('.targy');
elemek.forEach((elem) => {
    const torles_btn = elem.querySelector('#torles');
    torles_btn.addEventListener("click", (event) => {
        error_show("Téletel törlés", true).then((value) => {
            if (value) {
                const json = {
                    id: window.location.pathname.split('/')[2],
                    tetel_id: parseInt(elem.querySelector('.id').innerHTML.split('#')[1] - 1)
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
            }
        })
    });

    const frissit_btn = elem.querySelector('#frissit');
    frissit_btn.addEventListener("click", (event) => {
        error_show("Téletel frissítés", false).then((value) => {
            if (value) {
                const json = {
                    id: window.location.pathname.split('/')[2],
                    tetel_id: parseInt(elem.querySelector('.id').innerHTML.split('#')[1] - 1),
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
            }
        })
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
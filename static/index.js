const modal = document.querySelector("#massage");

const success = "zold";
const hiba = "piros";

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function modal_show(massage, state) {
    modal.querySelector('p').innerText = massage;
    modal.style.display = "block";
    modal.querySelector(".modal-content").classList.add(state);

    setTimeout(() => {
        modal.style.display = "none";
        modal.querySelector(".modal-content").classList.remove(state);
    }, 5 * 1000);
}

const create_btn = document.querySelector('#create');
create_btn.addEventListener("click", (event) => {
    fetch("/create/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': document.querySelector('.info').querySelector('input[name="csrfmiddlewaretoken"]').value
            },
            credentials: 'same-origin'
        }).then(response => response.json())
        .then((data) => {
            const {
                response
            } = data;
            const {
                massage
            } = data;

            if (response === "OK") {
                window.location.href = "/bevasarlolista/" + massage + "/";
            } else {
                modal_show(massage, hiba)
            }
        })
});
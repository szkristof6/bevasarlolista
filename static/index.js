const modal = document.querySelector("#massage");

window.onclick = function (event) {
    if (event.target == modal) {
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
        .then(({
            response
        }) => {
            window.location.href = "/bevasarlolista/" + response + "/";
        })
});
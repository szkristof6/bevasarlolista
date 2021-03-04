const modal = document.querySelector("#massage");
const error = document.querySelector("#alert");

const success = "zold";
const hiba = "piros";

window.onclick = function (event) {
	if (event.target === error) {
		error.style.display = "none";
	}
	if (event.target === modal) {
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

function hitelesit(input) {
	return input.toString().replace(/&/g, ' ').replace(/</g, ' ').replace(/>/g, ' ').replace(/"/g, ' ').trim()
}

let error_show = (massage, bool) => new Promise((resolve, reject) => {

	error.querySelector('.muvelet').innerText = massage;
	if (bool) {
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

			const id = hitelesit(window.location.pathname.split('/')[2]);
			const nev = hitelesit(document.querySelector('.elnevezes').value);
			const csrftoken = hitelesit(document.querySelector('.info').querySelector('input[name="csrfmiddlewaretoken"]').value);

			if(id !== "" && nev !== "" && csrftoken !== ""){
				const json = {
					id,
					nev
				}
	
				fetch("/rename/", {
						method: "POST",
						body: JSON.stringify(json),
						headers: {
							'Accept': 'application/json',
							'X-Requested-With': 'XMLHttpRequest',
							'X-CSRFToken': csrftoken
						},
						credentials: 'same-origin'
					}).then(response => response.json())
					.then((data) => {
						const {
							response, 
							massage
						} = data;
	
						if(response === "OK"){
							name_field.querySelector('#lista_nev').innerText = document.querySelector('.elnevezes').value
	
							name_field.querySelector('#lista_nev').style.display = 'block';
							name_field.querySelector('.elnevezes').style.display = 'none';
							modal_show(massage, success)
						} else {
							modal_show(massage, hiba)
						}
					})
	
				console.log(json);
			} else {
				modal_show("Az adatok nincsenek megadva!", hiba)
			}
		}
	})
});

const del_btn = document.querySelector('#delete');
del_btn.addEventListener("click", (event) => {
	error_show("Bevásárlólista törlés", true).then((value) => {
		if (value) {
			const id = window.location.pathname.split('/')[2];
			const csrftoken = document.querySelector('.info').querySelector('input[name="csrfmiddlewaretoken"]').value;

			if(id !== "" && csrftoken !== ""){
				const json = {
					id,
				}
	
				fetch("/delete/", {
						method: "POST",
						body: JSON.stringify(json),
						headers: {
							'Accept': 'application/json',
							'X-Requested-With': 'XMLHttpRequest',
							'X-CSRFToken': csrftoken
						},
						credentials: 'same-origin'
					}).then(response => response.json())
					.then((data) => {
						const {
							response, 
							massage
						} = data;

						if(response === "OK"){
							modal_show(massage, success)
							setTimeout(() => window.location.href = "/", 2 * 1000);
						} else {
							modal_show(massage, hiba)
						}
					})
	
				console.log(json);
			} else {
				modal_show("Az adatok nincsenek megadva!", hiba)
			}
		}
	})

});

const elemek = document.querySelectorAll('.targy');
elemek.forEach((elem) => {
	const torles_btn = elem.querySelector('#torles');
	torles_btn.addEventListener("click", (event) => {
		error_show("Téletel törlés", true).then((value) => {
			if (value) {

				const id = hitelesit(window.location.pathname.split('/')[2]);
				const tetel_id = parseInt(hitelesit(elem.querySelector('.id').innerText.split('#')[1] - 1));
				const csrftoken = hitelesit(elem.querySelector('input[name="csrfmiddlewaretoken"]').value);

				if (id !== "" && !isNaN(tetel_id) && csrftoken !== "") {
					const json = {
						id,
						tetel_id
					}

					fetch("/torles/", {
							method: "POST",
							body: JSON.stringify(json),
							headers: {
								'Accept': 'application/json',
								'X-Requested-With': 'XMLHttpRequest',
								'X-CSRFToken': csrftoken
							},
							credentials: 'same-origin'
						}).then(response => response.json())
						.then((data) => {
							const {
								response, 
								massage
							} = data;

							if(response === "OK"){
								elem.remove();
								modal_show(massage, success)
							} else {
								modal_show(massage, hiba)
							}
						})

					console.log(json);
				} else {
					modal_show("Az adatok nincsenek megadva!", hiba)
				}
			}
		})
	});

	const frissit_btn = elem.querySelector('#frissit');
	frissit_btn.addEventListener("click", (event) => {
		error_show("Téletel frissítés", false).then((value) => {
			if (value) {

				const id = hitelesit(window.location.pathname.split('/')[2]);
				const tetel_id = parseInt(hitelesit(elem.querySelector('.id').innerText.split('#')[1] - 1))
				const db = parseInt(hitelesit(elem.querySelector('input[name="db"]').value));
				const csrftoken = hitelesit(elem.querySelector('input[name="csrfmiddlewaretoken"]').value);

				if (id !== "" && !isNaN(tetel_id) && !isNaN(db) && csrftoken !== "") {
					const json = {
						id,
						tetel_id,
						db
					}

					fetch("/frissit/", {
							method: "POST",
							body: JSON.stringify(json),
							headers: {
								'Accept': 'application/json',
								'X-Requested-With': 'XMLHttpRequest',
								'X-CSRFToken': csrftoken
							},
							credentials: 'same-origin'
						}).then(response => response.json())
						.then((data) => {
							const {
								response, 
								massage
							} = data;

							if (response === "OK") {
								modal_show(massage, success)

							} else {
								modal_show(massage, hiba)
							}
						})

					console.log(json);

				} else {
					modal_show("Az adatok nincsenek megadva!", hiba)
				}
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
	const id = hitelesit(window.location.pathname.split('/')[2]);
	const nev = hitelesit(formData.get('nev'));
	const db = parseInt(hitelesit(formData.get('db')));
	const csrftoken = formData.get('csrfmiddlewaretoken');

	if (id !== "" && nev !== "" && !isNaN(db) && csrftoken !== "") {
		const json = {
			id,
			nev,
			db
		}

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
			.then((data) => {
				const {
					response, 
					massage
				} = data;
				if (response === "OK") {
					form.style.display = "none";
					add_btn.style.display = "block";

					setTimeout(() => window.top.location = window.top.location, 1 * 1000);

					modal_show(massage, success)

				} else {
					modal_show(massage, hiba)
				}
			})
	} else {
		modal_show("Az adatok nincsenek megadva!", hiba)
	}
	console.log(json);
});
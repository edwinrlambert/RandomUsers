let url = 'https://randomuser.me/api/'
let container = document.querySelector(`.container`);
let img_container = document.querySelector(`.gallery`);
let arr = []

// Calling the API and getting the response.
function getUsers() {
    return fetch(url)
        .then(response => {
            if (response.ok) {
                console.log("Success");
            } else {
                console.log("Failed")
            } return response.json()
        })
        .catch((error) => console.log(error))
}

// Function to render the cards to the gallery.
function renderGallery(card_num, img_url, name_text, email_text, city_state_text) {
    let card = `
        <div class="card" id="card${card_num}">
            <div class="card-img-container">
                <img class="card-img" src="${img_url}" alt="profile picture" />
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${name_text}</h3>
                <p class="card-text">${email_text}</p>
                <p class="card-text cap">${city_state_text}</p>
            </div>
        </div>
    `;

    // Append card to gallery.
    img_container.insertAdjacentHTML(
        `beforeend`,
        card
    );
}

// Function to render the modal when a card is clicked.
function renderModal(img_url, name_text, email_text, city_state_text, phone_num, address_text, birthday_date) {
    let modal = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src=${img_url} alt="profile picture">
                    <h3 id="name" class="modal-name cap">${name_text}</h3>
                    <p class="modal-text">${email_text}</p>
                    <p class="modal-text cap">${city_state_text}</p>
                    <hr>
                    <p class="modal-text">${phone_num}</p>
                    <p class="modal-text">${address_text}</p>
                    <p class="modal-text">Birthday: ${birthday_date}</p>
                </div>
            </div>
        </div>
    `;

    // Append card to gallery.
    container.insertAdjacentHTML(
        `beforeend`,
        modal
    );
}

// Function to remove the modal when the close button is clicked.
function removeModal() {
    const modal = document.querySelector(`.modal-container`);
    modal.parentElement.removeChild(modal);
}

// Main Method.
async function init() {
    // Getting 12 random user data.
    for (i = 0; i < 12; i++) {
        const data = await getUsers();
        result = data.results[0]
        // Putting the result into an dictionary.
        let dict = {
            "num": i,
            "image": result.picture.large,
            "name": result.name.first + ' ' + result.name.last,
            "email": result.email,
            "city_state": result.location.city + ', ' + result.location.state,
            "phone": result.phone,
            "address": result.location.street.name + ' ' + result.location.city + ', ' + result.location.state + ' ' + result.location.postcode,
            "birthday": new Date(result.dob.date).toISOString().split('T')[0]
        }

        // Pushing the dict to an array.
        arr.push(dict)
        // Rendering the gallery.
        renderGallery(arr[i].num, arr[i].image, arr[i].name, arr[i].email, arr[i].city_state);
    }

    // Selecting all cards.
    card_container = document.querySelectorAll(`.card`);
    // Adding event listener to all cards.
    card_container.forEach(card => {
        card.addEventListener('click', (e) => {

            let id = e.target.id.toString().replace('card', '')

            // Checking the id to the array values to populate in the modal.
            for (i = 0; i < arr.length; i++) {
                if (id == i) {
                    renderModal(arr[i].image, arr[i].name, arr[i].email, arr[i].city_state, arr[i].phone, arr[i].address, arr[i].birthday);
                    close_button = document.querySelector(`.modal-close-btn`);
                    close_button.addEventListener('click', () => {
                        removeModal();
                    });
                }
            }

        });
    });


}

init();
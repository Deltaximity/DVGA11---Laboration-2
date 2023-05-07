/** 
 * DVGA11 - Laboration 2
 * Hasan Ali
 * Daniel de Bruin
*/

let tables = document.querySelectorAll('.table');
let actionbar = document.querySelector('.actionbar');

// modal
let modal = document.querySelector('.backdrop');
let modalHeader = document.querySelector('#modal h3');
let modalMsg = document.querySelector('.message');

// knappar
let queueBtn = document.querySelector('#queue-btn');

// modal knappar
let closeModalBtn = document.querySelector('.close-modal');
let submitModalBtn = document.querySelector('.submit-btn');

// modal inputs
let nameInput = document.querySelector('#namn');
let peopleInput = document.querySelector('#people');

// kö element
let queueList = document.querySelector('.queue-items');
let items = document.querySelectorAll('.queue-item');

// våra js variabler
let selectedTable = 0;
let queueModal = false;
let queueNum = 0;
let queueArray = [];

tables.forEach(table => {
    table.addEventListener('click', (e) => {
        tables.forEach(table => {table.classList.remove('focus');});
        e.target.classList.add('focus');
        selectedTable = e.target.textContent.split(' ').shift();
        showActionBar(e.target.classList.contains('booked'));
    });
});

function showActionBar(booked) {
    actionbar.innerHTML = "";
    let avbrytBtn = document.createElement('div');
    let avbrytTextNode = document.createTextNode('Avbryt');
    avbrytBtn.classList.add('btn');
    avbrytBtn.appendChild(avbrytTextNode);
    actionbar.appendChild(avbrytBtn);
    avbrytBtn.addEventListener('click', () => {
        tables.forEach(table => {table.classList.remove('focus');});
        selectedTable = 0;
        actionbar.innerHTML = "";
        actionbar.insertAdjacentHTML('beforeend', '<p class="instruction">Tryck på ett bord för att boka/avboka</p>');
    });

    if (booked) {
        let avbokaBtn = document.createElement('div');
        let avbokaTextNode = document.createTextNode('Avboka');
        avbokaBtn.classList.add('btn', 'danger');
        avbokaBtn.appendChild(avbokaTextNode);
        actionbar.appendChild(avbokaBtn);
        avbokaBtn.addEventListener('click', () => {
            let table = tables[selectedTable-1];
            let tableStatus = table.children[0].children[2];
            table.classList.remove('booked');
            tableStatus.textContent = "Obokat";
            showActionBar(false);
        });
    } else {
        let bokaBtn = document.createElement('div');
        let bokaTextNode = document.createTextNode('Boka');
        bokaBtn.classList.add('btn', 'action');
        bokaBtn.appendChild(bokaTextNode);
        actionbar.appendChild(bokaBtn);
        bokaBtn.addEventListener('click', () => {
            modal.style.display = "block";
            queueModal = false;
            modalHeader.textContent = "Boka bord";
            submitModalBtn.textContent = "Boka";
        });
    }
}

// MODAL TRIGGER
queueBtn.addEventListener('click', () => {
    modal.style.display = "block";
    queueModal = true;
    modalHeader.textContent = "Lägg till i kö";
    submitModalBtn.textContent = "Lägg till";
});

// MODAL ACTIONS
closeModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    nameInput.value = "";
    peopleInput.value = "";
    modal.style.display = "none";
    modalMsg.style.display = "none";
});

submitModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    modalMsg.style.display = "none";
    // formulär validering
    if (nameInput.value.split(' ').join('').length < 1) {
        modalMsg.textContent = "Namn fältet får inte vara tomt";
        modalMsg.style.display = "inline-block";
        nameInput.focus();
        return;
    } else if (peopleInput.value <= 0) {
        modalMsg.textContent = "Det måste finnas minst en person";
        modalMsg.style.display = "inline-block";
        peopleInput.focus();
        return;
    }
    
    if (!queueModal) {
        // formulär validering
        if (Number(peopleInput.value) > tables[selectedTable-1].dataset.seats) {
            modalMsg.textContent = "Antalet personer får inte överstiga antal platser";
            modalMsg.style.display = "inline-block";
            peopleInput.value = tables[selectedTable-1].dataset.seats;
            peopleInput.focus();
            return;
        }
        // boka bord
        let table = tables[selectedTable-1];
        let tableStatus = table.children[0].children[2];
        table.classList.add('booked');
        tableStatus.textContent = "Bokat av " + nameInput.value;
        showActionBar(true);
    } else {
        // lägg till i kö
        queueNum++;
        let name = nameInput.value;
        let count = peopleInput.value;

        let item = {
            "partyName": name,
            "partyCount": count
        }
        queueArray.push(item);

        updateQueue();
    }

    nameInput.value = "";
    peopleInput.value = "";
    modal.style.display = "none";
});

function updateQueue() {
    // TA BORT ALLA ITEMS I DOMEN
    queueList.innerHTML = "";

    // LOOPA IGENOM ARRAYEN OCH PRINTA UT VARJE ENSKILT ITEM TILL DOMEN
    let arrayCount = 0;
    queueArray.forEach(item => {
        arrayCount++;
        queueList.insertAdjacentHTML("beforeend", 
        `<div class="queue-item">
            <p>#${arrayCount}</p>
            <p>${item.partyName}</p>
            <p>${item.partyCount} personer</p>
        </div>
        `);
    });

    // HÄMTA ALLA NYA ELEMENT FRÅN DOMEN
    items = document.querySelectorAll('.queue-item');

    // TILLDELA EVENTLYSSNARE TILL ALLA ITEMS I DOMEN    
    items.forEach(item => {
        let mouseDown = 0;
        let mouseUp = 0;

        item.addEventListener('mousedown', () => {
            mouseDown = Date.now();
        });

        item.addEventListener('mouseup', (e) => {
            mouseUp = Date.now();
            if((mouseUp-mouseDown) >= 1000) {
                e.currentTarget.remove();
                let itemNum = e.currentTarget.children[0].textContent.split('#')[1];
                queueArray.splice(itemNum - 1, 1);
                updateQueue();
            }
        });
    });
}
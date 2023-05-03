let tables = document.querySelectorAll('.table');
let actionbar = document.querySelector('.actionbar');

// modal
let modal = document.querySelector('.backdrop');
let modalHeader = document.querySelector('#modal h3');

// knappar
let queueBtn = document.querySelector('#queue-btn');
let bokaBtn = document.querySelector('#boka');
let avbrytBtn = document.querySelector('#avbryt');

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
        e.target.focus();
    });
    // table.addEventListener('focus', (e) => {
    //     selectedTable = e.target.textContent;
    //     actionbar.innerHTML = "";
    //     actionbar.insertAdjacentHTML('beforeend', '<button class="btn" id="avbryt">Avbryt</button><button class="btn action" id="boka">Boka</button>');
    // });
    // table.addEventListener("blur", () => {
    //     actionbar.innerHTML = "";
    //     actionbar.insertAdjacentHTML('beforeend', '<p class="instruction">Tryck på ett bord för att boka/avboka</p>')
    // });
});

// MODAL TRIGGER
queueBtn.addEventListener('click', () => {
    modal.style.display = "block";
    queueModal = true;
    modalHeader.textContent = "Lägg till i kö";
    submitModalBtn.textContent = "Lägg till";
})

bokaBtn.addEventListener('click', () => {
    modal.style.display = "block";
    queueModal = false;
    modalHeader.textContent = "Boka bord";
    submitModalBtn.textContent = "Boka";
});

// MODAL ACTIONS
closeModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = "none";
});

submitModalBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (!queueModal) {
        // boka bord
    } else {
        // lägg till i kö
        queueNum++;
        let name = nameInput.value;
        let count = peopleInput.value;

        //SKISS
        let item = {
            "partyName": name,
            "partyCount": count
        }
        queueArray.push(item);
        console.log(queueArray);
        //SKISS
        updateQueue();
        

        /* queueList.insertAdjacentHTML("beforeend", 
        `<div class="queue-item">
            <p>#${queueNum}</p>
            <p>${name}</p>
            <p>${count} personer</p>
        </div>
        `); */
    }
});

// TA BORT KÖ ITEMS
// items.forEach(item => {
//     item.addEventListener('click', (e) => {
//         //e.currentTarget.remove();
//         let itemNum = e.currentTarget.children[0].textContent.split('#')[1];
//         queueArray.splice(itemNum-1, itemNum-1);
//         console.log("TA BORT KNAPP");
//         console.log(queueArray);
//         updateQueue();
//     });
// });

function updateQueue() {
    // TA BORT ALLA ITEMS I DOMEN
    // (Kankse ska vara annorlunda syntax?)
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
        console.log(item);
    });

    // HÄMTA ALLA NYA ELEMENT FRÅN DOMEN
    items = document.querySelectorAll('.queue-item');

    // TILLDELA EVENTLYSSNARE TILL ALLA ITEMS I DOMEN    
    items.forEach(item => {
        item.addEventListener('click', (e) => {
            //e.currentTarget.remove();
            let itemNum = e.currentTarget.children[0].textContent.split('#')[1];
            queueArray.splice(itemNum - 1, 1);
            console.log("TA BORT KNAPP");
            console.log(queueArray);
            updateQueue();
        });
    }); //testa fall detta funkar, brb
}
let tables = document.querySelectorAll('.table');

tables.forEach(table => {
    table.addEventListener('click', (e) => {
        e.target.focus();
    });
});
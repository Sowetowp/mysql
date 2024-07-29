document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/getAll')
        .then(res => res.json())
        .then(data => loadHtmlTable(data["data"]))

})

const addBtn = document.querySelector("#add-name-btn")
addBtn.onclick = function () {
    const nameInput = document.querySelector("#nameInput")
    const name = nameInput.value
    nameInput.value = ""

    fetch('http://localhost:5000/insert', {
        headers: {
            "Content-type": 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ name: name })
    })
        .then(res => res.json())
        .then(data => insertRowIntoTable(data["data"]))
}

function insertRowIntoTable (data){

}

function loadHtmlTable(data) {
    const table = document.querySelector('table tbody')
    console.log(data)
    let tableHtml = ""
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>"
    }
    data.array.forEach();
}
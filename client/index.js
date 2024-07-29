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

function insertRowIntoTable(data) {
    const table = document.querySelector('table tbody')
    const isTableData = document.querySelector(".no-data")
    let tableHtml = "<tr>"
    for (var keys in data) {
        if (data.hasOwnProperty(keys)) {
            if (keys === "dateAdded") {
                data[keys] = new Date(data[keys].toLocaleString())
            }
            tableHtml += `<td>${data[keys]}</td>`
        }
    }
    tableHtml += `<td><button class='delete-row-btn' data-id=${id}>delete</button></td>`
    tableHtml += `<td><button class='edit-row-btn' data-id=${id}>edit</button></td>`
    
    // data.forEach(function ({ id, name, dateAdded }) {
    //     tableHtml += `<td>${id}</td>`
    //     tableHtml += `<td>${name}</td>`
    //     tableHtml += `<td>${new Date(dateAdded).toLocaleString()}</td>`
    //     tableHtml += `<td><button class='delete-row-btn' data-id=${id}>delete</button></td>`
    //     tableHtml += `<td><button class='edit-row-btn' data-id=${id}>edit</button></td>`
    // });
    tableHtml = "</tr>"
    if (isTableData) {
        table.innerHTML = tableHtml
    } else {
        const newRow = table.insertRow()
        newRow.innerHTML = tableHtml
    }
}

function loadHtmlTable(data) {
    const table = document.querySelector('table tbody')
    console.log(data)
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>"
        return
    }
    let tableHtml = ""
    data.forEach(function ({ id, name, date_added }) {
        tableHtml += "<tr>"
        tableHtml += `<td>${id}</td>`
        tableHtml += `<td>${name}</td>`
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`
        tableHtml += `<td><button class='delete-row-btn' data-id=${id}>delete</button></td>`
        tableHtml += `<td><button class='edit-row-btn' data-id=${id}>edit</button></td>`
    });
    table.innerHTML = tableHtml
}
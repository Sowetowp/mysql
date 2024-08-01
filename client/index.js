document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/getAll')
        .then(res => res.json())
        .then(data => loadHtmlTable(data["data"]))

})

document.querySelector("table tbody").addEventListener("click", function (event) {
    if (event.target.className === "delete-row-btn") {
        deleteRow(event.target.dataset.id)
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id)
    }
})

const updateBtn = document.querySelector("#update-row-btn")
const searchBtn = document.querySelector("#search-btn")

searchBtn.onclick = function () {
    const searchValue = document.querySelector("#search-input").value
    fetch('http://localhost:5000/search/' + searchValue)
        .then(res => res.json())
        .then(data => loadHtmlTable(data["data"]))
}

function deleteRow(id) {
    fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                location.reload()
            }
        })
}

function handleEditRow(id) {
    const updateSection = document.querySelector("#update-row")
    updateSection.hidden = false
    document.querySelector("#update-row-btn").dataset.id = id
}

updateBtn.onclick = function () {
    const updateNameInput = document.querySelector("#update-name-input")
    fetch('http://localhost:5000/update', {
        method: "PATCH",
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify({
            id: updateBtn.dataset.id,
            name: updateNameInput.value
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                location.reload()
            }
        })
}

const addBtn = document.querySelector("#add-name-btn")
addBtn.onclick = function (e) {
    e.preventDefault()
    const nameInput = document.querySelector("#nameInput")
    const secretInput = document.querySelector("#secretInput")
    const commentInput = document.querySelector("#commentInput")
    const name = nameInput.value
    const secret = secretInput.value = ""
    const comment = commentInput.value = ""
    commentInput.value = ""

    fetch('http://localhost:5000/insert', {
        headers: {
            "Content-type": 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ name: name, secret: secret, comment: comment })
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
                data[keys] = new Date(data[keys]).toLocaleString()
            }
            tableHtml += `<td>${data[keys]}</td>`
        }
    }
    tableHtml += `<td><button class='delete-row-btn' data-id=${data.id}>delete</button></td>`
    tableHtml += `<td><button class='edit-row-btn' data-id=${data.id}>edit</button></td>`
    tableHtml += "</tr>"

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
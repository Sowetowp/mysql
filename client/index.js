document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/getAll')
        .then(res => res.json())
        .then(data => loadHtmlTable(data["data"]))

})

document.querySelector("table tbody").addEventListener("click", function (event) {
    if (event.target.classList && event.target.classList.contains("delete-row-btn")) {
        deleteRow(event.target.dataset.id)
    }
    if (event.target.classList && event.target.classList.contains("edit-row-btn")) {
        handleEditRow(event.target.dataset)
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
    updateSection.classList.add("flex")
    document.querySelector("#update-row-btn").dataset.id = id.id
    document.querySelector("#update-row-btn").dataset.name = id.name
    document.querySelector("#update-row-btn").dataset.comment = id.comment
    const updateNameInput = document.querySelector("#update-name-input")
    const updateCommentInput = document.querySelector("#update-comment-input")
    updateCommentInput.value = updateBtn.dataset.comment;
    updateNameInput.value = updateBtn.dataset.name;
}

updateBtn.onclick = function () {
    const updateNameInput = document.querySelector("#update-name-input")
    const updateCommentInput = document.querySelector("#update-comment-input")
    
    if (updateNameInput.value.trim() === "" || updateCommentInput.value.trim() === "") {
        return alert("Kindly fill all fields")
    }

    fetch('http://localhost:5000/update', {
        method: "PATCH",
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify({
            id: updateBtn.dataset.id,
            name: updateNameInput.value.trim(),
            comment: updateCommentInput.value.trim()
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
addBtn.onclick = function () {
    const nameInput = document.querySelector("#nameInput")
    const secretInput = document.querySelector("#secretInput")
    const commentInput = document.querySelector("#commentInput")

    const name = nameInput.value.trim();
    const secret = secretInput.value.trim();
    const comment = commentInput.value.trim();
    if (name === "" || secret === "" || comment === "") {
        return alert("Kindly fill all fields")
    }
    nameInput.value = "";
    secretInput.value = "";
    commentInput.value = "";

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

    let tableHtml = `<tr class="border-b">`
    tableHtml += `<td class="py-3 px-3 text-xs text-gray-300 text-center">${data.name}</td>`
    tableHtml += `<td class="py-3 px-3 text-xs text-white text-center">${data.comment}</td>`
    tableHtml += `<td class="py-3 px-3 text-xs text-gray-300 text-center">${new Date(data.dateAdded).toLocaleString()}</td>`

    tableHtml += `
        <td class="py-3 edit-row-btn px-3 text-xs">
            <button data-id=${data.id} data-name=${data.name} data-comment=${data.comment}>
                <svg class="w-3 fill-green-300 m-auto" viewBox="0 0 512 512">
                    <path
                        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
                    </path>
                </svg>
            </button>
        </td>
    `
    tableHtml += `
        <td data-id=${data.id} class="py-3 delete-row-btn px-3 text-xs">
            <svg viewBox="0 0 448 512" class="w-3 m-auto fill-red-400">
                <path
                    d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z">
                </path>
            </svg>
        </td>
    `
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
    data.forEach(function ({ id, name, date_added, comment }) {
        tableHtml += `<tr class="border-b">`
        tableHtml += `<td class="py-3 px-3 text-xs text-gray-300 text-center">${name}</td>`
        tableHtml += `<td class="py-3 px-3 text-xs text-white text-center">${comment}</td>`
        tableHtml += `<td class="py-3 px-3 text-xs text-gray-300 text-center">${new Date(date_added).toLocaleString()}</td>`
        tableHtml += `
            <td class="py-3 edit-row-btn px-3 text-xs" data-id=${id} data-name=${name} data-comment=${comment}>
                <svg class="w-3 fill-green-300 m-auto" viewBox="0 0 512 512">
                    <path
                        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
                    </path>
                </svg>
            </td>
        `
        tableHtml += `
            <td data-id=${id} class="py-3 delete-row-btn px-3 text-xs">
                <svg viewBox="0 0 448 512" class="w-3 m-auto fill-red-400">
                    <path
                        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z">
                    </path>
                </svg>
            </td>
        `
        tableHtml += "</tr>"
    });
    table.innerHTML = tableHtml
}
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/getAll')
        .then(res => res.json())
        .then(data => loadHtmlTable(data["data"]))
    
})

const addBtn = document.querySelector("#add-name-btn")
function loadHtmlTable(data) {
    const table = document.querySelector('table tbody')
    console.log(data)
    let tableHtml = ""
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>"
    }
}
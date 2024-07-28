document.addEventListener('DOMContentLoaded', () => {
    loadHtmlTable([])
})
function loadHtmlTable(data) {
    const table = document.querySelector('table tbody')
    let tableHtml = ""
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>"
    }
}<iframe width="633" height="351" src="https://www.youtube.com/embed/vrj9AohVhPA" title="Node.js, Express &amp; MySQL Tutorial - Build a Simple FullStack App" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
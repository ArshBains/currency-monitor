$(".search-input input").keyup(filterResults);

function filterResults() {
  var span, name;
  let searchterm = $(".search-input input").val().toUpperCase();
  //   console.log(searchterm);
  let rows = document.querySelectorAll("tbody tr");
  for (i = 0; i < rows.length; i++) {
    span = rows[i].querySelector("td span");
    name = span.textContent;
    if (name.toUpperCase().indexOf(searchterm) > -1) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}
// download button
$("#download-button").click(downloadContentCSV);
function downloadContentCSV() {
  var data = [];
  let rows = document.querySelectorAll("tbody tr");
  rows.forEach(function (row) {
    let td = [...row.querySelectorAll("td")];
    data.push(td.map((td) => td.innerText));
  });
  // console.log(data);
  var csv = "Currency,Symbol,Type,Rate(USD)\n";
  data.forEach(function (row) {
    csv += row.join(",");
    csv += "\n";
  });
  // console.log(csv);
  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
  hiddenElement.target = "_blank";
  hiddenElement.download = `${new Date()
    .toJSON()
    .slice(0, 10)
    .replace(/-/g, "/")}_USDrates.csv`;
  hiddenElement.click();
}

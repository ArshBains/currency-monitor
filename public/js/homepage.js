// progressbar
let percentwidth = 0;
setInterval(function () {
  if (percentwidth > 100) {
    location.reload();
  }
  percentwidth = percentwidth + 0.334;
  $(".refresh-slider .progress-bar").css("width", percentwidth + "%");
}, 1000);

// searchbar
$(".search-input input").keyup(filterResults);
// onload/refresh previous search term
if (localStorage.getItem("searchterm")) {
  $(".search-input input").val(localStorage.getItem("searchterm"));
  filterResults();
}
function filterResults() {
  var span, name;
  let searchterm = $(".search-input input").val();
  localStorage.setItem("searchterm", searchterm);
  searchterm = searchterm.toUpperCase();
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
// refresh button
$("#refresh-button").click(() => location.reload());
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
  var csv =
    "Rank,Name,Symbol,Market Cap(USD),Price(USD),Supply,Vol(24h),%(24h)\n";
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
    .replace(/-/g, "/")}_crypto.csv`;
  hiddenElement.click();
}

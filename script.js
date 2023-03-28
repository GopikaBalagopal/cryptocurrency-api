var cripto = "https://api.coinranking.com/v2/coins"

var criptocurrency = []

const pageSize = 10;
let currentpage = 1;

async function getData() {
    const response = await fetch(cripto)
    const coins = await response.json()
    criptocurrency = coins.data.coins
  }

async function coindetails(page = 1) {
  await getData()

  var tabledata = "";
  criptocurrency.filter((row, index) => {
    let start = (currentpage - 1) * pageSize;
    let end = currentpage * pageSize;
    if (index >= start && index < end) return true;
  }).forEach(values => {
    
    tabledata += "<tr>";
    
    tabledata += `<td> ${values.name}</td>`;
    tabledata += `<td> ${values.symbol} </td>`;
    tabledata += `<td> ${values.rank}</td>`;
    tabledata += `<td> ${values.tier}</td>`;
    tabledata += `<td> $${Math.round(values.price)}</td>`;
     "</tr>";
  });
  document.getElementById("coin").innerHTML = tabledata;
}
coindetails()

function previousPage() {
  if (currentpage > 1) {
    currentpage--;
    coindetails(currentpage);
  }
}

function nextPage() {
  if ((currentpage * pageSize) < criptocurrency.length) {
    currentpage++;
    coindetails(currentpage);
  }
}


document.querySelector('#nextButton').addEventListener('click', nextPage);
document.querySelector('#previousButton').addEventListener('click', previousPage);


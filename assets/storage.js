const CACHE_KEY = "calculating_history";

function checkForStorage() {
    return typeof(Storage) !== "undefined";
}

function putHistory(data) {
    if(checkForStorage()) {
        let HistoryData = null;
        if(localStorage.getItem(CACHE_KEY) === null) {
            HistoryData = [];
        }
        else {
            HistoryData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        HistoryData.unshift(data);

        if(HistoryData.length > 5) {
            HistoryData.pop();
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(HistoryData));
    }
}

function showHistory() {
    if(checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    }
    else {
        return [];
    }
}

function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#history-list");

    // selalu hapus konten html pada elemen historyList aga tidak menampilkan data ganda
    historyList.innerHTML = "";

    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        historyList.appendChild(row);
    }
}

renderHistory();
document.addEventListener("DOMContentLoaded", function() {
    let coinBalance = localStorage.getItem("coins") || 0;
    document.getElementById("coinBalance").innerText = coinBalance;

    document.getElementById("earnCoin").addEventListener("click", function() {
        coinBalance = parseInt(coinBalance) + 10;
        localStorage.setItem("coins", coinBalance);
        document.getElementById("coinBalance").innerText = coinBalance;
    });
});

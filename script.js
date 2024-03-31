const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

for(select of dropdowns){
    for(code in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = code;
        newoption.value = code;
        if(select.name === "from" && code === "USD"){
            newoption.selected = "selected";
        }
        if(select.name === "to" && code === "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener('click', async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountVal = parseFloat(amount.value); // Convert input value to a float
    if(amountVal === "" || amountVal < 1){
        amountVal = 1;
        amount.value = "1";
    }
    let fromCurr = document.querySelector(".from select").value;
    let toCurr = document.querySelector(".to select").value;
    let response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    let data = await response.json();
    let val1, val2;

    for(let code in data.rates){
        if(code === fromCurr){
            val1 = data.rates[code];
        }
    }
    for(let code in data.rates){
        if(code === toCurr){
            val2 = data.rates[code];
        }
    }

    let finalAmount = (amountVal / val1) * val2; // Perform the calculation
    document.querySelector(".msg").innerText = `${amountVal}${fromCurr} = ${finalAmount}${toCurr}`;
});







let dropdown = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button")
let from = document.querySelector(".from select");
let to = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for (select of dropdown) {
    for ( currCode in countryList ) {
        let newOptions = document.createElement("option");
        newOptions.innerText = currCode;
        newOptions.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOptions.selected="selected";
        }else if (select.name=== "to" && currCode === "INR"){
            newOptions.selected="selected";
        }
        select.append(newOptions);
    }
        document.addEventListener("change",(event)=>{
            changeFlag(event.target)
        });
        }

    function changeFlag(element) {
        let currCode = element.value;
        let countryCode = countryList[currCode];
        let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newSrc;
    }

    async function updateExchangeRate(){
        let amount=document.querySelector(".amount input");
        let amtVal=amount.value;
        if(amtVal=="" || amtVal<1){
            amtVal=1;
            amount.value;
        }
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.value.toLowerCase()}.json`;

    try {
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[from.value.toLowerCase()][to.value.toLowerCase()];
    console.log(rate);
    let finalAmount = (amtVal * rate).toFixed(2);

    msg.innerText = `${amtVal} ${from.value} = ${finalAmount} ${to.value}`;
    } catch (err) {
    msg.innerText = "Error fetching currency data.";
    console.error(err);
    }
}


    btn.addEventListener("click", async (evt)=>{       ///  (event) is event when a button is clicked
        evt.preventDefault();
        updateExchangeRate();
    } );

    window.addEventListener("load",()=>{
        updateExchangeRate();
    });
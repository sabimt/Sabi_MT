const BASE_URL = "https://api.currencyapi.com/v3/latest";
const API_KEY = "fca_live_RHmWjzvmp5TlfCEtoG3kZQo4TEQME1TvBjPR8JqP";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdown){
    for(currencyCode in countryList){
        //create option element
        let newOption= document.createElement("option")
        newOption.innerText= currencyCode;
        newOption.value= currencyCode;
        if(select.name==="from" && currencyCode==="INR"){
            newOption.selected="selected";
        } else if(select.name==="to" && currencyCode==="NPR"){
            newOption.selected="selected";//selected into lowerCase
        } select.append(newOption);

    } select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}
const updateExchangeRate = async() =>{
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval==="" || amtval<1){
        amtval= 1;
        amount.value = "1";
    }
    const URL = 
    `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`;

    //const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    //console.log(response);
    let data = await response.json();
    //console.log(data);

    let rate = data.data[toCurr.value]?.value;
    //console.log(rate);
    let finalAmount = amtval * rate;
    msg.innerHTML = `${amtval} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`;
};

const updateFlag=(element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load" ,()=>{
    updateExchangeRate();
});
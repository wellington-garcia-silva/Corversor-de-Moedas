const form  = document.getElementById("converterForm")
const amount = document.getElementById("amount")
const fromCurrency = document.getElementById("fromCurrency")
const toCurrency = document.getElementById("toCurrency")
const convertedAmount = document.getElementById("convertedAmount")
const loading = document.querySelector(".loading")
const error = document.querySelector(".error")

const API_URL = "https://api.exchangerate-api.com/v4/latest/"

async function convertMoney(){

    loading.style.display("block")
    try{
        const response = await fetch(API_URL + fromCurrency.value)
        const data = await response.json()

        const rate = data.rates[toCurrency.value]
        const convertedRate = (amount.value * rate).toFixed(2)
    }
    catch(error){
        alert("Falha no servidor")
    }
}


form.addEventListener("submit", function(event){
    event.preventDefault()
    convertMoney
})
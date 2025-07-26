const form  = document.getElementById("converterForm")
const amount = document.getElementById("amount")
const fromCurrency = document.getElementById("fromCurrency")
const toCurrency = document.getElementById("toCurrency")
const convertedAmount = document.getElementById("convertedAmount")
const result = document.querySelector(".result")
const loading = document.querySelector(".loading")
const error = document.querySelector(".error")

const API_URL = "https://v6.exchangerate-api.com/v6/2e9dc49e1f402578fe3aded6/latest/"

async function convertMoney(){

    loading.style.display = "block"
    error.style.display = "none"
    result.style.display = "none"

    try{
        const response = await fetch(API_URL + fromCurrency.value)
        const data = await response.json()

        const rate = data.conversion_rates[toCurrency.value]
        
        if (!rate) throw new Error("Moeda de destino inválida")

        const convertedValue = (amount.value * rate).toFixed(2)

        convertedAmount.value = convertedValue
        result.style.display = "block"
        
        result.innerHTML = `
            <div style="font-size: 1.4rem">
                ${amount.value} ${fromCurrency.value} = ${convertedAmount.value} ${toCurrency.value}
            </div>
            <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 10px">
                Taxa: 1 ${fromCurrency.value} = ${rate} ${toCurrency.value}
            </div>
        `

    }
    catch(err){
        console.error(err)
        error.style.display = "block"
        error.innerHTML = `Falha ao conveter moeda! Tente novamente`
    }

    loading.style.display = "none"
}


form.addEventListener("submit", function(event){
    event.preventDefault()
    convertMoney()
})
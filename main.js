const customOption = document.querySelectorAll(".custom-option");
const dropdownDiv = document.querySelectorAll(".dropdown-div");
const customSelectAll = document.querySelectorAll('.custom-select');
const triggerAll = document.querySelectorAll('.custom-select__trigger');
const surveyCalcBtn = document.querySelector(".surveyCalc");
const surveyCost = document.querySelector("#surveyCost")
const stockVolumeCount = document.querySelector(".sku_input");
const skuCost = document.querySelector("#skuCost");
const skuTime = document.querySelector(".skuTimeline")

const baseSurveyPrice = 2500;
let surveyPriceList = {
l_mainland: 500,
ikorodu: 1500,
festac: 2000,
lekki: 1000, 
ikoyi: 1500,
ajah: 2500
}
let lgaName;


for (const dropdown of dropdownDiv ) {
    dropdown.addEventListener('click', function() {
    this.querySelector('.custom-select').classList.toggle('open');
    this.querySelector('.custom-select__trigger').classList.toggle('borderRadius');
    })
}

for (const option of customOption) {
    option.addEventListener('click', function() {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.custom-select').querySelector('.custom-select__trigger .show').textContent = this.textContent;
        }
    })
    surveyCalcBtn.addEventListener("click", () => {
        if (option.classList.contains("selected") && option.classList.contains("lgaOption")) {
            lgaName = option.dataset.value
            surveyCost.textContent = baseSurveyPrice;
            // console.log(surveyPriceList.lgaName)
        }
        if (option.classList.contains("selected") && option.classList.contains("sta")) {
            let sta = parseInt(option.dataset.value);
            console.log(stockVolumeCount)
            let svu = parseInt(stockVolumeCount.value);
            let costPerDay = sta * 3000;
            let noOfDays = svu/(50*sta);
            totalCost = costPerDay * noOfDays;
            console.log(totalCost);
            skuCost.textContent = totalCost;
            skuTime.textContent = noOfDays;
        }
    })
}
addEventListener('click', function(e) {
    for (const select of customSelectAll) {
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    }
    for (const select of triggerAll) {
        if (!select.contains(e.target)) {
            select.classList.remove('borderRadius');
        }
    }
});
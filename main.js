const customOption = document.querySelectorAll(".custom-option");
const dropdownDiv = document.querySelectorAll(".dropdown-div");
const customSelectAll = document.querySelectorAll('.custom-select');
const triggerAll = document.querySelectorAll('.custom-select__trigger');
const stockCalcBtn = document.querySelector(".stockCalc");
const surveyCost = document.querySelector("#surveyCost")
const stockVolumeCount = document.querySelector(".sku_input");
const totalSkuCost = document.querySelector("#skuCost");
const skuTimeline = document.querySelector(".skuTimeline");
const newStockStore = document.querySelector(".newStockStore");

const skuCost = document.querySelector(".stockCost");
const stockDayHigh = document.querySelector("#stockDayHigh");
const stockDayLow = document.querySelector("#stockDayLow");
const storeNameHr = document.querySelector(".target_hr");
const newStoreName = document.querySelector(".newStoreName");
const containerDiv = document.querySelector(".container");

const cost_title = document.querySelector(".cost_title");

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
let nairaFormat = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
});
const storeChecker = [];
document.addEventListener('click',function(e){
    if (e.target.classList[0] === "custom-select__trigger") {
        e.target.parentNode.classList.toggle('open');
        e.target.classList.toggle('borderRadius');
    }
    if(e.target.classList[0] === "custom-option") {
        let customOptionSingle = e.target;
        if (!customOptionSingle.classList.parentNode) {
            customOptionSingle.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            customOptionSingle.classList.add('selected');
            customOptionSingle.closest('.custom-select').querySelector('.custom-select__trigger .show').textContent = customOptionSingle.textContent;
        }
        
    }
    if (e.target.classList[0] === "stockCalc") {
        let skuTimeHigh = [];
        let skuTimeLow = [];
            let parentDiv = e.target.parentNode.parentNode.parentNode;
            let parentResultDiv = e.target.parentNode;
            let stockVolCount = parseInt(parentDiv.children[3].children[1].value);
            let stockTakingAgents = parseInt(parentDiv.children[4].children[1].children[0].children[1].querySelector('.custom-option.selected').dataset.value);
            let costPerDay = stockTakingAgents * 3000;
            let noOfDays = stockVolCount/(50*stockTakingAgents);
            let singleCost = costPerDay * noOfDays;
            parentResultDiv.children[1].textContent = nairaFormat.format(singleCost);
            parentResultDiv.children[2].children[1].textContent = Math.ceil(noOfDays);
            parentResultDiv.children[2].children[0].textContent = Math.floor(noOfDays);
            
            
            if (cost_title.children.length ==0) {
                cost_title.insertAdjacentHTML("beforeend", `<span class = "costSpanMargin" id="costOF${parentDiv.children[0].id}" data-value="${singleCost}" data-timeLow ="${Math.floor(noOfDays)}" data-timeHigh="${Math.ceil(noOfDays)}"> ${parentDiv.children[0].value}: ${parentResultDiv.children[1].textContent}; </span>`)
                // skuTimeLow.push(Math.floor(noOfDays))
                // skuTimeHigh.push(Math.ceil(noOfDays))
            } else {
            console.log()
            for(const store of cost_title.children) {
                // console.dir( cost_title.children[0].dataset)
                if (store.id === `costOF${parentDiv.children[0].id}`) {
                    cost_title.querySelector(`#costOF${parentDiv.children[0].id}`).textContent = ` ${parentDiv.children[0].value}: ${parentResultDiv.children[1].textContent};`
                    cost_title.querySelector(`#costOF${parentDiv.children[0].id}`).dataset.value = singleCost;
                    cost_title.querySelector(`#costOF${parentDiv.children[0].id}`).dataset.timelow = Math.floor(noOfDays);
                    cost_title.querySelector(`#costOF${parentDiv.children[0].id}`).dataset.timehigh = Math.ceil(noOfDays);
                    console.log("red");
                } else if (store.id !== `costOF${parentDiv.children[0].id}` && !Array.from(cost_title.children).includes(document.querySelector(`#costOF${parentDiv.children[0].id}`))){
                    cost_title.insertAdjacentHTML("beforeend", `<span class = "costSpanMargin" id="costOF${parentDiv.children[0].id}" data-value="${singleCost}" data-timeLow ="${Math.floor(noOfDays)}" data-timeHigh="${Math.ceil(noOfDays)}"> ${parentDiv.children[0].value}: ${parentResultDiv.children[1].textContent};</span>`)
                    console.log("blue");
                }              
                
            };
            }
            let totalCost = 0;
            for (let i = 0; i < cost_title.children.length; i++) {
                skuTimeLow.push(parseInt(cost_title.children[i].dataset.timelow))
                skuTimeHigh.push(parseInt(cost_title.children[i].dataset.timehigh)) 
                totalCost+=parseInt(cost_title.children[i].dataset.value);
            }
            console.log(cost_title.children);
            totalSkuCost.textContent = nairaFormat.format(totalCost) + " *";
            
            
            skuTimeline.children[0].textContent = Math.min(...skuTimeLow)
            skuTimeline.children[1].textContent = Math.max(...skuTimeHigh)
    }

    if (e.target.classList[0] === "surveyCalc") {
        let singleCost = 2500;
        let parentDiv = e.target.parentNode.parentNode.parentNode;
        let parentResultDiv = e.target.parentNode;
        parentResultDiv.children[1].textContent = nairaFormat.format(singleCost);
        if (cost_title.children.length ==0) {
            cost_title.insertAdjacentHTML("beforeend", `<span class = "costSpanMargin" id="costOF${parentDiv.children[0].id}" data-value="${singleCost}"> ${parentDiv.children[0].value}: ${parentResultDiv.children[1].textContent};</span>`)
        } else {
        for(const store of cost_title.children) {
            // console.dir( cost_title.children[0].dataset)
            if (store.id === `costOF${parentDiv.children[0].id}`) {
                cost_title.querySelector(`#costOF${parentDiv.children[0].id}`).textContent = `${parentDiv.children[0].value}: ${parentResultDiv.children[1].textContent};`
                cost_title.querySelector(`#costOF${parentDiv.children[0].id}`).dataset.value = singleCost;
                console.log("red");
            } else if (store.id !== `costOF${parentDiv.children[0].id}` && !Array.from(cost_title.children).includes(document.querySelector(`#costOF${parentDiv.children[0].id}`))){
                cost_title.insertAdjacentHTML("beforeend", `<span class = "costSpanMargin" id="costOF${parentDiv.children[0].id}" data-value="${singleCost}" > ${parentDiv.children[0].value}: ${parentResultDiv.children[1].textContent};</span>`)
                console.log("blue");
            }              
            
        };
        }
        let totalCost = 0;
        for (let i = 0; i < cost_title.children.length; i++) {
            totalCost+=parseInt(cost_title.children[i].dataset.value);
        }
        console.log(cost_title.children);
        surveyCost.textContent = nairaFormat.format(totalCost) + " *";
        
    }


 });

// for (const dropdown of dropdownDiv ) {
//     dropdown.addEventListener('click', function(e) {
//     console.log("lol");
//     this.querySelector('.custom-select').classList.toggle('open');
//     this.querySelector('.custom-select__trigger').classList.toggle('borderRadius');
//     })
// }

for (const option of customOption) {
    // option.addEventListener('click', function() {
    //     if (!this.classList.contains('selected')) {
    //         this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
    //         this.classList.add('selected');
    //         this.closest('.custom-select').querySelector('.custom-select__trigger .show').textContent = this.textContent;
    //     }
    // })
    // stockCalcBtn.addEventListener("click", () => {
    //     if (option.classList.contains("selected") && option.classList.contains("sta")) {
    //         let sta = parseInt(option.dataset.value);
    //         console.log(stockVolumeCount)
    //         let svu = parseInt(stockVolumeCount.value);
    //         let costPerDay = sta * 3000;
    //         let noOfDays = svu/(50*sta);
    //         singleCost = costPerDay * noOfDays;
    //         console.log(singleCost);
    //         skuCost.textContent = nairaFormat.format(singleCost);
    //         stockDayHigh.textContent = Math.ceil(noOfDays);
    //         stockDayLow.textContent = Math.floor(noOfDays)
    //     }
    // })
}

let storeNameNum = 0;
let newStore;
newStockStore.addEventListener("click", () => {
    storeNameNum++;
    if (newStockStore.classList.contains("surveyStore")) {
        newStore = ` <hr>
        <div class="surveyContainer">
        <input type="text" name="store_name" placeholder="Store Name" class="store-name" id="store_${storeNameNum}" value = "${newStoreName.value}">
        <div class="state_lga">
            <p>State</p>
            <div class="dropdown-div">
                <div class="custom-select">
                    <div class="custom-select__trigger">
                        <span class="custom-arrow"></span>
                        <span class="show">Lagos</span>
                    </div>
                    <div id="stateDropdown" class="custom-options">
                        <span class="custom-option selected" data-value="lagos">Lagos</span>
                        <span class="custom-option" data-value="ogun">Ogun</span>
                        <span class="custom-option" data-value="abuja">Abuja</span>
                        <span class="custom-option" data-value="osun">Osun</span>
                    </div>  
                </div>
                
            </div>
        </div>
        <div class="state_lga">
            <p>Local Government Area</p>
            <div class="dropdown-div">
                <div class="custom-select">
                    <div class="custom-select__trigger">
                        <span class="custom-arrow"></span>
                        <span class="show">Oshodi/Isolo</span>
                    </div>
                    <div id="stateDropdown" class="custom-options">
                        <span class="custom-option lgaOption selected" data-value="Oshodi">Oshodi/Isolo</span>
                        <span class="custom-option lgaOption" data-value="ikorodu">Ikorodu</span>
                        <span class="custom-option lgaOption" data-value="l_island">Lagos island</span>
                        <span class="custom-option lgaOption" data-value="l_mainland">Lagos mainland</span>
                        <span class="custom-option lgaOption" data-value="ajah">Ajah</span>
                        <span class="custom-option lgaOption" data-value="lekki">Lekki</span>
                        <span class="custom-option lgaOption" data-value="festac">Festac</span>
                    </div>  
                </div>
                
            </div>
        </div>
        <div class="buttonDiv">
            <div class="calcDiv">
                <button class="surveyCalc">Calculate</button>
                <span>price</span>
            </div>
        </div>
        </div>`
    }
    else {
        newStore = `<hr>
        <div class="storeContainer">
        <input type="text" name="store_name" placeholder="Store Name" class="store-name" id="store_${storeNameNum}" value = "${newStoreName.value}">
        <div class="state_lga">
            <p>State</p>
            <div class="dropdown-div">
                <div class="custom-select">
                    <div class="custom-select__trigger">
                        <span class="custom-arrow"></span>
                        <span class="show">Lagos</span>
                    </div>
                    <div id="stateDropdown" class="custom-options">
                        <span class="custom-option selected" data-value="lagos">Lagos</span>
                        <span class="custom-option" data-value="ogun">Ogun</span>
                        <span class="custom-option" data-value="abuja">Abuja</span>
                        <span class="custom-option" data-value="osun">Osun</span>
                    </div>  
                </div>
                
            </div>
        </div>
        <div class="state_lga">
            <p>Local Government Area</p>
            <div class="dropdown-div">
                <div class="custom-select">
                    <div class="custom-select__trigger">
                        <span class="custom-arrow"></span>
                        <span class="show">Oshodi/Isolo</span>
                    </div>
                    <div id="stateDropdown" class="custom-options">
                        <span class="custom-option lgaOption selected" data-value="Oshodi">Oshodi/Isolo</span>
                        <span class="custom-option lgaOption" data-value="ikorodu">Ikorodu</span>
                        <span class="custom-option lgaOption" data-value="l_island">Lagos island</span>
                        <span class="custom-option lgaOption" data-value="l_mainland">Lagos mainland</span>
                        <span class="custom-option lgaOption" data-value="ajah">Ajah</span>
                        <span class="custom-option lgaOption" data-value="lekki">Lekki</span>
                        <span class="custom-option lgaOption" data-value="festac">Festac</span>
                    </div>  
                </div>
                
            </div>
        </div>
        <div class="state_lga">
            <p>Stock volume count</p>
            <input type="number" class="sku_input">
        </div>
        <div class="state_lga">
            <p>Stock taking agents</p>
            <div class="dropdown-div">
                <div class="custom-select">
                    <div class="custom-select__trigger">
                        <span class="custom-arrow"></span>
                        <span class="show">1</span>
                    </div>
                    <div class="custom-options">
                        <span class="custom-option selected sta" data-value="1"></span>
                        <span class="custom-option sta" data-value="2">2</span>
                        <span class="custom-option sta" data-value="3">3</span>
                        <span class="custom-option sta" data-value="4">4</span>
                        <span class="custom-option sta" data-value="5">5</span>
                        <span class="custom-option sta" data-value="6">6</span>
                        <span class="custom-option sta" data-value="7">7</span>
                    </div>  
                </div>
                
            </div>
        </div>
        <div class="buttonDiv">
            <div class="calcDiv">
                <button class="stockCalc">Calculate</button>
                <span class="stockCost">price</span>
                <p> <b class="stockDay" id="stockDayLow">5</b> to <b class="stockDay" id="stockDayHigh">7</b><em> Days**</em></p>
            </div>
        </div>
        </div>`
    }
    newStoreName.value = "";
    storeNameHr.insertAdjacentHTML('beforebegin', newStore);
    
})

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
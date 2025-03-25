const currOption=document.querySelectorAll('select');

if (typeof countryCurrency !== 'undefined') {
    currOption.forEach((get, con) => {
        for (let currencyCode of Object.values(countryCurrency)) {
            let selected = '';
            if (con === 0 && currencyCode === "USD") {
                selected = 'selected';
            } else if (con === 1 && currencyCode === "INR") {
                selected = 'selected';
            }
            let option = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`;
            get.insertAdjacentHTML('beforeend', option);
        }
    });
}


document.querySelector('.transfer').addEventListener('click',()=>{
    [currOption[0].value,currOption[1].value]=[currOption[1].value,currOption[0].value];


});


const fetchApi=async()=>{
   const apiKey=`1eeccfb59edc61c8c944107e`;
   const url=`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
   try {
    const response= await fetch(url);
    if(!response.ok)
    {console.log("Unable to fetch api....");}
    const data= await response.json();
    console.log(data);
    
   } catch (error) {
    console.error('Error in fetching api',error);
   }
}
// fetchApi();

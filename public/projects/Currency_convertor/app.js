const apiKey=`1eeccfb59edc61c8c944107e`;
const url=`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;


fetch(url)
.then((response)=>
{return response.json()})
.then((data)=>{
    console.log(data);
})
.catch(error=>console.error("Unable to Fetch api...",error))
let btn1=document.getElementById("btn1");
        let btn2=document.getElementById("btn2");
        let copyDiv=document.querySelector('.bg');
        let rgb1="#24f3de";
        let rgb2="#53a9fe";
        
        const hexValues=()=>{
            let hexValue="0123456789abcdef";
            let colors="#"        
            for(let i=0;i<6;i++){
               colors=colors + hexValue[Math.floor(Math.random()*16)];
            }
            return colors;
        };

        const handleButton1=()=>{
            rgb1=hexValues();
            btn1.innerText=rgb1;
            btn1.style.background=rgb1;
            document.body.style.backgroundImage=`linear-gradient(to right, ${rgb1},${rgb2})`;
            copyDiv.innerHTML=`background-image: linear-gradient(to right, ${rgb1},${rgb2})`;
        }
        const handleButton2=()=>{
            rgb2=hexValues();
            btn2.innerText=rgb2;
            btn2.style.background=rgb2;
            document.body.style.backgroundImage=`linear-gradient(to right, ${rgb1},${rgb2})`;
            copyDiv.innerHTML=`background-image: linear-gradient(to right, ${rgb1},${rgb2})`;
        }
       


        btn1.addEventListener('click',handleButton1);
        btn2.addEventListener('click',handleButton2);
        
        copyDiv.addEventListener('click',()=>{
            navigator.clipboard.writeText(copyDiv.innerText);
            alert(`background-image: linear-gradient(to right, ${rgb1},${rgb2})\n copied`);

        })
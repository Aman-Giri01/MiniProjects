const img=document.querySelector('.img');
const followers=document.querySelector('#followers');
const follows=document.querySelector('#follows');
const repo_details=document.querySelector('.repo_details');
const btn=document.querySelector('#btn');
const login=document.querySelector('#name');

let user_name='';
document.getElementById("formdata").addEventListener('submit',(event)=>{
    event.preventDefault();
    const formdata= new FormData(event.target);
    input=formdata.get('username').trim();
    if (input.length<=0)
    {
        alert("please Enter username");
        
        return;

    }
    else{
        user_name=input.split("").join("");
        fetchUser();
    }
});

const fetchUser=()=>{

    fetch(`https://api.github.com/users/${user_name}`)
    .then((res)=>{
        return res.json()})
    .then((data)=>{
        if(data.message==="Not Found"){
            return false;
        }else
        {
            img.innerHTML=`<img src="${data.avatar_url}">`;
            login.innerHTML=data.login;
            followers.innerHTML=data.followers;
            follows.innerHTML=data.following;
        }
    }).catch(error => console.error("Error fetching data:", error));;

    fetch(`https://api.github.com/users/${user_name}/repos`)
    .then((res)=>{
        return res.json()})
    .then((repo_data)=>{
        if(repo_data.length<=0)
        {
            repo_details.innerHTML=`
             <div class="item">
                        <div class="repo_name">Aman</div>
             </div>                    `
        }
        else{
            if(repo_data.message==="Not Found")
            {
                repo_details.innerHTML=`
                <div class="item">
                    <div class="repo_name">Not Found</div>
                        <div class="repo_detail">
                            <div class="info_stars">
                                <i class="fa fa-star"></i> 0
                            </div>
                            <div class="info_fork">
                                <p><i class="fa fa-code-fork"></i> 0</p>
                            </div>
                            <div class="info_size">
                            <p><i class="fa fa-file"></i> 0</p>
                            </div>  
                        </div>
                    </div>
                </div>
                `
                img.innerHTML=`<img src="/image/notFound.jpg">`;
                login.innerHTML=`Not Found`;
                followers.innerHTML=`0`;
                follows.innerHTML= `0`;
            }
            else{
                let repo_Data=repo_data.map(item=>{
                    return(
                        `<div class="item">
                            <div class="repo_name">${item.name}</div>
                                <div class="repo_detail">
                                    <div class="info_stars">
                                        <i class="fa fa-star"></i> ${item.watchers}
                                    </div>
                                    <div class="info_fork">
                                        <p><i class="fa fa-code-fork"></i> ${item.forks}</p>
                                    </div>
                                    <div class="info_size">
                                    <p><i class="fa fa-file"></i> ${item.size} kb</p>
                                    </div>  
                                </div>
                            </div>
                        </div>
                        `

                    );
                    


                });
                repo_details.innerHTML=repo_Data.slice(0,6).join("");
            }
        }
    
    });
}

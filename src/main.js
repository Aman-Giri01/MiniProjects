import projects from '../api/projects.json'
const projectContainer=document.querySelector('#projectContainer');
const template=document.querySelector('#template');



projects.forEach((prod)=>{

    const {name}=prod;

    const clone=document.importNode(template.content,true);
    clone.querySelector('.name').textContent=name;
    
    projectContainer.append(clone);

});
import projects from '../api/projects.json'
const projectContainer=document.querySelector('#projectContainer');
const template=document.querySelector('#template');



projects.forEach((prod)=>{

    const {name,description,image,link,sourcecode}=prod;

    const clone=document.importNode(template.content,true);
    clone.querySelector('.projectImage').src=image;
    clone.querySelector('.projectImage').alt=name;
    clone.querySelector('.name').textContent=name;
    clone.querySelector('.description').textContent=description;
    clone.querySelector('.visit-link').href=link; 
    clone.querySelector('.source-link').href=sourcecode; 
    
    projectContainer.append(clone);

});
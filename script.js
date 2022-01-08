const ul = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector("form");

let Links = JSON.parse(localStorage.getItem("links"))  || []



function read() {
    for( i of Links) {

        const {name, url} = i
        addElement({name, url})
        
    }
}

read()

function create(name, url) {

     
    Links.push({ name , url})

    addElement({name, url})

    localStorage.setItem("links", JSON.stringify(Links))
}

function urlRemove(url){
    Links = Links.filter(item => String(item.url) !== String(url))
    localStorage.setItem("links", JSON.stringify(Links))

    const li = document.getElementById(`${url}`)
    ul.removeChild(li)
}


function addElement({name, url}) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const trash = document.createElement('span');

    a.href = url;
    a.innerHTML = name;
    a.target = "_blank";

    li.id = `${url}`

    trash.innerHTML = 'x';
    trash.onclick = () => urlRemove(url);
    
    li.append(a);
    li.append(trash);
    ul.append(li);
}


form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input;

    

    if(!value)
        return alert('Preencha o campo');
    
    const [name, url ] = value.split(",")

    if(!url)
        return alert('formate o texto da maneira correta')

    if(!/^http/.test(url))
        return alert('Digite a url da maneira correta')

    create(name, url)
    input.value = ""
})
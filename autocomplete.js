const keywords = [
    "Array",
    "Vectors",
    "Binary Search",
    "Recursion",
    "Graph",
    "Tress",
    "Dynamic Programming" 
];

const resultBox = document.querySelector(".resultsBox");
const input_Box = document.getElementById("inputBox");

input_Box.addEventListener('input',handleTyping);

function handleTyping(event){
    let typedText = event.target.value;
    console.log(typedText); 
    let results = [];
    if(typedText.length){
        results = keywords.filter(str => str.toLowerCase().includes(typedText.toLowerCase()));
    }
    display(results);

    if(!results.length){
        resultBox.innerHTML = '';
    }
}

function display(results){
    const content = results.map((list) =>{
        return "<li onclick=selectItem(this)>" + list + "</li>"
    });
    resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectItem(listItem){
    input_Box.value = listItem.innerHTML;
    resultBox.innerHTML = '';
}


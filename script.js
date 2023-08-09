const MAX_SIZE = 800;
let gridSize = 16;
let boxSize = MAX_SIZE / gridSize;

function createGrid() {
    const gridElem = document.querySelector('.grid');

    for(let i = 0; i < gridSize; i++){

        let column = document.createElement('div');
        column.classList.add('column');
        gridElem.appendChild(column);

        for(let i = 0; i < gridSize; i++){
            let box = document.createElement('div');
            box.addEventListener('mouseover', () => mouseOverBox(box));
            box.style.width = `${boxSize}px`;
            box.style.height = `${boxSize}px`;
            column.appendChild(box);
        }
    }
}

function mouseOverBox(box) {

    // rainbow mode
    if(!box.style.backgroundColor)
    {
        box.style['background-color'] = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    }else{
        // darken here
        let boxColor = window.getComputedStyle(box).backgroundColor;
        const rgbValues = boxColor.match(/\d+/g).map(Number); // regex to match the int values in rgb(int, int, int)
        const darkenedRGB = rgbValues.map(value => Math.max(value - 20, 0)); // using a map to lower the rgb values by 20
        box.style['background-color'] = `rgb(${darkenedRGB[0]}, ${darkenedRGB[1]}, ${darkenedRGB[2]})`;
    }
}

// button logic
let buttonElem = document.querySelector('button');
buttonElem.onclick = () => resetGrid();

function resetGrid(){
    let size = prompt("How many pixels do you want the grid to be? (max 100)", "16");

    while(size > 100 || size < 1)
    {
        if(size == null) return;
        
        size = prompt("Oops, max size is 100 and min size is 1. How many pixels do you want the grid to be?", "16");
    }

    gridSize = size;
    boxSize = MAX_SIZE / gridSize;

    // delete existing dom elements
    let gridElemToDel = document.querySelector('.grid');
    while(gridElemToDel.firstElementChild) {
        gridElemToDel.firstElementChild.remove();
    }

    createGrid();
}

createGrid();






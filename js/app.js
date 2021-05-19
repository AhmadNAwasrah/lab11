'use strict';
let attempts = 0;
let maxAttempts = 25;
maxAttempts = parseInt(prompt('Enter number of views'));
let attemptsEl = document.getElementById('attempts');
let products = [];
let productsImageNames = [];
let goatsClicks = [];
let goatsViews = [];
let lastShownImages = [];
function BusMall(productName) {
    //'cruisin-goat.jpg'.split('.') >>['cruisin-goat','jpg']
    this.productName = productName.split('.')[0];
    this.source = 'images/' + productName;
    this.clicks = 0;
    this.views = 0;
    products.push(this);
    productsImageNames.push(this.productName);
}

// let goat1 = new GoatImage('cruisin-goat', 'images/cruisin-goat.jpg');
// let goat2 = new GoatImage('float-your-goat.jpg', 'images/float-your-goat.jpg');
function settingItems() {
    let data = JSON.stringify(products);
    let dataV = JSON.stringify(attempts);
    localStorage.setItem('clicks', data)
    localStorage.setItem('allAttempt', dataV)
}

function gettingItems() {
    let stringObj = localStorage.getItem('clicks');
    let normalObj = JSON.parse(stringObj);
    let stringObj2 = localStorage.getItem('allAttempt');
    let normalObj2 = JSON.parse(stringObj2);
    console.log(normalObj)
    console.log(normalObj2);
    if (normalObj !== null) {
        products = normalObj;

    }


}

let productsImage = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg'
    , 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg',
    'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

for (let i = 0; i < productsImage.length; i++) {
    new BusMall(productsImage[i]);
}

function generateImage() {
    //0-1 >> 0-7
    return Math.floor(Math.random() * products.length);
}
// console.log(goats);
// generateImage();

let lImgEl = document.getElementById('leftImg');

let rImgEl = document.getElementById('rightImg');
let mImgEl = document.getElementById('midelImg');

let leftImgIndex;
let rightImgIndex;
let midelImgIndex;
console.log(products);
function renderImg() {
    leftImgIndex = generateImage();
    console.log('hefr', leftImgIndex);
    rightImgIndex = generateImage();
    midelImgIndex = generateImage();
    // let arr=[leftImgIndex,midelImgIndex,rightImgIndex];

    // for(let i=0;i<arr.length;i++)
    // {if(!(arr[i]===leftImgIndex||arr[i]===rightImgIndex|| arr[i]===midelImgIndex)){

    while (leftImgIndex === rightImgIndex || leftImgIndex === midelImgIndex || rightImgIndex === midelImgIndex
        || lastShownImages.includes(leftImgIndex) || lastShownImages.includes(midelImgIndex) || lastShownImages.includes(rightImgIndex)) {
        leftImgIndex = generateImage();
        midelImgIndex = generateImage();
        rightImgIndex = generateImage();


    }
    lastShownImages[0] = leftImgIndex;
    lastShownImages[1] = midelImgIndex;
    lastShownImages[2] = rightImgIndex;
    lImgEl.setAttribute('src', products[leftImgIndex].source);
    lImgEl.setAttribute('title', products[leftImgIndex].source);
    products[leftImgIndex].views++;

    rImgEl.setAttribute('src', products[rightImgIndex].source);
    rImgEl.setAttribute('title', products[rightImgIndex].source);
    products[rightImgIndex].views++;
    attemptsEl.textContent = attempts;
    mImgEl.setAttribute('src', products[midelImgIndex].source);
    mImgEl.setAttribute('title', products[midelImgIndex].source);
    products[midelImgIndex].views++;
}
// else{ leftImgIndex = generateImage();
//     midelImgIndex=generateImage();
//     rightImgIndex=generateImage();
//     leftImgIndex=generateImage();
//     arr=[leftImgIndex,midelImgIndex,rightImgIndex];

// }

// }
renderImg();
console.log('her', leftImgIndex);

// console.log('left', leftImgIndex)
// console.log('right', rightImgIndex);

renderImg();

lImgEl.addEventListener('click', handelClicks);
rImgEl.addEventListener('click', handelClicks);
mImgEl.addEventListener('click', handelClicks);
function handelClicks(event) {
    attempts++;
    if (attempts <= maxAttempts) {
        console.log(event.target.id)
        if (event.target.id === 'leftImg') {
            products[leftImgIndex].clicks++;
        } else if (event.target.id === 'rightImg') {
            products[rightImgIndex].clicks++;
        } else if (event.target.id === 'midelImg') { products[midelImgIndex].clicks++; }
        renderImg();

    } else {
        let butn = document.getElementById('showresulte')
        butn.addEventListener('click', viewResulte);
        lImgEl.removeEventListener('click', handelClicks);
        rImgEl.removeEventListener('click', handelClicks);

    }
    
    settingItems();

}

function viewResulte() {
    let ulEl = document.getElementById('results');
    let liEl;
    ulEl.textContent = '';
    for (let i = 0; i < products.length; i++) {
        liEl = document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent = `${products[i].productName} has ${products[i].views} views and has ${products[i].clicks} clicks.`
        goatsClicks.push(products[i].clicks);
        goatsViews.push(products[i].views);

    }
    //  let butn=document.getElementById('showresulte');
    settingItems();
    chartRender();


    // butn.disabled=true;
}

console.log('goatsClicks', goatsClicks)
console.log('goatsViews', goatsViews)
function chartRender() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productsImageNames,
            datasets: [{
                label: '# of Clicks',
                data: goatsClicks,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 3
            }, {
                label: '# of Views',
                data: goatsViews,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

gettingItems();
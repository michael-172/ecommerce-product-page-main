let minusButton = document.querySelector('.information .two-butt .minus');
let plusButton = document.querySelector('.information .two-butt .plus');
let span = document.querySelector('.information .two-butt .buttons span');
let count = document.querySelector('.information .two-butt .buttons span').textContent;
let numberOfPieces = 0;
let theItemName = document.querySelector('.information .item').textContent;
let theItemPrice = document.querySelector('.information .price_discount .price').textContent;
let cartIcon = document.querySelector('.Right .cart img');
let cartMenu = document.querySelector('.Right .cart-menu');
theItemPrice = Number(theItemPrice.substring(1));
let cartArray = [];
let addToCart = document.querySelector('.information .two-butt .add-cart');

    
// Check LocalStorage Cart Item ::
let LocalStorageItem = window.localStorage.getItem('item');
if (LocalStorageItem) {
    
    LocalStorageItem = LocalStorageItem.split(",")
    createCart(LocalStorageItem[2]);
    // document.querySelector('.Right .cart .num-icon').innerHTML = LocalStorageItem[2];
}else{
    console.log('Cart is Empty')
}

// Image Slider
let allImgs = document.querySelectorAll('.four-images div img');
let allImgsDivs = document.querySelectorAll('.four-images div');
let bigImg = document.querySelector('.slider .bigImg');



    allImgs.forEach( (img) => {
        img.addEventListener('click', (e) => {
            handleActive(allImgs, allImgsDivs, e);
            document.querySelector('.slider .bigImg').src = e.target.src;
        });
    });    



//The Overlayed Slider :
// 1 - CREATING THE COMPLETE SLIDER PARTS (IMAGES, BUTTONS. ETC...) :
bigImg.onclick = function() {
    
    let popupOverlay = document.createElement('div');
    popupOverlay.className = 'popup-overlay';
    document.body.appendChild(popupOverlay);

    let theSlider = document.createElement('div');
    theSlider.className = 'slider';
    popupOverlay.appendChild(theSlider);

    let firstImg = document.createElement('img');
    firstImg.className = 'firstImg';
    firstImg.src = bigImg.src;
    theSlider.appendChild(firstImg);

    let fourImagesDiv = document.createElement('div');
    fourImagesDiv.className = 'fourImages';
    theSlider.appendChild(fourImagesDiv);

    for (let i = 1; i <=4; i++) {
        let insideDiv = document.createElement('div');
        let imgs = document.createElement('img');
        imgs.setAttribute('data-slide', i);
        imgs.src = `./images/image-product-${i}.jpg`;
        insideDiv.appendChild(imgs);
        fourImagesDiv.appendChild(insideDiv);

        if (imgs.src == bigImg.src){
            imgs.classList.add('active');
            imgs.parentElement.classList.add('active')
        }
    };

    
    let nextIcon = document.createElement('img');
    let prevIcon = document.createElement('img');
    nextIcon.className = 'next';
    prevIcon.className = 'prev';
    nextIcon.src = '../images/icon-next.svg';
    prevIcon.src = '../images/icon-previous.svg';
    let iconNextSpan = document.createElement('span');
    let iconPrevSpan = document.createElement('span');
    iconNextSpan.className = 'icon-next-span';
    iconPrevSpan.className = 'icon-prev-span';
    iconNextSpan.appendChild(nextIcon);
    iconPrevSpan.appendChild(prevIcon);

    theSlider.appendChild(iconNextSpan);
    theSlider.appendChild(iconPrevSpan);

    let closeIcon = document.createElement('img');
    closeIcon.className = 'close';
    closeIcon.src = '../images/icon-close.svg';
    theSlider.appendChild(closeIcon);


    // 2 - CREATING THE CLICKING FUNCTIONALITY OF SLIDER IMAGES :
    let popupallDivs = document.querySelectorAll('.popup-overlay .fourImages div');
    let popupAllImgs = document.querySelectorAll('.popup-overlay .fourImages div img');
    popupAllImgs.forEach( (img) => {
        img.addEventListener('click', (e) => {
    
            handleActive(popupAllImgs, popupallDivs, e);
    
            // Making the current slide === the dataslide of the targeted image; // 3shan lma tegy t3ml next wnta wa2f 3la img 2 y2om yro7 3la img 3 wkda...
            currentSlide = e.target.dataset.slide;
    
            // changing the Big Image source to the e.target img source.
            document.querySelector('.popup-overlay .slider .firstImg').src = e.target.src;
    
        });
    });


    // 3 - CREATING THE BUTTONS FUNCTIONALITY (CLOSE, NEXT, PREVIOUS) :
    //close Button Functionality:
    closeIcon.addEventListener('click', () => {
    document.querySelector('.popup-overlay').remove();
    });

    let currentSlide = 1;
    // nextSpan functionality;
    iconNextSpan.onclick = () => {
        if (currentSlide == 4) {
            return false;
        }else{
            currentSlide++;
            firstImg.src = `../images/image-product-${currentSlide}.jpg`;
            handleActiveOnOverlayedSlider();
        }
    }

  // prevSpan functionality;
    iconPrevSpan.onclick = () => {
        if (currentSlide == 1) {
            return false;
        }else{
            currentSlide--;
            firstImg.src = `../images/image-product-${currentSlide}.jpg`;
            handleActiveOnOverlayedSlider();
        }
    }

    function handleActiveOnOverlayedSlider() {
        popupAllImgs.forEach((img) => {
            if (img.dataset.slide == currentSlide){
                // remove All active;
                document.querySelectorAll('.fourImages div img').forEach( (image) => {
                    image.classList.remove('active');
                });
                document.querySelectorAll('.fourImages div').forEach( (DIV) => {
                    DIV.classList.remove('active');
                });
                //add active class on the img whihc dataslide equals to the currentSlide
                img.classList.add('active');
                img.parentElement.classList.add('active');
            }  
        });
    }

}
/*ENDING THE OVERLAYED SLIDER*/


/*Increment and Decrement Number of Pieces*/
    plusButton.addEventListener("click", () => {
        count++;
        span.innerHTML = count;
    });

    minusButton.addEventListener("click", () => {

        if (count == 0) {
            return false;
        }else{
            count--;
            span.innerHTML = count;
        }
    });


    cartIcon.addEventListener("click", ()=>{
        cartMenu.classList.toggle('show');
    });

    // cart Functionality ::
    addToCart.onclick = () => {

    if (cartArray.length > 0 || window.localStorage.getItem("item") && window.localStorage.getItem("item").length > 0) {

        alert('The Item is Already added in the cart');
        return false;

    }if (Number(document.querySelector('.information .two-butt .buttons span').textContent) <= 0) {

        alert('Cant Add 0 or less Items');
        return false;

    }else{

            createCart(count);
            cartArray.push(theItemName, theItemPrice, count);
            window.localStorage.setItem('item', cartArray);
            alert('The Item Added To The Cart Successfuly')
        }      
    }



/*My Functions*/ 
    function handleActive(AllImgsEL, AllDivEL, ev) {
        AllImgsEL.forEach( (image) => {
            image.classList.remove('active');
        });
        AllDivEL.forEach( (DIV) => {
            DIV.classList.remove('active');
        });

        ev.target.classList.add('active');
        ev.target.parentElement.classList.add('active');
    }
/*Function Create Cart Item*/
    function createCart(parameterOfCount) {
        let infoDiv = document.createElement('div');
            let productImg = document.createElement("img");
            let productDiv = document.createElement("div");
            let h2 = document.createElement("h2");
            let h2Text = document.createTextNode(theItemName);
            let priceCountSpan = document.createElement("span");
            let priceCountSpanText = document.createTextNode(`$${theItemPrice} x ${parameterOfCount}`);
            let totalAmountText = document.createTextNode(`$${theItemPrice * parameterOfCount}.00`);
            let totalAmount = document.createElement("span");
            let deleteIcon = document.createElement('img');
            let checkOutBtn = document.createElement('span');
            let checkoutText = document.createTextNode('Checkout');
            let numberIcon = document.createElement('span');
            let numIconText = document.createTextNode(`${parameterOfCount}`);
            let theCartMainDiv = document.querySelector('.Right .cart');


            infoDiv.className = 'cartInfo';
            productImg.className = 'product-img';
            productDiv.className = 'product-div'
            priceCountSpan.className = 'price-count-span';
            checkOutBtn.className = 'check-out';
            numberIcon.className = 'num-icon'
            deleteIcon.className = 'delete-icon';
            cartMenu.appendChild(infoDiv);


            productImg.src = document.querySelector('.slider .four-images img.active').src
            infoDiv.appendChild(productImg);
            h2.appendChild(h2Text);
            productDiv.appendChild(h2);
            priceCountSpan.appendChild(priceCountSpanText);
            totalAmount.appendChild(totalAmountText);
            productDiv.appendChild(priceCountSpan);
            productDiv.appendChild(totalAmount);
            deleteIcon.src = '../images/icon-delete.svg'
            infoDiv.appendChild(productDiv);
            infoDiv.appendChild(deleteIcon);
            checkOutBtn.appendChild(checkoutText);
            cartMenu.appendChild(checkOutBtn);
            numberIcon.appendChild(numIconText);
            theCartMainDiv.appendChild(numberIcon);


            let deleteButton = document.querySelector('.cart-menu .cartInfo .delete-icon');
            deleteButton.addEventListener("click", () => {
                if (cartArray.length !== 0 || window.localStorage.getItem("item")) {
                    document.querySelector('.cart-menu .cartInfo').remove();
                    document.querySelector('.cart-menu .check-out').remove();
                    cartArray.length = 0;
                    window.localStorage.removeItem("item");
                    numberIcon.remove();
                    count = 0;
                    document.querySelector('.information .two-butt .buttons span').textContent = count
                    let theemptycart = document.createElement("span");
                    theemptycart.appendChild(document.createTextNode('Your Cart is Empty'));
                    theemptycart.className = 'empty';
                    document.querySelector('.Right .cart-menu').appendChild(theemptycart);
                    console.log(cartArray)
                }
            });

            document.querySelector('.Right .cart-menu span.empty').remove();
    }
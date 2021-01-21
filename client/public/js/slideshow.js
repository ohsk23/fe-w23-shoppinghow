import API from "../utils/api";
import dapi from "../utils/CustomDomAPI";

const ACTIVE_PREV = "active-prev";
const ACTIVE_NEXT = "active-next";
const VISIBLE = "visible";
const NON_VISIBLE = "non-visible";

let currentSlideIdx = 0;
const slide = ({url}) => {
    return `<div class="slide">
        <img src="${url}">
    </div>`;
};

function setInitialContents () {        
    const visibleGroup = document.querySelector('.slideshow > .visible');
    let innerHTML = "";
    API.getBannerCarouselData().then((res)=>{
        for (let i = 0; i < 3; i++) {
            innerHTML += slide(res.data[(i + 2) % 3]);
        }
        visibleGroup.innerHTML = innerHTML;
    })
}

function onClickNext() {
    const nonVisibleGroup = document.querySelector('.slideshow > .non-visible');
    const visibleGroup = document.querySelector('.slideshow > .visible');
    
    // render next groups at non-visible group
    let innerHTML = "";
    API.getBannerCarouselData().then((res)=>{
        for (let i = 0; i < 3; i++) {
            innerHTML += slide(res.data[(currentSlideIdx + i) % 3]);
        }
        currentSlideIdx += 1;
        nonVisibleGroup.innerHTML = innerHTML;
    
        visibleGroup.classList.add(ACTIVE_NEXT);
        // TODO: transitionend event로 refactoring
        setTimeout(()=> {
            visibleGroup.classList.remove(ACTIVE_NEXT);
            nonVisibleGroup.classList.replace(NON_VISIBLE, VISIBLE);
            visibleGroup.classList.replace(VISIBLE, NON_VISIBLE);
        }, 300);
    })
}

function onClickPrev() {
    const nonVisibleGroup = document.querySelector('.slideshow > .non-visible');
    const visibleGroup = document.querySelector('.slideshow > .visible');
    
    // render prev groups at non-visible group
    let innerHTML = "";
    API.getBannerCarouselData().then((res)=>{
        for (let i = 0; i < 3; i++) {
            innerHTML += slide(res.data[(currentSlideIdx + i + 1) %3]);
        }
        currentSlideIdx += 2;
        nonVisibleGroup.innerHTML = innerHTML;
        
        visibleGroup.classList.add(ACTIVE_PREV);
        setTimeout(()=> {
            visibleGroup.classList.remove(ACTIVE_PREV);
            nonVisibleGroup.classList.replace(NON_VISIBLE, VISIBLE);
            visibleGroup.classList.replace(VISIBLE, NON_VISIBLE);
        }, 300);

        visibleGroup.className = "group visible active-prev";
        setTimeout(()=> {
            nonVisibleGroup.className = "group visible";
            visibleGroup.className = "group non-visible"
        }, 300);
    })
}

export function initSlideshow() {
    const nextButton = dapi.querySelector('.right-icon');
    const prevButton = dapi.querySelector('.left-icon');
    setInitialContents();
    nextButton.addEventListener('click', () => {
        onClickNext();
    })
    prevButton.addEventListener('click', () => {
        onClickPrev();
    })
}

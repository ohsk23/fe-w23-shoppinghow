
class Products {
    startIdx = 0
    constructor() {
        this.htmlElement = querySelector('.products');
        this.button = querySelector('.more-button');
        this.getProducts();
        this.button.addEventListener('click', this.onClickMoreButton());
    }
    
    getMoreProducts() {
        this.startIdx = this.startIdx + 5;
        API.getMoreItems(this.startIdx).then((res)=> {
            const innerHtml = res.data.reduce((acc, item) => {
                const { href, title, subtitle, badge } = item;
                const itemInnerHtml = `<div class="card">
                    <img class="card__image" src="${href}">
                    <div class="card__title">
                        ${title}
                    </div>
                    <div class="card__subtitle">
                        ${subtitle}
                    </div>
                    <div class="card__badge">
                        ${(badge === '테마' ? `<img src="images/thema-icon.png">`: badge)}
                    </div>
                </div>`
                return acc + itemInnerHtml;
            }, '')
            this.htmlElement.innerHTML = String(this.htmlElement.innerHTML) + innerHtml;
        });
    }
    getProducts() {
        API.getItems().then((res)=> {
            const innerHtml = res.data.reduce((acc, item) => {
                const { href, title, subtitle, badge } = item;
                const itemInnerHtml = `<div class="card">
                    <img class="card__image" src="${href}">
                    <div class="card__title">
                        ${title}
                    </div>
                    <div class="card__subtitle">
                        ${subtitle}
                    </div>
                    <div class="card__badge">
                        ${(badge === '테마' ? `<img src="images/thema-icon.png">`: badge)}
                    </div>
                </div>`
                return acc + itemInnerHtml;
            }, '')
    
            this.htmlElement.innerHTML = innerHtml;
        });
    }
    
    
    getProductsNum () {
    
    }
    
    onClickMoreButton() {
        return () => {this.getMoreProducts()};
    }

};

const products = new Products();

class Products {
    startIdx = 0
    constructor() {
        this.htmlElement = q.querySelector('.products');
        this.button = q.querySelector('.more-button');
        this.getProducts();
        this.button.addEventListener('click', this.onClickMoreButton());
    }
    
    getMoreProducts() {
        this.startIdx = this.startIdx + 5;
        API.getMoreItems(this.startIdx).then((res)=> {
            const innerHtml = res.data.reduce((acc, item) => {
                return acc + Card.render(item);

            }, '')
            this.htmlElement.innerHTML = String(this.htmlElement.innerHTML) + innerHtml;
        });
    }
    getProducts() {
        API.getItems().then((res)=> {
            const innerHtml = res.data.reduce((acc, item) => {
                return acc + Card.render(item);
            }, '')
    
            this.htmlElement.innerHTML = innerHtml;
        });
    }
    
    getProductsNum () { }
    
    onClickMoreButton() {
        return () => {this.getMoreProducts()};
    }

};

const products = new Products();

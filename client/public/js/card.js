const Card = {};
(function() {
    Card.render = ({href, title, subtitle, badge}) => {
        return `<div class="card">
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
    }
})()
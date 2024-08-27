const cards = document.querySelectorAll('.card');
let isDragging = false;
let startX, currentX, cardIndex = 0;

cards.forEach((card, index) => {
    card.addEventListener('mousedown', startDrag);
    card.addEventListener('touchstart', startDrag);

    card.addEventListener('mousemove', onDrag);
    card.addEventListener('touchmove', onDrag);

    card.addEventListener('mouseup', endDrag);
    card.addEventListener('touchend', endDrag);
    
    card.addEventListener('mouseleave', endDrag);
});

function startDrag(e) {
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX;
    this.style.transition = 'none';  // Disable transition during drag
}

function onDrag(e) {
    if (!isDragging) return;

    currentX = e.pageX || e.touches[0].pageX;
    let offsetX = currentX - startX;
    this.style.transform = `translateX(${offsetX}px) rotate(${offsetX / 10}deg)`;
}

function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;

    let offsetX = currentX - startX;
    this.style.transition = 'transform 0.3s ease';

    if (Math.abs(offsetX) > 100) {  // Swipe threshold
        this.style.transform = `translateX(${offsetX > 0 ? 1000 : -1000}px) rotate(${offsetX / 10}deg)`;
        cardIndex++;
        if (cardIndex < cards.length) {
            cards[cardIndex].style.zIndex = cards.length - cardIndex;  // Update z-index for the next card
        }
    } else {
        this.style.transform = 'translateX(0) rotate(0)';
    }
}

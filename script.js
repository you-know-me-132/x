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
    this.style.transform = `translateX(${offsetX}px)`;
}

function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;

    let offsetX = currentX - startX;
    this.style.transition = 'transform 0.3s ease';

    if (Math.abs(offsetX) > 100) {  // Swipe threshold
        if (offsetX > 0 && cardIndex > 0) {
            // Swipe right to go to the previous card
            cardIndex--;
        } else if (offsetX < 0 && cardIndex < cards.length - 1) {
            // Swipe left to go to the next card
            cardIndex++;
        }

        updateCardPosition();
    } else {
        // Snap back if swipe is not significant
        updateCardPosition();
    }
}

function updateCardPosition() {
    cards.forEach((card, index) => {
        card.style.transform = `translateX(${(index - cardIndex) * 100}%)`;
    });
}
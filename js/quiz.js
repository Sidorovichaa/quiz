const cards = document.querySelectorAll('.plate');
let currentIndex = 0;  // for cards
let currentCard = 0; // for progress bar

// hide all cards
cards.forEach(card => {
    card.classList.add('none');
});

/*===========  Next and Previous buttons  ============= */

// remove button "Next" from first card and show the first card
cards[0].querySelector('[data-nav="prev"]').remove();
cards[currentIndex].classList.remove('none');
cards[currentIndex].classList.add('visible');
updateProgressBar();      // direction = "start", progress 0%

window.addEventListener('click', function (event) {

    // CSlick on Next button
    if (event.target.closest('[data-nav="next"]')) {
        if (currentIndex > cards.length) return;

        const result = checkOnAnswer(cards[currentIndex]);
        const answersWrapper = cards[currentIndex].querySelector('[data-answers]');

        if (result) {
            // Update progress bar
            updateProgressBar('next');

            // Move to the next card
            // remove visible from current -> add visible to current -> remove none from next -> add visible to next
            setTimeout(() => {
                cards[currentIndex].classList.remove('visible');
                setTimeout(() => {
                    cards[currentIndex].classList.add('none');
                    currentIndex += 1;
                    cards[currentIndex].classList.remove('none');
                    setTimeout(() => {
                        cards[currentIndex].classList.add('visible');
                    }, 100);
                }, 500);

                answersWrapper.classList.remove('required');
            }, 500);

        } else {
            //console.error("Enter answer!!");
            answersWrapper.classList.add('required');
        }
    }

    // Click on Prev button
    if (event.target.closest('[data-nav="prev"]')) {

        // Update progress bar
        updateProgressBar('prev');

        // Move to the previous card
        setTimeout(() => {
            if (currentIndex === 0) return;
            cards[currentIndex].classList.remove('visible');
            setTimeout(() => {
                cards[currentIndex].classList.add('none');
                currentIndex -= 1;
                cards[currentIndex].classList.remove('none');
                setTimeout(() => {
                    cards[currentIndex].classList.add('visible');
                }, 100);
            }, 500);
        }, 500);
    }
})

function checkOnAnswer(card) {

    // if all radio-btns are checked
    const radioBtns = card.querySelectorAll('input[type="radio"]');
    if (radioBtns.length > 0) {                  // OR if (radioBtns.length)
        for (let radio of radioBtns) if (radio.checked) return true;
    }

    // if all check-boxes are checked
    const checkBoxes = card.querySelectorAll('input[type="checkbox"]');
    if (checkBoxes.length > 0) {                  // OR if (checkBoxes.length)
        for (let checkBox of checkBoxes) if (checkBox.checked) return true;
    }
}

/*===========  Progress bar  ============= */

function updateProgressBar(direction = 'start') {
    if (direction === 'next') currentCard += 1;
    else if (direction === 'prev') currentCard -= 1;

    const progressValue = document.querySelectorAll('.progress__label strong');
    const progressLineBar = document.querySelectorAll('.progress__line-bar');
    const countableCards = document.querySelectorAll('[data-progress]').length;
    const progress = Math.round((currentCard * 100) / countableCards);

    progressValue.forEach(item => item.innerText = progress + '%');
    progressLineBar.forEach(item => item.style.width = progress + '%');
}


/*===========  Phone mask from mask.js and mask_list.js  ======== */

mask('#tel');

const submitForm = document.querySelector('#submitForm');
const telInput = document.querySelector('#tel');

submitForm.onclick = function () {
    if (telInput.value === '+' || telInput.value.length < 10) telInput.value = "";
}


/*===========  Focus on checkbox and styling frame around it  ======== */

const checkBoxPolicy = document.querySelector('#policy');

checkBoxPolicy.addEventListener('focus', function () {
    this.closest('label').classList.add('hovered');
    console.log('focus');
})

checkBoxPolicy.addEventListener('blur', function () {
    this.closest('label').classList.remove('hovered');
    console.log('blur');
})

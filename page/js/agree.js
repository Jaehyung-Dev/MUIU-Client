const checkBtn = document.querySelector('#check-all');
const checkImg = document.querySelectorAll('.check-img');
let isChecked = false;

checkBtn.addEventListener('click', () => {
    isChecked = !isChecked;

    if(isChecked) {
        checkBtn.src ='images/check-btn.svg';
    } else {
        checkBtn.src ='images/check-btn-on.svg';
    }
    
    checkImg.forEach((img) => {
        if (isChecked) {
            img.src = 'images/check-btn.svg'; 
        } else {
            img.src = 'images/check-btn-on.svg'; 
        }
    });
});

checkImg.forEach((img) => {
    img.addEventListener('click', () => {
        isChecked = !isChecked;

        if (isChecked) {
            img.src = 'images/check-btn.svg'; 
        } else {
            img.src = 'images/check-btn-on.svg';
        }
    });
});

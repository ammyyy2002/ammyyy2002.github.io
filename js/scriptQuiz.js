let counter = 0;

function findParentByClass(element, className) {
    if (!element || !element.parentElement) {
        return null;
    }
    if (element.parentElement.classList.contains(className)) {
        return element.parentElement;
    }
    return findParentByClass(element.parentElement, className);
}

function checkMultiChoice(event) {
    let button = event.target;
    if (button.classList.contains('correct')) {
        let otherButtons = button.parentElement.querySelectorAll('.incorrect');
        otherButtons.forEach(function(b) {
            b.classList.add('not-clickable');
        });
        button.classList.add('not-clickable');
        button.parentElement.querySelector('.feedback').innerHTML = 'Correct!';
        counter++;
    }
    else {
        let buttons = button.parentElement.querySelectorAll('button');
        buttons.forEach(function(b) {
            if (b != button) {
                b.classList.add('not-clickable');
            }
        });
        let correctButton = button.parentElement.querySelector('.correct');
        button.parentElement.querySelector('.feedback').innerHTML = 'Incorrect: Correct answer is '+ correctButton.innerHTML +'!';
    }

    divElement = findParentByClass(button, 'custom-text-block-Quiz');
    if (divElement) {
        divElement.querySelector('#result').innerHTML = counter + ' out of ' + divElement.querySelectorAll('.section').length + ' right';
        
        // check if all questions are answered right, if yes blink the result
        if (counter == divElement.querySelectorAll('.section').length) {
        res = document.getElementById('result');
        res.innerHTML = 'Wow, all correct!';
        res.style.fontSize = '1.5em';
        res.classList.add('blinking-text');
        }
    }
}
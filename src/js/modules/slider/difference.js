export default class Difference {
    constructor(oldOfficer, newOfficer, items) {
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer = document.querySelector(newOfficer);
        this.items = items;
    }

    bindTriggers(...args) {
        args.forEach(element => {
            let counter = 0;
            let itemsElement = element.querySelectorAll(this.items);
            element.querySelector('.plus').addEventListener('click', () => {
                if (counter !== itemsElement.length - 2) {
                    itemsElement[counter].style.display = 'flex';
                    counter++;
                } else {
                    itemsElement[counter].style.display = 'flex';
                    itemsElement[itemsElement.length-1].remove();
                }
            })
        })
    }

    hideItems(...args) {
        args.forEach(elements => {
            let itemsElements = elements.querySelectorAll(this.items);
            itemsElements.forEach((item, i, arr) => {
                if (i !== arr.length - 1){
                    item.style.display = 'none';
                }
            })
        })
    }

    init() {
        this.hideItems(this.oldOfficer, this.newOfficer);
        this.bindTriggers(this.oldOfficer, this.newOfficer);
    }
}
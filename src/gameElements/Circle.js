export class Circle {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.dom = this.initializeDom();
    }

    initializeDom() {
        const container = document.createElement('div');
        container.classList.add("board-circle-container");
        const circle = document.createElement('div');
        circle.classList.add("board-circle");
        container.append(circle);
        return container;
    }

    update(color) {
        this.dom.children[0].classList.add(color);
    }
}
import { groupHighlight } from "../utils/cssUtils.js";
import { Circle } from "./Circle.js";

export class Board {
    constructor(rows, cols) {
        this.numRows = rows;
        this.numCols = cols;

        this.circles = [];
        this.dom = this.initializeDom();
    }

    // Creates and returns dom, and updates this.circles array
    initializeDom() {
        const parent = document.createElement('div');
        parent.classList.add("board");

        const createRow = () => {
            const row = document.createElement('div');
            row.classList.add("board-row");
            return row;
        }
        const createCircle = (row, col) => {
            const circle = new Circle(row, col);
            // circle.dataset.column = col;
            return circle;
        }

        const cols = [];
        
        // Create rows and append to parent
        for (let i = 0; i < this.numRows; i++) {
            const row = createRow();
            // Insert circles inside row
            for (let j = 0; j < this.numCols; j++) {
                const circle = createCircle(i, j);
                row.append(circle.dom);
                this.circles.push(circle);
                cols[j] ? cols[j].push(circle.dom) : (cols[j] = [circle.dom]);
            }
            parent.prepend(row);
        }

        // Highlight column on hover
        for (let i = 0; i < this.numCols; i++) {
            groupHighlight(cols[i], "highlight");
        }

        return parent;
    }

    updateCircle(row, col, player) {
        const index = row * this.numCols + col;
        this.circles[index].update(player.color);
    }
}
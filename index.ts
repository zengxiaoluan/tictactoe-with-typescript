enum ChessType {
  Zero,
  One,
}

enum ChessTypeClass {
  Zero = 'zero',
  One = 'one',
}

class Chess {
  private row: number
  private col: number
  private turn: ChessType = ChessType.Zero
  private data: number[][] = []

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  public drawBoard(parent: HTMLElement) {
    let i = 0;
    let j: number;
    let child: HTMLElement;

    for (; i < this.row; i += 1) {
      this.data[i] = new Array(this.col)
      for (j = 0; j < this.col; j += 1) {
        child = document.createElement('div')

        this.setAttr(child, {
          class: 'grid',
          row: `${i}`,
          col: `${j}`
        })

        parent.appendChild(child)
      }
    }
  }

  private setAttr(dom: HTMLElement, attrs: Object) {
    for (const key in attrs) {
      attrs.hasOwnProperty(key) && dom.setAttribute(key, attrs[key])
    }
  }

  public addEvent() {
    document.addEventListener('click', this.clickHandler.bind(this), false)
  }

  private clickHandler(e: Event) {
    let eTarget = e.target as HTMLElement;
    let row = +(eTarget.getAttribute('row') || 0)
    let col = +(eTarget.getAttribute('col') || 0)

    if (!eTarget.classList.contains('grid')) { return }

    if (!this.isEmptyGrid(row, col)) { return } // Filled will ignore

    this.addChess(eTarget)

    this.data[row][col] = this.turn

    this.whoWin(row, col)

    this.turn = this.turn === ChessType.Zero ? ChessType.One : ChessType.Zero
  }

  /**
   * Check if is empty
   * @param row
   * @param col
   */
  private isEmptyGrid(row: number, col: number) {
    return this.data[row][col] === undefined;
  }

  private addChess(parent: HTMLElement): void {
    let text = document.createTextNode(String(this.turn))
    parent.appendChild(text)

    parent.classList.add(this.turn === ChessType.Zero ? ChessTypeClass.Zero : ChessTypeClass.One)
  }

  private whoWin(row: number, col: number) {
    let i;
    let j;
    let win = true;

    for (i = 0; i < this.col; i += 1) {
      if (this.data[row][i] !== this.turn) {
        win = false
        break
      }
    }

    if (win) {
      alert(`${this.turn} wins! Game Over.`)
    }

    win = true;
    for (i = 0; i < this.row; i += 1) {
      if (this.data[i][col] !== this.turn) {
        win = false
        break
      }
    }

    if (win) {
      alert(`${this.turn} wins! Game Over.`)
    }

    win = true;
    for (i = 0; i < this.row; i += 1) {
      if (this.data[i][i] !== this.turn) {
        win = false
        break
      }
    }

    if (win) {
      alert(`${this.turn} wins! Game Over.`)
    }

    win = true;
    for (i = 0; i < this.row; i += 1) {
      if (this.data[2 - i][i] !== this.turn) {
        win = false
        break
      }
    }

    if (win) {
      alert(`${this.turn} wins! Game Over.`)
    }
  }
}

let ticTacToe = new Chess(3, 3)

ticTacToe.drawBoard(document.querySelector('#app') as HTMLElement)

ticTacToe.addEvent()

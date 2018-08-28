//IDEA: http://www.eternallyconfuzzled.com/tuts/datastructures/jsw_tut_avl.aspx
//IDEA: https://github.com/gwtw/js-avl-tree/blob/master/src/avl-tree.js
//IDEA: https://www.typescriptlang.org/docs/handbook/classes.html
//TODO: key search method
//TODO: node delete method

type Item = {
  key: number;
  value: any;
};

enum State {
  UR,
  SUR,
  B,
  SUL,
  UL
}

abstract class Node {
  constructor(item: Item) {
    this.item = item;
    this.parent = undefined;
    this.left = undefined;
    this.right = undefined;
  }

  protected item: Item;
  protected parent: Node;
  protected left: Node;
  protected right: Node;

  abstract setLeft(node: AVLNode): AVLNode;
  abstract setRight(node: AVLNode): AVLNode;
  abstract setParent(node: AVLNode): AVLNode;
  abstract getItem(): Item;
  abstract getLeft(): Node;
  abstract getRight(): Node;
  abstract getParent(): Node;

  abstract rotateL(): Node;
  abstract rotateR(): Node;
}

class AVLNode extends Node {
  constructor(item: Item) {
    super(item);
    this.height = 0;
  }

  protected height: number;

  setLeft(node: AVLNode): AVLNode {
    this.left = node;
    return this;
  }

  setRight(node: AVLNode): AVLNode {
    this.right = node;
    return this;
  }

  setParent(node: AVLNode): AVLNode {
    this.parent = node;
    return this;
  }

  getItem(): Item {
    return this.item;
  }

  getLeft(): AVLNode {
    return <AVLNode>this.left;
  }

  getRight(): AVLNode {
    return <AVLNode>this.right;
  }

  getParent(): AVLNode {
    return <AVLNode>this.parent;
  }

  getHeight(): number {
    return this.height;
  }

  getLeftHeight(): number {
    if (!this.left) return -1;
    return (<AVLNode>this.left).height;
  }

  getRightHeight(): number {
    if (!this.right) return -1;
    return (<AVLNode>this.right).height;
  }

  rotateL(): AVLNode {
    let b: AVLNode = <AVLNode>this.right;
    this.right = b.left;
    b.left = this;
    b.parent = this.parent;
    this.parent = b;
    this.setHeight();
    b.setHeight();
    return b;
  }

  rotateR(): AVLNode {
    let b: AVLNode = <AVLNode>this.left;
    this.left = b.right;
    b.right = this;
    b.parent = this.parent;
    this.parent = b;
    this.setHeight();
    b.setHeight();
    return b;
  }

  setHeight(): number {
    return (this.height = Math.max(this.getLeftHeight(), this.getRightHeight()) + 1);
  }
}

abstract class Tree {
  constructor(compareFn?: (a: Node, k: number) => number) {
    this.root = undefined;
    this.size = 0;
    if (typeof compareFn !== 'undefined') this.compare = compareFn;
  }
  protected root: Node;
  protected size: number;

  abstract getRoot(): Node;
  abstract getSize(): number;

  abstract insert(item: Item): void;
  abstract search(key: number): Node;
  abstract delete(key: number): Node;

  protected abstract compare(a: Node, k: number): number;
}

class AVLTree extends Tree {
  constructor(compareFn?: (a: AVLNode, k: number) => number) {
    super(compareFn);
  }

  getRoot(): AVLNode {
    return <AVLNode>this.root;
  }

  getSize(): number {
    return this.size;
  }

  insert(item: Item): void {
    this.root = this.insertRoutine(item, <AVLNode>this.root);
    this.size++;
  }

  search(key: number): AVLNode {
    return undefined;
  }
  delete(key: number): AVLNode {
    return undefined;
  }

  private insertRoutine(item: Item, current: AVLNode, previous?: AVLNode): AVLNode {
    if (typeof current === 'undefined') {
      return new AVLNode(item).setParent(previous);
    }

    if (this.compare(current, item.key) <= 0) {
      current.setLeft(this.insertRoutine(item, current.getLeft(), current));
    } else if (this.compare(current, item.key) > 0) {
      current.setRight(this.insertRoutine(item, current.getRight(), current));
    }

    current.setHeight();
    const state: State = this.getState(current);

    if (state === State.UL) {
      if (this.compare(current.getLeft(), item.key) < 0) {
        return current.rotateR();
      } else {
        current.getLeft().rotateL();
        return current.rotateR();
      }
    }

    if (state === State.UR) {
      if (this.compare(current.getRight(), item.key) > 0) {
        return current.rotateL();
      } else {
        current.getRight().rotateR();
        return current.rotateL();
      }
    }

    return current;
  }

  protected compare(a: AVLNode, k: number): number {
    return Math.sign(k - a.getItem().key);
  }

  private getState(node: AVLNode): State {
    switch (node.getLeftHeight() - node.getRightHeight()) {
      case -2:
        return State.UR;
      case -1:
        return State.SUR;
      case 0:
        return State.B;
      case 1:
        return State.SUL;
      case 2:
        return State.UL;
    }
  }
}

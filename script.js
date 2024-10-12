class Hashmap {
  constructor() {
    this.array = Array(16);
  }

  hash(key, arraySize) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % arraySize;
    }

    return hashCode;
  }

  clear() {
    this.array = [];
  }

  iterator(node) {
    if (node.nextNode === null) return node;
    else return this.iterator(node.nextNode);
  }

  length() {
    let count = 0;
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] !== undefined) count++;
    }
    return count;
  }

  get(key) {
    let hashCode = this.hash(key, this.array.length);
    let node = this.keyComparison(key, this.array[hashCode]);
    if (node.key === key) return node.value;
    else return null;
  }

  has(key) {
    let node = this.keyComparison(
      key,
      this.array[this.hash(key, this.array.length)]
    );

    if (node === undefined) return false;
    else if (node.key === key) return true;
    else return false;
  }

  linkToNode(key, node) {
    if (node.nextNode.key === key) return node;
    else return this.linkToNode(key, node.nextNode);
  }

  remove(key) {
    let hashCode = this.hash(key, this.array.length);
    if (this.has(key) === false) return false;
    if (this.array[hashCode].key === key) {
      this.array[hashCode] = this.array[hashCode].nextNode;
      return true;
    } else {
      let result = this.linkToNode(key, this.array[hashCode]);
      if (result.nextNode.nextNode === null) {
        result.nextNode = null;
        return true;
      } else if (result.nextNode.nextNode !== null) {
        result.nextNode = result.nextNode.nextNode;
        return true;
      }
    }
  }

  
  keys() {
    let key = [];

    function linkedListTraverse(node) {
      if (node === null) return;
      else {
        key.push(node.key);
        return linkedListTraverse(node.nextNode);
      }
    }

    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] !== undefined) {
        linkedListTraverse(this.array[i]);
      }
    }

    return key
  }

  values() {
    let value = []

    function linkedListTraverse(node) {
      if (node === null) return;
      else {
        value.push(node.value);
        return linkedListTraverse(node.nextNode);
      }
    }

    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] !== undefined) {
        linkedListTraverse(this.array[i]);
      }
    }

    return value
  }

  entries() {
    let entryArray = []
    
    function linkedListTraverse(node) {
      if (node === null) return;
      else {
        entryArray.push([`${node.key}`, `${node.value}`])
        return linkedListTraverse(node.nextNode);
      }
    }

    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] !== undefined) {
        linkedListTraverse(this.array[i]);
      }
    }

    return entryArray

  }


  keyComparison(key, node) {
    if (node === undefined) return undefined;
    else if (node.key === key) return node;
    else if (node.nextNode === null) return node;
    else return this.keyComparison(key, node.nextNode);
  }


  set(key, value) {
    let hashCode = this.hash(key, this.array.length);

    if(Math.round(this.array.length * .78) === this.length()) {
      let newArray = Array(this.array.length*2)
      let entries = this.entries()

      for (let i = 0; i < this.array.length; i++) {
        if(entries[i] !== undefined) {
          let key = entries[i][0]
          let value = entries[i][1]
          let hashCode = this.hash(key, newArray.length)

          if(newArray[hashCode] === undefined) newArray[hashCode] = {key: key, value: value, nextNode: null}
          else {
            let node = this.keyComparison(key, newArray[hashCode])

            if(node.key === key) node.value = value
            else node.nextNode = {key: key, value: value, nextNode: null}
          }
        }
      }

      this.array = newArray
      
    }

    if (this.array[hashCode] === undefined) {
      this.array[hashCode] = { key: key, value: value, nextNode: null };
    } else {
      let node = this.keyComparison(key, this.array[hashCode]);

      if (node.key === key) node.value = value;
      else node.nextNode = { key: key, value: value, nextNode: null };
    }
  }
}

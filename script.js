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
    array = [];
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
    let hashCode = this.hash(key, this.array.length)
    let node = this.keyComparison(key, this.array[hashCode])
    if(node.key === key) return node.value
    else return null
  }

  has(key) {
    let node = this.keyComparison(key, this.array[this.hash(key, this.array.length)])
  
    if(node === undefined) return false
    else if(node.key === key) return true
    else return false
  }

  keyComparison(key, node) {
    if(node === undefined) return undefined
    else if (node.key === key) return node;
    else if (node.nextNode === null) return node;
    else return this.keyComparison(key, node.nextNode);
  }

  set(key, value) {
    let hashCode = this.hash(key, this.array.length);

    if (this.array[hashCode] === undefined) {
      this.array[hashCode] = { key: key, value: value, nextNode: null };
    } else {
      let node = this.keyComparison(key, this.array[hashCode]);
      if (node.key === key) node.value = value;
      else node.nextNode = { key: key, value: value, nextNode: null };
    }
  }
}

let hashmap = new Hashmap();

hashmap.set("apple", "red");
hashmap.set("banana", "yellow");
hashmap.set("carrot", "orange");
hashmap.set("dog", "brown");
hashmap.set("elephant", "gray");
hashmap.set("frog", "green");
hashmap.set("god", "maruf")

console.log(hashmap.has("banana"))
console.log(hashmap.array)

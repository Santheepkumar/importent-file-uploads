// const obj = {};

// obj.ironman = "Tony stark";
// obj.captain = "Steve";

// console.log(obj.captain);
// console.table(obj);

function strToHash(key, storageLength) {
  let hash = 67;
  for (let i = 0; i < key.length; i++) {
    hash = (97 * hash * key.charCodeAt(i)) % storageLength;
  }
  return hash;
}

class hashTable {
  #storage = new Array(3);
  items = 0;

  #loadBalance() {
    const newStorage = new Array(this.#storage.length * 2);

    this.#storage.forEach((item) => {
      if (item) {
        item.forEach(([key, value]) => {
          const newHash = strToHash(key, newStorage.length);
          if (newStorage[newHash]) {
            newStorage[newHash].push([key, value]);
          } else {
            newStorage[newHash] = [[key, value]];
          }
        });
      }
    });
    this.#storage = newStorage;
  }

  set(key, value) {
    this.items++;
    const load = this.items / this.#storage.length;
    if (load > 0.7) this.#loadBalance();

    const hash = strToHash(key, this.#storage.length);
    if (this.#storage[hash]) {
      this.#storage[hash].push([key, value]);
    } else {
      this.#storage[hash] = [[key, value]];
    }
  }

  get(key) {
    const hash = strToHash(key, this.#storage.length);
    const item = this.#storage[hash].find((x) => x[0] === key);
    return item ? item[1] : null;
  }

  pop(key) {
    const hash = strToHash(key, this.#storage.length);
    const remainingItems = this.#storage[hash].filter((x) => !(x[0] === key));
    this.#storage[hash] = remainingItems;
  }
}

const ht = new hashTable();

ht.set("iranman", "Tony stark");
ht.set("captain", "Steve");
// console.log(ht.storage.length);
ht.set("hulk", "Bruse");
// console.log(ht.storage.length);
ht.set("thor", "God of thunder");

ht.pop("captain");
console.log(ht.storage);
console.log(ht.get("iranman"));
console.log(ht.get("captain"));

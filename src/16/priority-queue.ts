export class PriorityQueue<T> {
  private _length: number;

  private _priorities: { priority: number; list: T[] }[];

  private _hashes: Record<string, { value: T; priority: number }[]>;

  private _equalsFn: (v1: T, v2: T) => boolean;

  private _hashFn: (v: T) => string;

  constructor({ equalsFn, hashFn }: { equalsFn: (v1: T, v2: T) => boolean; hashFn: (v: T) => string }) {
    this._length = 0;
    this._priorities = [];
    this._hashes = {};
    this._equalsFn = equalsFn;
    this._hashFn = hashFn;
  }

  enqueue(value: T, priority: number) {
    const hash = this._hashFn(value);
    const sameHashList = this._hashes[hash] || [];
    const hashIdx = sameHashList.findIndex(({ value: v }) => this._equalsFn(value, v));
    let sameItem: { value: T; priority: number } | undefined;
    if (hashIdx >= 0) {
      sameItem = sameHashList[hashIdx];
    }
    if (sameItem && sameItem.priority === priority) {
      return;
    }

    if (!sameItem) {
      sameHashList.push({ value, priority });
      this._length += 1;
    } else {
      const priorityList = this._priorities.find(({ priority: p }) => p === sameItem!.priority)!.list;
      const priorityIdx = priorityList.findIndex((v) => this._equalsFn(v, value));
      priorityList.splice(priorityIdx, 1);
      Object.assign(sameItem, { priority });
    }

    this._hashes[hash] = sameHashList;

    const prioritiesIdx = Math.max(
      0,
      this._priorities.findIndex(({ priority: p }) => p > priority),
    );
    if (this._priorities.length <= prioritiesIdx || this._priorities[prioritiesIdx].priority !== priority) {
      this._priorities.splice(prioritiesIdx, 0, { priority, list: [] });
    }
    this._priorities[prioritiesIdx].list.push(value);
  }

  dequeue() {
    if (this._length === 0) {
      return undefined;
    }

    const [{ list: priorityList }] = this._priorities;

    const value = priorityList.shift()!;
    if (!priorityList.length) {
      this._priorities.shift();
    }

    const hash = this._hashFn(value);
    const hashList = this._hashes[hash];
    const hashIdx = hashList.findIndex(({ value: v }) => this._equalsFn(value, v));
    hashList.splice(hashIdx, 1);
    if (!hashList.length) {
      delete this._hashes[hash];
    }

    this._length -= 1;

    return value;
  }

  contains(value: T) {
    const hash = this._hashFn(value);
    const vals = this._hashes[hash] || [];
    return !!vals.find(({ value: v }) => this._equalsFn(v, value));
  }

  get length() {
    return this._length;
  }
}

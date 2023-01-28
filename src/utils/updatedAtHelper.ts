export function updatedAtHelper(next) {
  if (this.op === 'updateOne') {
    this._update.updatedAt = Date.now();
  } else {
    this.updatedAt = Date.now();
  }

  next();
  return;
}

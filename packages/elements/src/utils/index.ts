function loopMoveLeftArray(array: any[], step: number) {
  return array.slice(step).concat(array.slice(0, step));
}

export { loopMoveLeftArray };

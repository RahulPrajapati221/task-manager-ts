export function validUpdate(updates: string[], allowedUpdates: string[]):string[] {
  const isValidOperation = Object.keys(updates).filter((update) => {
    return !allowedUpdates.includes(update);
  });
  return isValidOperation;
}
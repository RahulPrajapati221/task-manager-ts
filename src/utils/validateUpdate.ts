export function validUpdate(
  updates: string[],
  allowedUpdates: string[]
): boolean {
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  return isValidOperation;
}

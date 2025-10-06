// Returns a new array with the element at the specified index removed
export function removeFromArray(array, indexToRemove) {
    const filteredArray = array.filter((_, index) => index !== indexToRemove);
    return filteredArray;
}
export function removeElementFromArray(array, target) {
    const filteredArray = array.filter((value, _) => value !== target);
    return filteredArray;
}
export function arrayContains(array, target, predicate) {
    for (const element of array) {
        if (predicate(element, target)) {
            return true;
        }
    }
    return false;
}

/**
 * @export
 * @param {any} name
 * @param {any} value
 */
export function setItem(name, value) {
  if (name === void (0)) {
    return;
  }
  window.localStorage[name] = JSON.stringify(value);
}
/**
 * @export
 * @param {any} name
 * @returns
 */
export function getItem(name) {
  if (name === void (0)) {
    return;
  }
  if (window.localStorage[name] !== void (0)) {
    return JSON.parse(window.localStorage[name]);
  }
}

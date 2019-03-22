
// polyfill Promise and Symbol
require('babel-polyfill');

// polyfill DOM iterators
if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
    HTMLCollection.prototype.forEach = Array.prototype.forEach;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstObjectKey = function (obj) {
    return Object.keys(obj)[0];
};
exports.slugify = function (s) {
    return s.split(" ").join("-");
};
exports.containsAny = function (s, arr) {
    for (var i in arr) {
        if (s.includes(arr[i])) {
            return true;
        }
    }
    return false;
};
exports.removeLastItem = function (arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (i + 1 != arr.length) {
            newArr.push(arr[i]);
        }
    }
    return newArr.join("-");
};

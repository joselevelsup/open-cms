"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomId = exports.removeLastItem = exports.containsAny = exports.slugify = exports.firstObjectKey = void 0;
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
exports.randomId = function (length) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var randS = "";
    while (length > 0) {
        randS += chars.charAt(Math.floor(Math.random() * chars.length));
        length--;
    }
    return randS;
};

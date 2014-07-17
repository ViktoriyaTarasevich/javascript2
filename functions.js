function FunctionalTools() {}

FunctionalTools.prototype.partialApplication = function (func) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments);
        return func.apply(this, args.concat(innerArgs));
    };
};

FunctionalTools.prototype.curry = function (func) {
    var args = Array.prototype.slice.call(arguments, 1);
    return (function curriedFunction() {
        return function () {
            args = args.concat(Array.prototype.slice.call(arguments));
            if (args.length < func.length) {
                return curriedFunction(args.length);
            }
            return func.apply(this, args);
        };
    })();
};

FunctionalTools.prototype.linearFolder = function (array, callback, initialValue) {
    var previousValue = initialValue;
    for (var i = 0; i < array.length; i++) {
        previousValue = callback(previousValue, array[i], i, array);
    }
    return previousValue;
};

FunctionalTools.prototype.linearUnFolder = function (callback, initialValue) {
    var state = initialValue;
    var arrayResult = [];
    while (state != null) {
        var tempValue = callback(state);
        arrayResult.push(tempValue.value);
        state = tempValue.state;
    }
    return arrayResult;
};

FunctionalTools.prototype.map = function (func, array) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        newArray[i] = func(array[i]);
    }
    return newArray;
};

FunctionalTools.prototype.filter = function (func, array) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        if (func(array[i])) {
            newArray.push(array[i]);
        }
    }
    return newArray;
};

FunctionalTools.prototype.averangeEvenNumbers = function (array) {
    return FunctionalTools.prototype.filter(function (x) {
        if (x % 2 === 0) {
            return x;
        }
    }, array);
};

FunctionalTools.prototype.sumOfRandomNumbers = function (array) {
    return FunctionalTools.prototype.linearFolder(array, function (prev, current) {
        return prev + current;
    }, 0);
};

FunctionalTools.prototype.first = function (condition, array) {
    for (var i = 0; i < array.length; i++) {
        if (condition(array[i])){
            return array[i];
        }
    }
};


FunctionalTools.prototype.lazyEvaluation = function (func) {
    var variable = Array.prototype.slice.call(arguments, 1);
    var lazyEvaluation = function () {
        return func(variable);
    };
    return lazyEvaluation;
};

FunctionalTools.prototype.memoization = function (func) {
    var cache = {};
    return function (arg) {
        if (arg) {
            var args = Array.prototype.slice.call(arguments);
            if (arg in cache) {
                return cache[arg];
            }
            else {
                cache[arg] = func.apply(this, args);
                return cache[arg];
            }
        }
    };
};

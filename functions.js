function FunctionalTools() {
}

FunctionalTools.prototype.partialApplication = function (f) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var inner_args = Array.prototype.slice.call(arguments);
        return f.apply(this, args.concat(inner_args))
    };
};

FunctionalTools.prototype.curry = function (f, inner_args) {
    var args = Array.prototype.slice.call(arguments, 1);
    var n = 0;
    return (function curriedFunction(n) {
        return function () {
            for (var i = 0; i < arguments.length; i++) args[i + n] = arguments[i];
            var newArgumentsLength = n + arguments.length;
            if (newArgumentsLength < f.length)
                return curriedFunction(newArgumentsLength);
            args.length = newArgumentsLength;
            return f.apply(inner_args, args);
        };
    })(n);
}

FunctionalTools.prototype.linearFolder = function (array, callback, initialValue) {
    var previousValue = initialValue;
    for (var i = 0; i < array.length; i++) {
        previousValue = callback(previousValue, array[i], i, array);
    }
    return previousValue;
}

FunctionalTools.prototype.linearUnFolder = function (callback, initialValue) {
    var state = initialValue;
    var arrayResult = [];
    while (state != null) {
        var tempValue = callback(state);
        arrayResult.push(tempValue.value);
        state = tempValue.state;
    }
    return arrayResult;
}

FunctionalTools.prototype.map = function (func, array) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        newArray[i] = func(array[i]);
    }
    return newArray;
}

FunctionalTools.prototype.filter = function (func, array) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        if (func(array[i])) {
            newArray.push(array[i]);
        }
    }
    return newArray;
}

FunctionalTools.prototype.averangeEvenNumbers = function (array) {
    var arr = FunctionalTools.prototype.filter(function (x) {
        if (x % 2 === 0) return x;
    }, array);
    return arr;
}

FunctionalTools.prototype.sumOfRandomNumbers = function (array) {
    return FunctionalTools.prototype.linearFolder(array, function (prev, current, index, array) {
        return prev + current;
    }, 0);
}

FunctionalTools.prototype.first = function (condition, array) {
    for (var i = 0; i < array.length; i++) {
        if (condition(array[i]))
            return array[i];
    }
}


FunctionalTools.prototype.lazyEvaluation = function (func) {
    var variable = Array.prototype.slice.call(arguments, 1);
    var lazyEvaluation = function () {
        return func(variable);
    };
    return lazyEvaluation;
}

FunctionalTools.prototype.memoization = function (func) {
    var cache = {};
    return function (arg) {
        if (arg) {
            var args = Array.prototype.slice.call(arguments);

            if (arg in cache) {
                return cache[arg];
            }
            else {
                return cache[arg] = func.apply(this, args);
            }
        }
    }
}

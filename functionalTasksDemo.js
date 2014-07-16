var functions = new FunctionalTools();
var func = function (x, y, z) {
    return x + y + z;
};
var resultPartialApplication = functions.partialApplication(func, 3);
console.log(resultPartialApplication(4, 2));
var resultCurring = functions.curry(func);
console.log(resultCurring(1)(2)(7)); // 10

var func1 = function (x) {
    return x + 1;
};
var list = [1, 8, 2, 3, 4, 5];
console.log(functions.map(func1, list));

var func2 = function (x) {
    if (x > 3) return x;
};
console.log(functions.filter(func2, list));

console.log(functions.first(func2, list));

console.log(functions.sumOfRandomNumbers(list));
console.log(functions.averangeEvenNumbers(list));
functions.lazyEvaluation(function (x) {
    console.log(x*x);
}, 127)();

var memoizedSum = functions.memoization(func);
console.log(memoizedSum(2, 3, 2));

var func3 = function (state) {
    return { value: 'value1', state: null };
}
console.log(functions.linearUnFolder(func3, true));
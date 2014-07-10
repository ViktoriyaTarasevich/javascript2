function partialApplication(f) {
    var args = Array.prototype.slice.call(arguments,1);
    return function() {
        var inner_args = Array.prototype.slice.call(arguments);
        return f.apply(this, args.concat(inner_args))
    };
};

function curry(f, inner_args){
  var args = Array.prototype.slice.call(arguments,1);
  var n = 0;
  return (function curriedFunction(n){
    return function(){
      for(var i=0; i<arguments.length; i++) args[i + n] = arguments[i];
		var newArgumentsLength = n + arguments.length;
      if(newArgumentsLength < f.length) 
		return curriedFunction(newArgumentsLength);
	   args.length = newArgumentsLength;
      return f.apply(inner_args, args);
    };
  })(n);
}

function linearHolder(array, callback,initialValue){
	var previousValue = initialValue;
	var callbackValue;
	for( var i = 0; i < array.length; i++){
		callbackValue = callback(previousValue,array[i],i,array);
	}
	return callbackValue;
}

function linearUnholder(callback,initialValue){
	var state = initialValue;
	var arrayResult = [];
	while (state !== null){
		var tempValue = callback(state);
		arrayResult.push(tempValue.value);
		state = tempValue.state;
	}
	return arrayResult;
}

function map(func, array){
	var newArray = [];
	for (var i = 0; i < array.length; i++){
		newArray[i] = func(array[i]);
	}
	return newArray;
}

function filter(func,array){
	var newArray = [];
	for(var i = 0; i< array.length; i++){
		if(func(array[i])){
			console.log(array[i]);
			newArray.push(array[i]);
		}
	}
	return newArray;
}

function getAverangeEvenNumbers(array){
	var arr = filter(function(x){if(x%2===0) return x;},array);
	return arr;
}

function first(array, condition){
	for (var i = 0; i < array.length; i++){
		if (condition(array[i]){
			return array[i];
	}
}

function lazyEvaluation(func){
	lazyEvaluation = function () {
	  return variable  = Array.prototype.slice.call(arguments);
	};
	return func.apply(this, arguments);

}

function memoization(func){
	var cache = {};
	if (arguments[0])
		var arg = arguments[0];
	return function(arg){
		var args = Array.prototype.slice.call(arguments);
		if (arg in cache){
			console.log(cache[arg]);
		}
		else{
			console.log(cache[arg] =  func.apply(this,args );
		}
	}
}

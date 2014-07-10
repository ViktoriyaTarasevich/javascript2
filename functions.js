function partialApplication(f) {
    var args = Array.prototype.slice.call(arguments,1);
    return function() {
        var inner_args = Array.prototype.slice.call(arguments);
        return f.apply(this, args.concat(inner_args))
    };
};

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

function Map(array, func){
	var newArray = [];
	for (var i = 0; i < array.length; i++){
		newArray[i] = func(array[i]);
	}
	return newArray;
}

function Filter(){

}



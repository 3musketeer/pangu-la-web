var sortObj = function sortObj(arr){
    if(0 == arr.length){
        return [];
    }
    var left = [],
        right = [],
        pivot = arr[0]['count'],
        pivotObj = arr[0];

    for(var i=1; i<arr.length; i++){
        arr[i]['count'] > pivot ? left.push(arr[i]) : right.push(arr[i]);
    }
    return sortObj(left).concat(pivotObj, sortObj(right));
}
var mExtend = function mExtend(dest, src){
    var tmp = {};
    for(var i in dest){
        tmp[i] = dest[i];
    }
    for(var idx in src){
        tmp[idx] = src[idx];
    }
    return tmp;
}

exports.sortObj = sortObj;
exports.mExtend = mExtend;
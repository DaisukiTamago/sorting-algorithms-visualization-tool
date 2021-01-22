function insertionSort(array: any[]) {
    
  const length = array.length

    for(let marker = 1; marker < length; marker++){

        let comparisonIndex = marker - 1
        let numberToSort = array[marker]

        while(comparisonIndex >= 0 && numberToSort < array[comparisonIndex]){
            array[comparisonIndex + 1] = array[comparisonIndex]
            comparisonIndex--
        }

        array[comparisonIndex + 1] = numberToSort
        
    }

    return array
}

function shuffle(array: any[]) {
    let m = array.length, t, i

    while (m) {
      i = Math.floor(Math.random() * m--)
      t = array[m]
      array[m] = array[i]
      array[i] = t
    }
  
    return array
}

function quicksort(array: number[]) {
  if (array.length <= 1) {
    return array;
  }

  var pivot = array[0];
  
  var left = []; 
  var right = [];

  for (var i = 1; i < array.length; i++) {
    array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
  }

  return quicksort(left).concat(pivot, quicksort(right));
};


  
export {insertionSort, shuffle, quicksort}
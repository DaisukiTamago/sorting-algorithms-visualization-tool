function insertionSort(array: any[]) {
    //let array = arr

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

export {insertionSort, shuffle}
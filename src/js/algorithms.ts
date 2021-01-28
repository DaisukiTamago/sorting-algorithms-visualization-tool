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


function browserDefaultSort(array: number[]){
  array.sort( (a ,b) => a-b)
}

// create max heap
function maxHeap(input, i) {
  const left = 2 * i + 1
  const right = 2 * i + 2
  let max = i

  if (left < arrLength && input[left] > input[max]) {
      max = left
  }

  if (right < arrLength && input[right] > input[max])     {
      max = right
  }

  if (max != i) {
      swap(input, i, max)
      maxHeap(input, max)
  }
}

function swap(input, indexA, indexB) {
  const temp = input[indexA]

  input[indexA] = input[indexB]
  input[indexB] = temp
}

function heapSort(input) {   
  arrLength = input.length

  for (let i = Math.floor(arrLength / 2); i >= 0; i -= 1)      {
      maxHeap(input, i)
    }

  for (let i = input.length - 1; i > 0; i--) {
      swap(input, 0, i)
      arrLength--

      maxHeap(input, 0)
  }
  return
}

let arrLength


  
export default [insertionSort, browserDefaultSort, heapSort]
export {shuffle}
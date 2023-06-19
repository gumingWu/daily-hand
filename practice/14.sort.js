var sortArray = function(nums) {
  quickSort(nums, 0, nums.length-1)
  return nums
};

function quickSort(arr, start, end) {
  if(start < end) {
      const pivot = partition(arr, start, end)
      quickSort(arr, start, pivot - 1)
      quickSort(arr, pivot + 1, end)
  }
}

function partition(arr, start, end) {
  const pivot = arr[start]
  let i=start, j=end
  while(i < j) {
      while(i < j && arr[j] >= pivot)
          j--
      arr[i] = arr[j]
      while(i < j && arr[i] < pivot)
          i++
      arr[j] = arr[i]
  }
  arr[i] = pivot
  return i
}

console.log(sortArray([5,2,3,6,3,1,5,8,4,2,0]))
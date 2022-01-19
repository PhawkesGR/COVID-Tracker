// return a number to US format
const formatNumber = number => {
    return number.toLocaleString('en-US');
}

// given an array of objects (object MUST contain a value field that's an integer),
// it returns that array sorted in descending(default) or ascending order
const sort = (array, order = 'desc') => {
    if (order === 'desc') {
        return array.sort((a, b) => b.value - a.value)
    } else if (order === 'asc') {
        return array.sort((a, b) => a.value - b.value)
    } else {
        // not recognized order, return the array as is
        return array
    }
}

const handleCircleRadius = (value, highestValue) => {
    const highestRadius = 60
    if (value === highestValue) return highestRadius
    if (value <= 0) return 10
    const percentageDiff = percentageDifference(highestValue, value)
    if (percentageDiff <= 25) return 55
    if (percentageDiff <= 50) return 50
    if (percentageDiff <= 100) return 40
    if (percentageDiff <= 150) return 25
    return 20
}

// calculates the percentage difference between 2 numbers
const percentageDifference = (a, b) => {
    const [highestNumber, lowestNumber] = [a,b].sort((a,b) => b - a)
    const absolute = highestNumber - lowestNumber
    var avg = (highestNumber + lowestNumber) / 2
    return (absolute / avg) * 100 
}

// takes a number and returns a beautified one (eg, 100,000 --> 100k)
const beautifyNumber = (number) => {
    const formatter = Intl.NumberFormat('en', { notation: 'compact'})
    return formatter.format(number).toLowerCase()
}

export {
    formatNumber,
    sort,
    handleCircleRadius,
    beautifyNumber
}
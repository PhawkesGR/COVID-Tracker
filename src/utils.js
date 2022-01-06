const totalVaccinations = (country, timeline) => {
    const totalVaccinations = Object.values(timeline).reduce((prev, current) => prev + current)
    return {
        country,
        totalVaccinations: formatNumber(totalVaccinations)
    };
}

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

// returns the radius for the circle in the map. Larger circles represent more daily cases
// highest cases get a radius of 80. Lowest cases get a radius of 10.
// the rest of the cases get a radius based on their percentage difference with the highest cases
const handleCircleRadius = (cases, highestCases) => {
    if (cases <= 0) return 10
    const highestRadius = 40
    const percentageDiff = percentageDifference(highestCases, cases).toString().length
    console.log(percentageDifference(highestCases, cases))
    return percentageDiff.toString().length <= 2 ? highestRadius - parseInt(percentageDiff.toString().slice(0, 1))
    : highestRadius - parseInt(percentageDiff.toString().slice(0, 2))
}

// calculates the percentage difference between 2 numbers
const percentageDifference = (a, b) => {
    const [highestNumber, lowestNumber] = [a,b].sort((a,b) => b - a)
    const absolute = highestNumber - lowestNumber
    var avg = (highestNumber + lowestNumber) / 2
    return (absolute / avg) * 100 
}

export {
    totalVaccinations,
    formatNumber,
    sort,
    handleCircleRadius
}
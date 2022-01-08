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

const handleCircleRadius = (value) => {
    if (value <= 0) return 10
    if (value <= 1000) return 15
    if (value <= 5000) return 20
    if (value <= 15000) return 30
    if (value <= 45000) return 40
    if (value <= 75000) return 50
    return 60
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
    totalVaccinations,
    formatNumber,
    sort,
    handleCircleRadius,
    beautifyNumber
}
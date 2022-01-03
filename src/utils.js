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

export {
    totalVaccinations,
    formatNumber,
    sort
}
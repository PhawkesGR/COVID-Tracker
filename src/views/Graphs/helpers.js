const continentColors = {
    'North America': {
        backgroundColor: '#ff5454',
        borderColor: '#ff5454'
    },
    'Asia': {
        backgroundColor: '#f9dd54',
        borderColor: '#f9dd54'
    },
    'South America': {
        backgroundColor: '#6cf76c',
        borderColor: '#6cf76c'
    },
    'Europe': {
        backgroundColor: '#858ffd',
        borderColor: '#858ffd'
    },
    'Africa': {
        backgroundColor: '#fda300',
        borderColor: '#fda300'
    },
    'Australia-Oceania': {
        backgroundColor: '#a940ab',
        borderColor: '#a940ab'
    }
}

const buildDoughnutData = (data, metric) => {
    const dataset = {
        label: `# of ${metric}`,
        data: data.map(d => d[metric]),
        backgroundColor: data.map(d => continentColors[d.continent].backgroundColor),
        borderColor: data.map(d => continentColors[d.continent].borderColor),
        borderWidth: 1
    }
    return dataset
}

const filterOptions = [
    {
        value: 30,
        displayText: '1M',
        selected: false,
    },
    {
        value: 182,
        displayText: '6M',
        selected: false
    },
    {
        value: 365,
        displayText: '1Y',
        selected: false
    },
    {
        value: 'all',
        displayText: 'ALL',
        selected: true
    },
]

export {
    buildDoughnutData,
    filterOptions
}
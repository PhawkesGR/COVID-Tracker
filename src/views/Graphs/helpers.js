const continentColors = {
    'North America': {
        backgroundColor: '#ff0505',
        borderColor: '#ff0505'
    },
    'Asia': {
        backgroundColor: '#f9d524',
        borderColor: '#f9d524'
    },
    'South America': {
        backgroundColor: '#02bb02',
        borderColor: '#02bb02'
    },
    'Europe': {
        backgroundColor: '#2c3cef',
        borderColor: '#2c3cef'
    },
    'Africa': {
        backgroundColor: '#fda300',
        borderColor: '#fda300'
    },
    'Australia-Oceania': {
        backgroundColor: '#ac03af',
        borderColor: '#ac03af'
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
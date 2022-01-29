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

/*
    The API returns multiple objects per country (different provinces).
    This function adds up the data (cases, deaths, recovered) into one.
*/

const combineDataPerCountry = data => {
    let total = []
    let previousCountry = ''

    for (let i = 0; i < data.length; i++) {
        if (data[i].country === previousCountry) {
            const index = total.findIndex(t => t.country === data[i].country)
            total[index].cases = total[index].cases + Object.values(data[i].timeline.cases)[0]
            total[index].deaths = total[index].deaths + Object.values(data[i].timeline.deaths)[0]
            total[index].recovered = total[index].recovered + Object.values(data[i].timeline.recovered)[0]
        } else {
            previousCountry = data[i].country
            total.push({
                country: data[i].country,
                cases: Object.values(data[i].timeline.cases)[0],
                deaths: Object.values(data[i].timeline.deaths)[0],
                recovered: Object.values(data[i].timeline.recovered)[0]
            })
        }
    }
    return total
}

/* 
    with the knowledge of countries per continent and the data from each individual country,
    add up the data for each continent
*/
const combineDataPerContinent = (countriesPerContinent, countryData) => {
    return countriesPerContinent.map(ccp => {
      return {
        continent: ccp.continent,
        cases: ccp.countries.map(c => {
            return countryData.find(cd => c === cd.country) === undefined
                ? 0 : countryData.find(cd => c === cd.country).cases
        }).reduce((prev, curr) => prev + curr, 0),
        deaths: ccp.countries.map(c => {
            return countryData.find(cd => c === cd.country) === undefined
                ? 0 : countryData.find(cd => c === cd.country).deaths
        }).reduce((prev, curr) => prev + curr, 0),
        recovered: ccp.countries.map(c => {
            return countryData.find(cd => c === cd.country) === undefined
                ? 0 : countryData.find(cd => c === cd.country).recovered
        }).reduce((prev, curr) => prev + curr, 0)
      }
    })
}

const findHistoricalDataPerContinent = (continents, historicalData) => {
    const countriesPerContinent = continents.map(c => {
        return {
            continent: c.continent,
            countries: c.countries
        }
    })

    const countryData = combineDataPerCountry(historicalData)

    const dataPerContinent = combineDataPerContinent(countriesPerContinent, countryData)

    return {
        labels: dataPerContinent.map(d => d.continent),
        cases: dataPerContinent,
        deaths: dataPerContinent,
        recovered: dataPerContinent
    }
}

export {
    buildDoughnutData,
    findHistoricalDataPerContinent,
    filterOptions
}
import styles from './Map.module.scss'
import { useEffect } from 'react'
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet'
import { handleCircleRadius, sort } from '../../utils.js'

function Map({ lat, long, zoom, circles, metric  }) {
    let circleColor
    let sortedValues
    if (metric === 'cases') {
        circleColor = '#5763e5'
        sortedValues = sort(circles.map(c => {
            return {
                value: c.cases
            }
        }))
        console.log(sortedValues)
    } else if (metric === 'recovered') {
        circleColor = '#49ef49'
        sortedValues = sort(circles.map(c => {
            return {
                value: c.recovered
            }
        }))
    } else {
        circleColor = '#d32626'
        sortedValues = sort(circles.map(c => {
            return {
                value: c.deaths
            }
        }))
    }
    const highestValue = sortedValues[0].value
    return (
        <div className={styles.card} key={lat}>
            <MapContainer className={styles.MapContainer} center={[lat, long]} zoom={zoom} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    circles.map(info => {
                        return (
                            <CircleMarker center={[info.lat, info.long]} pathOptions={{color: circleColor}} radius={handleCircleRadius(info[metric], highestValue)} key={`${info.country}`}>
                                <Popup>
                                    <div className={styles.infoContainer}>
                                        <div><img src={info.flag} alt={info.country} /></div>
                                        <div><h1 className={styles.PopupTitle}>{info.country}</h1></div>
                                        <div><h2 className={styles.PopupSubtitle}>Cases: {info.cases}</h2></div>
                                        <div><h2 className={styles.PopupSubtitle}>Recovered: {info.recovered}</h2></div>
                                        <div><h2 className={styles.PopupSubtitle}>Deaths: {info.deaths}</h2></div>
                                    </div>
                                </Popup>
                            </CircleMarker>
                        )
                    })
                }
            </MapContainer>
        </div>
    )
}

export default Map

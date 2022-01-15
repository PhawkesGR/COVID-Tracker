import styles from './Map.module.scss'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet'
import { handleCircleRadius, sort, formatNumber } from '../../utils.js'

function Map({ lat, long, zoom, circles, metric }) {
    const [circleColor, setCircleColor] = useState('')
    const [highestValue, setHighestValue] = useState(0)
    useEffect(() => {
        setCircleColor(metric === 'cases' ? '#5763e5'
            : metric === 'recovered' ? '#49ef49'
            : '#d32626')
    }, [metric])

    useEffect(() => {
        const highest = sort(circles.map(c => {
            return {
                value: c[metric]
            }
        }))[0]
        setHighestValue(highest && highest.value !== undefined ? highest.value : 0)
    }, [circles, metric])

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
                                        <div><h2 className={styles.PopupSubtitle}>Cases: {formatNumber(info.cases)}</h2></div>
                                        <div><h2 className={styles.PopupSubtitle}>Recovered: {formatNumber(info.recovered)}</h2></div>
                                        <div><h2 className={styles.PopupSubtitle}>Deaths: {formatNumber(info.deaths)}</h2></div>
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

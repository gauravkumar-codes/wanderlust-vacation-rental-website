mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    center: listing.geometry.coordinates,
    zoom: 9,
});

const marker = new mapboxgl.Marker({ color: "Red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25}).setHTML(
        `<h3>${listing.location}</h3>
        <p>Exact location provided after booking</p>`))
    .addTo(map);
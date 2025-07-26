
mapboxgl.accessToken = 'pk.eyJ1IjoiYWV2ZWxhbmQiLCJhIjoiY2o4b3IzeGF5MDcyZzMzcnNqcTR5bXd4OCJ9.5FnPH3C-4gGgjSLaluFA8Q';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/outdoors-v12',
  center: [-115.0, 33.0],
  zoom: 13
});

map.on('load', () => {
  map.addSource('glamis-points', {
    type: 'vector',
    url: 'mapbox://aeveland.POI-00wk4o'
  });

  map.addLayer({
    id: 'glamis-points-layer',
    type: 'circle',
    source: 'glamis-points',
    'source-layer': 'waypoints',
    paint: {
      'circle-radius': 8,
      'circle-color': '#FF5722'
    }
  });

  map.on('click', 'glamis-points-layer', (e) => {
    const coords = e.features[0].geometry.coordinates.slice();
    const props = e.features[0].properties;

    const imageTag = props.image_url
      ? `<img src="${props.image_url}" alt="" style="width:100%;border-radius:8px;margin-bottom:8px;" />`
      : '';

    const popupHTML = `
      <sl-card style="width: 240px; padding: 0;">
        ${imageTag}
        <div style="padding: 12px;">
          <h3>${props.name || 'Unnamed'}</h3>
          <p>${props.desc || ''}</p>
          <small>Elevation: ${props.ele || '—'} ft<br>Time: ${props.time || '—'}</small>
        </div>
      </sl-card>
    `;

    new mapboxgl.Popup({ offset: 15 })
      .setLngLat(coords)
      .setHTML(popupHTML)
      .addTo(map);
  });

  map.on('mouseenter', 'glamis-points-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'glamis-points-layer', () => {
    map.getCanvas().style.cursor = '';
  });
});

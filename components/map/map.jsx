import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = '(Mapbox Public Token)';

const Map = ({ selectedCoordinate, coordinates, onMarkerClick }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [suspiciousCoordinate, setSuspiciousCoordinate] = useState(null);
  let clickTimeout = null;

  const isValidCoordinate = (coord) => {
    if (!coord) return false;
    const { latitude, longitude } = coord;
    return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
  };

  const getColor = (status) => {
    if (status === 'OK' || status === 'Possible centroid') return 'green';
    if (status === 'In ocean') return 'yellow';
    return 'red';
  };

  const handleMarkerClick = (coord) => {
    if (!coord) return;
    if (clickTimeout !== null) {
      clearTimeout(clickTimeout);
      clickTimeout = null;
      if (typeof onMarkerClick === 'function') {
        onMarkerClick(coord); // Double-click detected
      }
    } else {
      clickTimeout = setTimeout(() => {
        map.current.flyTo({
          center: [coord.longitude, coord.latitude],
          zoom: 15,
          essential: true,
        });
        clickTimeout = null;
      }, 300); // Single-click detected
    }
  };

  const addMarkers = () => {
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    coordinates.forEach(coord => {
      if (isValidCoordinate(coord)) {
        const marker = new mapboxgl.Marker({ color: getColor(coord.status) })
            .setLngLat([coord.longitude, coord.latitude])
            .addTo(map.current);

        marker.getElement().style.cursor = 'pointer'; // Ensure pointer cursor for clickable markers

        marker.getElement().addEventListener('dblclick', () => {
          handleMarkerClick(coord);
        });

        marker.getElement().addEventListener('click', () => {
          handleMarkerClick(coord);
        });

        markers.current.push(marker);
      }
    });
  };

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v11', // Use a colorful style
      center: [0, 0],
      zoom: 2,
      projection: 'globe' // Set the map projection to globe
    });

    map.current.on('style.load', () => {
      map.current.setFog({
        range: [1.0, 7.0],
        color: 'white',
        "horizon-blend": 0.1
      });
    });

    map.current.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl
        })
    );

    map.current.addControl(new mapboxgl.FullscreenControl());
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const resetButton = document.createElement('button');
    resetButton.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-reset';
    resetButton.type = 'button';
    resetButton.title = 'Reset Map';
    resetButton.innerHTML = '🏠';
    resetButton.onclick = () => {
      map.current.flyTo({
        center: [0, 0],
        zoom: 2,
      });
    };

    const resetControl = document.createElement('div');
    resetControl.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
    resetControl.appendChild(resetButton);

    map.current.addControl({
      onAdd: function() {
        return resetControl;
      },
      onRemove: function() {
        resetControl.parentNode.removeChild(resetControl);
      }
    }, 'top-right');

    // Add terrain control
    const terrainControl = document.createElement('div');
    terrainControl.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

    const terrainButton = document.createElement('button');
    terrainButton.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-terrain';
    terrainButton.type = 'button';
    terrainButton.title = 'Toggle Terrain';
    terrainButton.innerHTML = '🗺️';
    terrainButton.onclick = () => {
      const style = map.current.getStyle();
      if (style.name === 'Mapbox Satellite Streets') {
        map.current.setStyle('mapbox://styles/mapbox/outdoors-v11');
      } else {
        map.current.setStyle('mapbox://styles/mapbox/satellite-streets-v11');
      }
    };

    terrainControl.appendChild(terrainButton);

    map.current.addControl({
      onAdd: function() {
        return terrainControl;
      },
      onRemove: function() {
        terrainControl.parentNode.removeChild(terrainControl);
      }
    }, 'top-right');

    addMarkers();
  }, []);

  useEffect(() => {
    addMarkers();
  }, [coordinates]);

  useEffect(() => {
    if (selectedCoordinate && isValidCoordinate(selectedCoordinate)) {
      if (selectedCoordinate.latitude === 0 && selectedCoordinate.longitude === 0) {
        setSuspiciousCoordinate('Suspicious coordinate: (0,0)');
      } else {
        setSuspiciousCoordinate(null);
        map.current.flyTo({
          center: [selectedCoordinate.longitude, selectedCoordinate.latitude],
          zoom: 15,
          essential: true,
        });
      }
    }
  }, [selectedCoordinate]);

  return (
      <div>
        <div ref={mapContainer} style={{ height: '500px' }} />
        {suspiciousCoordinate && (
            <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
              {suspiciousCoordinate}
            </div>
        )}
      </div>
  );
};

export default Map;

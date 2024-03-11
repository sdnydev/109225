import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Fire } from '../../redux/services/api/fire.api';

export const FireMapComponent = ({ data }: { data: Fire[] }) => {
  return (
    <div>
      <MapContainer
        style={{ width: '100%', height: '600px' }}
        center={[53.7267, -127.6476]}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {(data || []).map((fire: Fire) => (
          <Marker
            key={fire.OBJECTID}
            position={[fire.LATITUDE || 0, fire.LONGITUDE || 0]}
          >
            <Popup>
              Description: {fire.GEOGRAPHIC_DESCRIPTION}
              <br />
              Fire Cause: {fire.FIRE_CAUSE}
              <br />
              Fire Status: {fire.FIRE_STATUS}
              <br />
              Fire Period: {fire.IGNITION_DATE} - {fire.FIRE_OUT_DATE}
            </Popup>
          </Marker>
        ))}
        {/* <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
};

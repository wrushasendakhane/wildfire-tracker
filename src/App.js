import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Loader from './Loader';
import Map from './Map';



function App() {
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const response = await fetch(
        "https://eonet.sci.gsfc.nasa.gov/api/v2.1/events"
      );
      const { events } = await response.json();
      setEventData(events);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <div className="App">
      <Header />
      {!loading ? <Map eventData={eventData} /> : <Loader />}
    </div>
  );
}

export default App;

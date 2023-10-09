import skaBand from "./band-json/ska-band.json";
import kpopBand from "./band-json/kpop-band.json";
import punkBand from "./band-json/punk-band.json";

import BandForm from "./BandForm";
import { BandData, bandDataListSchema } from "./types";

const useGetBands = (): BandData[] => {
  const result = bandDataListSchema.safeParse([skaBand, kpopBand, punkBand])
  
  if(result.success) {
    return result.data;
  } else {
    console.error('Band data failed parsing', result.error)
    return []
  }
}

function App() {
  const bands = useGetBands();
  const selectedBand = bands[0];

  return (
    <div className="App" style={{ margin: 60}}>
      {selectedBand ? <BandForm key={selectedBand.id} band={selectedBand} /> : <h1>Select a band</h1>}
    </div>
  );
}

export default App;

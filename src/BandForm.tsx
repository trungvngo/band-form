import { BandData } from "./types";
import Form from "./components/Form";
import Header from "./components/Header";
import Description from "./components/Description";


function BandForm({ band }: { band: BandData }) {
  return (
    <div>
      <Header bandName={band.name} date={band.date} location={band.location} />
      <div style={{ display: "flex", justifyContent: 'space-between', gap: 40, margin: "40px 0 40px 0" }}>
        <div style={{ flexGrow: 1, flexBasis: '50%'}}>
          <Description
            imageUrl={band.imgUrl}
            description={band.description_blurb}
          />
        </div>
        <div style={{ flexGrow: 1, flexBasis: '50%'}}>
          <Form ticketTypes={band.ticketTypes} />
        </div>
      </div>
    </div>
  );
}

export default BandForm;

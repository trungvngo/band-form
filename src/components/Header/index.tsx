type HeaderProps = {
  bandName: string;
  date: number;
  location: string;
};

const Header: React.FC<HeaderProps> = ({ bandName, date, location }) => {
  const formattedDate = new Date(date);
  return (
    <div style={{ margin: "20px 0 20px 0" }}>
      <h1>{bandName}</h1>
      <div style={{ marginBottom: 10 }}>{formattedDate.toDateString()}</div>
      <div style={{ marginBottom: 10 }}>{location}</div>
    </div>
  );
};

export default Header;

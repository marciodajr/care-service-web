import './styles.css';

export const App = () => {
  return (
    <div className="app">
      <h2>
        Service IP Address
      </h2>
      <h2 className="ip">[INTERNAL_IP]</h2>
      <h4>[INTERNAL_TIMESTAMP]</h4>
    </div>
  );
}


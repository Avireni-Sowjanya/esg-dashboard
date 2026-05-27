import { useState } from "react";

function App() {
  const [records, setRecords] = useState([
    {
      id: 1,
      source: "SAP",
      activity_type: "Diesel",
      quantity: 1200,
      unit: "Liters",
      status: "PENDING",
      suspicious: false,
    },
    {
      id: 2,
      source: "UTILITY",
      activity_type: "Electricity",
      quantity: 9500,
      unit: "kWh",
      status: "PENDING",
      suspicious: false,
    },
    {
      id: 3,
      source: "TRAVEL",
      activity_type: "Flight",
      quantity: 20000,
      unit: "km",
      status: "PENDING",
      suspicious: true,
    },
  ]);

  const updateStatus = (id, status) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: status } : r
      )
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>ESG Data Review Dashboard</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Source</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Status</th>
            <th>Suspicious</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {records.map((r) => (
            <tr
              key={r.id}
              style={{
                backgroundColor: r.suspicious ? "#ffcccc" : "white",
              }}
            >
              <td>{r.id}</td>
              <td>{r.source}</td>
              <td>{r.activity_type}</td>
              <td>{r.quantity}</td>
              <td>{r.unit}</td>
              <td>{r.status}</td>
              <td>{r.suspicious ? "YES" : "NO"}</td>

              <td>
                <button
                  onClick={() => updateStatus(r.id, "APPROVED")}
                  style={{ marginRight: 10 }}
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(r.id, "REJECTED")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
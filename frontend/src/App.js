import { useEffect, useState } from "react";
console.log("NEW APPJS");
function App() {
  const [records, setRecords] = useState([]);

  // Load data
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/records/")
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .catch((err) => console.log("Fetch error:", err));
  }, []);

  // Update status (APPROVE / REJECT)
  const updateStatus = (id, status) => {
    fetch(`http://127.0.0.1:8000/api/records/${id}/update/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("UPDATE RESPONSE:", data);

        // update UI instantly
        setRecords((prev) =>
          prev.map((r) =>
            r.id === id ? { ...r, status: status } : r
          )
        );
      })
      .catch((err) => console.log("Update error:", err));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>ESG Data Review Dashboard</h1>

      <table border="1" cellPadding="8">
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
          {records.length === 0 ? (
            <tr>
              <td colSpan="8">Loading...</td>
            </tr>
          ) : (
            records.map((r) => (
              <tr key={r.id}>
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
import axios from "axios";
import React, { useEffect, useState } from "react";

const Checks = () => {
  const [checksData, setChecksData] = useState([]); // Store check data
  const [error, setError] = useState(null); // Store error messages
  const [loading, setLoading] = useState(true); // Store loading state

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/checks")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success" && Array.isArray(data.data)) {
          setChecksData(data.data);
        }
      })
      .catch((error) => console.error("Error fetching invoices:", error));
  }, []);

  return (
    <div className="container-sm mx-auto custom_container">
      {error && <p className="alert alert-danger">{error}</p>}{" "}
      {/* Display error if any */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Company</th>
            <th scope="col">Check #</th>
            <th scope="col">Invoices</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>
          {checksData.length > 0 ? (
            checksData.map((check) => (
              <tr key={check.id}>
                <td>{new Date(check.created_at).toLocaleDateString()}</td>{" "}
                {/* Format Date */}
                <td>{check.name}</td>
                <td>{check.check_number}</td>
                <td>{check.invoice_numbers}</td>
                <td>
                  {check.image_data ? (
                    <img
                      src={
                        `data:${check.image_data.content_type};base64,${check.image_data.base64}` ||
                        "https://placehold.co/70x70"
                      }
                      alt="Check"
                      width="70"
                      height="70  "
                    />
                  ) : (
                    <p>No Image</p>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center" colSpan="4">
                No checks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Checks;

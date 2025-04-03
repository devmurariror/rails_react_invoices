import React, { useEffect, useState } from "react";
import axios from "axios";

const Companies = () => {
  const [companies, setCompanies] = useState([]); // Store company data
  const [error, setError] = useState(null); // Store error messages
  const [loading, setLoading] = useState(true); // Store loading state

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/companies")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success" && Array.isArray(data.data)) {
          setCompanies(data.data);
        }
      })
      .catch((error) => console.error("Error fetching invoices:", error));
  }, []);

  return (
    <div className="container-sm mx-auto custom_container" >
      {/* <h2 className="text-center my-4">Companies</h2> */}
      {error && <p className="alert alert-danger">{error}</p>}{" "}
      {/* Display error if any */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Company</th>
          </tr>
        </thead>
        <tbody>
          {companies.length > 0 ? (
            companies.map((company) => (
              <tr key={company.id}>
                <td scope="row">{company.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center" colSpan="1">
                No companies found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Companies;

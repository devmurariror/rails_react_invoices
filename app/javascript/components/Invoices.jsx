import React, { useEffect, useState } from "react";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/invoices")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success" && Array.isArray(data.data)) {
          setInvoices(data.data);
        }
      })
      .catch((error) => console.error("Error fetching invoices:", error));
  }, []);

  return (
    <div className="container-sm mx-auto custom_container" >
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Invoice #</th>
            <th scope="col">Company</th>
            <th scope="col">Check #</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length > 0 ? (
            invoices.map((invoice, index) => (
              <tr key={index}>
                <td>{invoice.invoice_number}</td>
                <td>{invoice.company_name}</td>
                <td>{invoice.check_number}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No invoices found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const Capture = () => {
  const webcamRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [apiResponseData, setApiResponseData] = useState(null);
  const [formData, setFormData] = useState({
    checkNumber: "",
    capturedImage: null,
    companyId: "",
    invoiceNumbers: "",
  });
  const [companiesData, setCompaniesData] = useState([]);

  useEffect(() => {
    fetch("https://rails-react-invoices-d6tf.onrender.com/api/v1/companies")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success" && Array.isArray(data.data)) {
          setCompaniesData(data.data);
        }
      })
      .catch((error) => console.error("Error fetching invoices:", error));
  }, []);

  const emojiUrl = "/assets/emoji.png"; // Rails serves assets from /assets/

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setFormData((prev) => ({ ...prev, capturedImage: imageSrc }));
      setShowWebcam(false);
    }
  };

  const validateForm = () => {
    const { checkNumber, capturedImage, companyId, invoiceNumbers } = formData;
    if (!checkNumber || !capturedImage || !companyId || !invoiceNumbers) {
      alert("All fields are required!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      check: {
        number: formData.checkNumber,
        image_data: formData.capturedImage,
      },
      company_id: formData.companyId,
      invoice_numbers: formData.invoiceNumbers,
    };

    try {
      const response = await axios.post(
        "https://rails-react-invoices-d6tf.onrender.com/api/v1/check_invoices",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.status === "success") {
        setIsSubmit(true); // Set isSubmit to true on success
        setApiResponseData(response.data.data); // Store the API response data
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data.");
    }
  };

  return (
    <>
      {isSubmit ? (
        <div
          className="container-sm mx-auto"
          style={{ maxWidth: "768px", marginTop: "20px" }}
        >
          <div
            className="card"
            style={{
              maxWidth: "100%",
              marginBlock: "auto",
              marginInline: "50px",
            }}
          >
            <div
              className="card-body"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                gap: 30,
              }}
            >
              <div>
                <h5 className="card-title">
                  {apiResponseData ? `${apiResponseData.company_name}` : ""}
                </h5>
                <p className="card-text" style={{margin:0}}>
                  {apiResponseData
                    ? `Check: ${apiResponseData.check_number}`
                    : ""}
                </p>
                <p className="card-text" style={{margin:0}}>Uploaded !</p>
              </div>
              <div>
                <img src={emojiUrl} alt="" width={100} height={100} />
              </div>
              <div>
                <p className="card-text" style={{margin:0}}>Invoices</p>
                <p className="card-text" style={{margin:0}}>
                  {apiResponseData
                    ? `${apiResponseData.invoices.join(",")}`
                    : ""}
                </p>
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={() => setIsSubmit(!isSubmit)}
              >
                Upload New Check
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="container-sm mx-auto"
          style={{ maxWidth: "768px", marginTop: "20px" }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Capture Image Section */}
            <div className="row g-3 justify-content-between">
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-primary mb-3"
                  onClick={() => setShowWebcam(!showWebcam)}
                >
                  {showWebcam ? "Close Camera" : "Capture Image"}
                </button>
              </div>
              <div className="col-auto">
                <img
                  src={
                    formData.capturedImage || "https://placehold.co/100x100"
                  }
                  className="rounded"
                  alt="Captured"
                  width={100}
                  height={100}
                />
              </div>
            </div>

            {/* Webcam */}
            {showWebcam && (
              <div className="d-flex flex-column align-items-center">
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="border rounded"
                  width={300}
                  height={250}
                />
                <button
                  type="button"
                  className="btn btn-success mt-2"
                  onClick={captureImage}
                >
                  Capture
                </button>
              </div>
            )}

            {/* Textarea for Invoices */}
            <div className="mb-3">
              <label htmlFor="invoiceNumbers" className="form-label">
                Invoices
              </label>
              <textarea
                className="form-control"
                id="invoiceNumbers"
                name="invoiceNumbers"
                rows="4"
                placeholder="Enter your invoice numbers"
                value={formData.invoiceNumbers}
                onChange={handleChange}
              />
            </div>

            {/* Company Dropdown */}
            <div className="input-group mb-3">
              <select
                className="form-select"
                id="companyId"
                name="companyId"
                value={formData.companyId}
                onChange={handleChange}
              >
                <option value="">Select Company</option>
                {companiesData.length > 0 ? (
                  companiesData.map((ele) => (
                    <option key={ele.id} value={ele.id}>
                      {ele.name}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </>
                )}
              </select>
            </div>

            {/* Check Number Input */}
            <div className="mb-3 row">
              <label htmlFor="checkNumber" className="col-sm-2 col-form-label">
                # Check
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="checkNumber"
                  name="checkNumber"
                  value={formData.checkNumber}
                  onChange={handleChange}
                  placeholder="Enter check number"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button type="submit" className="btn btn-primary mb-3 w-100">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Capture;

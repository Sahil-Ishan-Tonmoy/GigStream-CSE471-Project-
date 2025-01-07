import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../css/ApplyPage.css"; // Custom CSS for further styling
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const ApplyPage = () => {
    const {role, id, title, position } = useParams();
    const navigate = useNavigate();

    const [cvAttachment, setCvAttachment] = useState(null);
    const [cvName, setCvName] = useState("Choose PDF file...");
    const [whyJoin, setWhyJoin] = useState("");
    const [whatCanOffer, setWhatCanOffer] = useState("");
    const [charCountWhy, setCharCountWhy] = useState(0);
    const [charCountOffer, setCharCountOffer] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setCvAttachment(file);
            setCvName(file.name);
        } else {
            setCvAttachment(null);
            setCvName("Invalid file type! Please upload a PDF.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        // Create FormData object
        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", title);
        formData.append("position", position);
        formData.append("cvAttachment", cvAttachment); // Append the file
        formData.append("whyJoin", whyJoin);
        formData.append("whatCanOffer", whatCanOffer);
    
        try {
            const response = await fetch("http://localhost:4000/apply", {
                method: "POST",
                body: formData, // Send FormData instead of JSON
            });
    
            if (!response.ok) {
                throw new Error(await response.text());
            }
    
            alert("Application submitted successfully!");
            setCvAttachment(null);
            setCvName("Choose PDF file...");
            setWhyJoin("");
            setWhatCanOffer("");
            setCharCountWhy(0);
            setCharCountOffer(0);
            navigate(`/search/${role}/${id}/details/gig/${title}`);
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };
    

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h1 className="text-center mb-4">Apply for {position} in {title}</h1>
                <form onSubmit={handleSubmit}>
                    {/* CV Upload */}
                    <div className="mb-3">
                        <label htmlFor="cvAttachment" className="form-label">Upload CV (PDF only)</label>
                        <div className="input-group">
                            <label className="input-group-text btn btn-primary" htmlFor="cvAttachment">
                                Browse
                            </label>
                            <input
                                type="file"
                                id="cvAttachment"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="form-control visually-hidden"
                            />
                            <span className="form-control text-truncate">{cvName}</span>
                        </div>
                    </div>

                    {/* Why Join */}
                    <div className="mb-3">
                        <label htmlFor="whyJoin" className="form-label">Why do you want to join?</label>
                        <textarea
                            id="whyJoin"
                            value={whyJoin}
                            onChange={(e) => {
                                setWhyJoin(e.target.value);
                                setCharCountWhy(e.target.value.length);
                            }}
                            placeholder="Share your motivation for applying"
                            maxLength={400}
                            rows="5"
                            className="form-control"
                            required
                        ></textarea>
                        <div className="text-end">
                            <small className="text-muted">{charCountWhy}/400</small>
                        </div>
                    </div>

                    {/* What Can You Offer */}
                    <div className="mb-3">
                        <label htmlFor="whatCanOffer" className="form-label">What can you offer?</label>
                        <textarea
                            id="whatCanOffer"
                            value={whatCanOffer}
                            onChange={(e) => {
                                setWhatCanOffer(e.target.value);
                                setCharCountOffer(e.target.value.length);
                            }}
                            placeholder="Describe your skills and value addition"
                            maxLength={400}
                            rows="5"
                            className="form-control"
                            required
                        ></textarea>
                        <div className="text-end">
                            <small className="text-muted">{charCountOffer}/400</small>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyPage;

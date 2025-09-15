import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";
import resume from "../resume.json";

export default function Navbar({ title }) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [showChat, setShowChat] = useState(false);

    return (
        <>
            {/* Navbar */}
            <header
                id="header"
                className={`header sticky-top mt-5 mx-4 navbar-light`}
                style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
            >
                <nav
                    className="navbar navbar-expand-lg container shadow px-3 py-3"
                    style={{ borderRadius: "50px" }}
                >
                    <button
                        className="btn btn-sm btn-outline-secondary me-3 d-lg-none"
                        onClick={toggleTheme}
                    >
                        {theme === "light" ? <i className="bi bi-moon"></i> : <i className="bi bi-sun"></i>}
                    </button>
                    <Link
                        to="/"
                        className="navbar-brand fw-bold fs-4 ms-lg-3"
                        style={{ color: "var(--text-color)" }}
                    >
                        Portfolio
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        style={{ color: "var(--text-color)", borderColor: "var(--border-color)" }}
                    >
                        <i className="bi bi-list"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a href="/" className={`nav-link`}>Home</a>
                            </li>
                            {[
                                "About",
                                "Resume",
                                "Skills",
                                "Certificate",
                                "Portfolio",
                                "Testimonials",
                                "Services",
                                "Contact",
                            ].map((item, index) => (
                                <li className="nav-item" key={index}>
                                    <a href={`#${item.toLowerCase()}`} className={`nav-link`}>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="d-none d-lg-inline-block ms-4 fs-5">
                            <a href={resume.contact.github} target="_blank" rel="noreferrer" className="me-3">
                                <i className="bi bi-github"></i>
                            </a>
                            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="me-3">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="https://www.instagram.com/_ishaan_12" target="_blank" rel="noreferrer" className="me-3">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href={resume.contact.linkedin} target="_blank" rel="noreferrer" className="me-3">
                                <i className="bi bi-linkedin"></i>
                            </a>
                        </div>

                        <button
                            className="btn btn-sm btn-outline-secondary ms-3 d-none d-lg-inline-block"
                            onClick={toggleTheme}
                        >
                            {theme === "light" ? <i className="bi bi-moon"></i> : <i className="bi bi-sun"></i>}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Floating Chatbot Button */}
            <button
                onClick={() => setShowChat(true)}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    backgroundColor: "gold",
                    color: "black",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                    zIndex: 1050,
                }}
            >
                <i className="bi bi-robot"></i>
            </button>

            {/* Chat Modal */}
            {showChat && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}
                >
                    {/* Increased width to 500px */}
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "500px" }}>
                        <div className="modal-content" style={{ borderRadius: "16px", overflow: "hidden" }}>
                            <div className="modal-header bg-primary text-white py-2">
                                <h6 className="modal-title">
                                    <i className="bi bi-robot me-2"></i>Helping Assistant
                                </h6>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={() => setShowChat(false)}
                                ></button>
                            </div>
                            <ChatbotUI />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

const ChatbotUI = () => {
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "👋 Hi! I'm Ishaan's Resume Assistant. Ask me about skills, projects, services, education, or contact info!",
        },
    ]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [showProjectButtons, setShowProjectButtons] = useState(false);
    const [showServiceButtons, setShowServiceButtons] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typing]);

    const getBotReply = (q) => {
        q = q.toLowerCase();

        if (q.includes("skill")) return `⚡ Skills:\n- ${resume.skills.join("\n- ")}`;
        if (q.includes("achievement")) return resume.achievements.join("\n");
        if (q.includes("education")) {
            return (
                <div>
                    <h6>📜 Education :</h6>
                    <ul>
                        {Object.entries(resume.education).map(([level, details], i) => (
                            <li key={i}>
                                <b>{level}</b>: {details.institute}, {details.location} - {details.percentage}%
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        if (q.includes("certificate")) {
            return (
                <div>
                    <h6>📜 Certificates:</h6>
                    <ul>
                        {resume.certificates?.map((c, i) => (
                            <li key={i}>{c.name} - {c.issuer} ({c.year})</li>
                        ))}
                    </ul>
                </div>
            );
        }
        if (q.includes("contact") || q.includes("email")) {
            return (
                <div>
                    <p>📧 <b>Email:</b> {resume.contact.email}</p>
                    <p>🐙 <b>GitHub:</b> <a href={resume.contact.github} target="_blank" rel="noreferrer">{resume.contact.github}</a></p>
                    <p>💼 <b>LinkedIn:</b> <a href={resume.contact.linkedin} target="_blank" rel="noreferrer">{resume.contact.linkedin}</a></p>
                    <p>🌐 <b>Portfolio:</b> <a href={resume.contact.portfolio} target="_blank" rel="noreferrer">{resume.contact.portfolio}</a></p>
                    <p>📞 <b>Contact Form:</b> <a href="#contact">Go to Contact Section</a></p>
                </div>
            );
        }

        // Projects
        if (q.includes("project") || q.includes("projects")) {
            setShowProjectButtons(true);
            return (
                <div>
                    <h6>💡 Projects (short overview):</h6>
                    <ul style={{ paddingLeft: "20px", margin: "5px 0" }}>
                        {Object.entries(resume.projects).map(([name, details], i) => (
                            <li key={i}>
                                <b>{name}</b> - {details.short}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-2 text-muted"><i>ℹ️ Click a specific project button below for full details.</i></p>
                </div>
            );
        }

        // Services
        if (q.includes("service") || q.includes("services")) {
            setShowServiceButtons(true);
            return (
                <div>
                    <h6>🛠️ Services (short overview):</h6>
                    <ul style={{ paddingLeft: "20px", margin: "5px 0" }}>
                        {resume.services?.map((s, i) => (
                            <li key={i}>
                                <b>{s.name}</b> - {s.shortDescription}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-2 text-muted"><i>ℹ️ Click a specific service button below for full details.</i></p>
                </div>
            );
        }

        // Check for specific project
        const projectKey = Object.keys(resume.projects).find(
            (key) => key.toLowerCase() === q
        );
        if (projectKey) {
            const p = resume.projects[projectKey];
            return (
                <div>
                    <h6>📌 {projectKey}</h6>
                    <p>{p.desc}</p>
                    {p.points && (
                        <ul>
                            {p.points.map((pt, i) => (
                                <li key={i}>{pt}</li>
                            ))}
                        </ul>
                    )}
                    <a href={p.link} target="_blank" rel="noreferrer">🔗 Visit Project</a>
                </div>
            );
        }

        // Check for specific service
        const service = resume.services?.find(
            (s) => s.name.toLowerCase() === q
        );
        if (service) {
            return (
                <div>
                    <h6>🛠️ {service.name}</h6>
                    <p>{service.longDescription.replace(/<[^>]+>/g, "")}</p>
                    <p><b>Category:</b> {service.category}</p>
                    <p><b>Technologies:</b> {service.technology}</p>
                    <p><b>Price:</b> ${service.price}</p>
                    <p><b>Duration:</b> {service.duration} weeks</p>
                </div>
            );
        }

        return (
            <div>
                🤔 Sorry, I don’t have info on that. Try asking about skills, education, projects, services, certificates, or contact.  
                <br />
                <a href="#contact" style={{ color: "blue", textDecoration: "underline" }}>
                    Go to Contact Section
                </a>
            </div>
        );
    };

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages((prev) => [...prev, { sender: "user", text: input }]);
        setTyping(true);

        const reply = getBotReply(input);

        setTimeout(() => {
            setTyping(false);
            setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
        }, 900);

        setInput("");
    };

    return (
        <div className="modal-body d-flex flex-column p-0" style={{ minHeight: "450px", background: "linear-gradient(135deg, #f9f9f9, #eef2f7)" }}>
            {/* Chat Messages */}
            <div className="flex-grow-1 mb-2 p-3" style={{ overflowY: "auto", maxHeight: "340px", scrollbarWidth: "thin", background: "rgba(255, 255, 255, 0.7)" }}>
                {messages.map((msg, i) => (
                    <div key={i} className={`d-flex my-2 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
                        <div className="px-3 py-2 shadow-sm" style={{
                            maxWidth: "75%",
                            fontSize: "0.9rem",
                            lineHeight: "1.4",
                            backgroundColor: msg.sender === "user" ? "#007bff" : "#ffffff",
                            color: msg.sender === "user" ? "white" : "#333",
                            borderRadius: msg.sender === "user" ? "14px 14px 0px 14px" : "14px 14px 14px 0px",
                            whiteSpace: "pre-line",
                            border: msg.sender === "bot" ? "1px solid #e0e0e0" : "none",
                        }}>
                            {msg.sender === "bot" ? "🤖 " : "🙋 "} {msg.text}
                        </div>
                    </div>
                ))}
                {typing && (
                    <div className="d-flex justify-content-start my-2">
                        <div className="px-3 py-2 rounded-3 bg-light text-muted shadow-sm" style={{ fontSize: "0.8rem", borderRadius: "14px 14px 14px 0px" }}>
                            🤖 Typing...
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-2 border-top bg-white">
                <div className="input-group rounded-pill shadow-sm">
                    <input
                        type="text"
                        className="form-control border-0 rounded-pill ps-3"
                        placeholder="Type your question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button className="btn btn-primary rounded-pill px-4" onClick={handleSend}>
                        <i className="bi bi-send-fill"></i>
                    </button>
                </div>
            </div>

            {/* Quick Buttons */}
            <div className="p-2 border-top bg-light">
                <h6 className="mb-2 text-dark">Quick Questions:</h6>
                <div className="d-flex flex-wrap">
                    {["Skills", "Projects", "Services", "Education", "Certificates", "Contact"].map((q, i) => (
                        <button
                            key={i}
                            className="btn btn-sm btn-outline-primary rounded-pill me-2 mb-2"
                            style={{ fontSize: "1rem", padding: "4px 10px" }}
                            onClick={() => { setInput(q); setTimeout(handleSend, 100); }}
                        >
                            {q}
                        </button>
                    ))}
                </div>

                {/* Project buttons */}
                {showProjectButtons && (
                    <div className="mt-2">
                        <h6 className="text-dark">Select a Project:</h6>
                        <div className="d-flex flex-wrap">
                            {Object.keys(resume.projects).map((p, i) => (
                                <button key={i} className="btn btn-sm btn-outline-success rounded-pill me-2 mb-2"
                                    style={{ fontSize: "0.75rem", padding: "3px 8px" }}
                                    onClick={() => { setInput(p); setTimeout(handleSend, 100); }}>
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Service buttons */}
                {showServiceButtons && (
                    <div className="mt-2">
                        <h6 className="text-dark">Select a Service:</h6>
                        <div className="d-flex flex-wrap">
                            {resume.services?.map((s, i) => (
                                <button key={i} className="btn btn-sm btn-outline-warning rounded-pill me-2 mb-2"
                                    style={{ fontSize: "0.75rem", padding: "3px 8px" }}
                                    onClick={() => { setInput(s.name); setTimeout(handleSend, 100); }}>
                                    {s.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

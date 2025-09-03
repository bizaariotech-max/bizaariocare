import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function FAQ() {
  const faqs = [
    { question: "How do I register as a doctor on the portal?", answer: "You can register by visiting our signup page and selecting 'Doctor' as your role. Fill out the required details and submit the verification documents." },
    { question: "Is my data and patient information secure?", answer: "Yes, we use industry-standard encryption and follow strict security protocols to ensure your data is safe." },
    { question: "Can I manage my appointments through the portal?", answer: "Yes, you can schedule, reschedule, and cancel appointments directly from your dashboard." },
    { question: "Can I access the portal on my mobile phone?", answer: "Absolutely, the portal is fully responsive and works on mobile browsers." },
    { question: "How can I collaborate with other doctors or specialists?", answer: "You can connect and collaborate using the built-in messaging and referral system." },
  ];

  return (
    <div className="contact-faq">
      <Accordion alwaysOpen >
        {faqs.map((faq, index) => (
          <Accordion.Item eventKey={index.toString()} key={index} className="mb-2" >
            <Accordion.Header >
              <span className="me-auto">{faq.question}</span>
              {/* <FaPlus className="ms-2" /> */}
            </Accordion.Header >
            <Accordion.Body >
              {faq.answer}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

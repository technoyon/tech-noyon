import React, { useEffect, useState, useRef } from "react";
import "./Invoice.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = ({ url }) => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [note, setNote] = useState("");
  const invoiceRef = useRef();

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return (
      date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }) +
      " " +
      date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    );
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(url + "/api/order/list");
        if (response.data.success) {
          const found = response.data.data.find((o) => o._id === id);
          setOrder(found || null);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const generatePdf = async (orderData = order, noteText = note) => {
    if (!invoiceRef.current || !orderData) return;
    const input = invoiceRef.current;
    try {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice_${orderData._id}.pdf`);
    } catch (err) {
      console.error(err);
    }
  };

  if (!order) {
    return <div className="invoice-page">Loading invoice...</div>;
  }

  const subtotal = order.items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 1), 0);
  const delivery = Math.max(0, (order.amount || 0) - subtotal);
  const total = order.amount || subtotal + delivery;

  return (
    <div className="invoice-page">
      <div className="invoice-container">
        <div className="invoice-actions">
          <button onClick={() => generatePdf()}>Download PDF</button>
        </div>

        <div className="invoice-sheet" ref={invoiceRef}>
          <header className="invoice-header">
            <h2>Invoice</h2>
            <div className="invoice-date">
              <small>
                <strong>Date:</strong> {formatDate(order.date)}
              </small>
            </div>
          </header>

          <div className="order-id-box" role="status" aria-label={`Order ID ${order._id}`}>
            <small>
              <strong>Order ID:</strong> {order._id}
            </small>
          </div>

          <section className="invoice-customer">
            <h4>Billed To</h4>
            <p>{order.address.firstName} {order.address.lastName}</p>
            <p>{order.address.address}, {order.address.city}</p>
            <p>{order.address.phone}</p>
          </section>

          <table className="invoice-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Item name</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((it, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{it.name}</td>
                  <td>{it.quantity || 1}</td>
                  <td>{it.price || 0} TK</td>
                  <td>{(it.price || 0) * (it.quantity || 1)} TK</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="invoice-totals">
            <div className="totals-row">
              <p>Subtotal</p>
              <p>{subtotal} TK</p>
            </div>
            <div className="totals-row">
              <p>Delivery Charge</p>
              <p>{delivery} TK</p>
            </div>
            <div className="totals-row total-amount">
              <p>Total</p>
              <p>{total} TK</p>
            </div>
          </div>

          {/* <div className="invoice-note">
            <label className="inc">Note / Remarks:</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Write something..." />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Invoice;

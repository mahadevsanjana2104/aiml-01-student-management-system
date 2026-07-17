import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import PageSection from "../components/common/PageSection";
import { createMarks, deleteMarks, getMarks } from "../services/marksService";

const emptyMarks = { studentId: "", courseId: "", internalMarks: "", externalMarks: "", totalMarks: "", grade: "" };

export default function Marks() {
  const [marks, setMarks] = useState([]);
  const [form, setForm] = useState(emptyMarks);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  const loadMarks = async () => {
    setLoading(true);
    const result = await getMarks();
    if (result.success) {
      setMarks(result.data || []);
    } else {
      setMessage({ type: "error", text: result.message || "Could not load marks." });
    }
    setLoading(false);
  };

  useEffect(() => { loadMarks(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createMarks({
      ...form,
      studentId: Number(form.studentId),
      courseId: Number(form.courseId),
      internalMarks: Number(form.internalMarks),
      externalMarks: Number(form.externalMarks),
      totalMarks: Number(form.totalMarks),
    });
    if (result.success) {
      setMessage({ type: "success", text: "Marks saved successfully." });
      setForm(emptyMarks);
      loadMarks();
    } else {
      setMessage({ type: "error", text: result.message || "Unable to save marks." });
    }
  };

  const handleDelete = async (id) => {
    const result = await deleteMarks(id);
    if (result.success) {
      setMessage({ type: "success", text: "Marks record removed." });
      loadMarks();
    } else {
      setMessage({ type: "error", text: result.message || "Unable to delete marks." });
    }
  };

  return (
    <Layout>
      <PageSection title="Marks" subtitle="Record internal, external, and total marks.">
        {message.text ? <div className={`message ${message.type}`}>{message.text}</div> : null}
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px", marginBottom: "20px" }}>
          <div className="grid-3">
            <div className="form-group"><label>Student ID</label><input name="studentId" type="number" value={form.studentId} onChange={handleChange} required /></div>
            <div className="form-group"><label>Course ID</label><input name="courseId" type="number" value={form.courseId} onChange={handleChange} required /></div>
            <div className="form-group"><label>Grade</label><input name="grade" value={form.grade} onChange={handleChange} /></div>
          </div>
          <div className="grid-3">
            <div className="form-group"><label>Internal</label><input name="internalMarks" type="number" value={form.internalMarks} onChange={handleChange} /></div>
            <div className="form-group"><label>External</label><input name="externalMarks" type="number" value={form.externalMarks} onChange={handleChange} /></div>
            <div className="form-group"><label>Total</label><input name="totalMarks" type="number" value={form.totalMarks} onChange={handleChange} /></div>
          </div>
          <button className="primary-btn" type="submit" style={{ width: "auto", marginTop: 0 }}>Save Marks</button>
        </form>

        <div className="table-card">
          {loading ? <div className="loading">Loading marks...</div> : null}
          {!loading ? (
            <table>
              <thead><tr><th>Student ID</th><th>Course ID</th><th>Internal</th><th>External</th><th>Total</th><th>Grade</th><th>Action</th></tr></thead>
              <tbody>
                {marks.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.studentId}</td>
                    <td>{entry.courseId}</td>
                    <td>{entry.internalMarks}</td>
                    <td>{entry.externalMarks}</td>
                    <td>{entry.totalMarks}</td>
                    <td>{entry.grade}</td>
                    <td><button className="secondary-btn" onClick={() => handleDelete(entry.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      </PageSection>
    </Layout>
  );
}
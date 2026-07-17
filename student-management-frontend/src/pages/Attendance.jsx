import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import PageSection from "../components/common/PageSection";
import { createAttendance, deleteAttendance, getAttendance } from "../services/attendanceService";

const emptyAttendance = { studentId: "", courseId: "", date: "", status: "PRESENT" };

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [form, setForm] = useState(emptyAttendance);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  const loadAttendance = async () => {
    setLoading(true);
    const result = await getAttendance();
    if (result.success) {
      setAttendance(result.data || []);
    } else {
      setMessage({ type: "error", text: result.message || "Could not load attendance." });
    }
    setLoading(false);
  };

  useEffect(() => { loadAttendance(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createAttendance({ ...form, studentId: Number(form.studentId), courseId: Number(form.courseId) });
    if (result.success) {
      setMessage({ type: "success", text: "Attendance marked." });
      setForm(emptyAttendance);
      loadAttendance();
    } else {
      setMessage({ type: "error", text: result.message || "Unable to mark attendance." });
    }
  };

  const handleDelete = async (id) => {
    const result = await deleteAttendance(id);
    if (result.success) {
      setMessage({ type: "success", text: "Attendance record removed." });
      loadAttendance();
    } else {
      setMessage({ type: "error", text: result.message || "Unable to delete attendance." });
    }
  };

  return (
    <Layout>
      <PageSection title="Attendance" subtitle="Track student attendance records.">
        {message.text ? <div className={`message ${message.type}`}>{message.text}</div> : null}
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px", marginBottom: "20px" }}>
          <div className="grid-3">
            <div className="form-group"><label>Student ID</label><input name="studentId" type="number" value={form.studentId} onChange={handleChange} required /></div>
            <div className="form-group"><label>Course ID</label><input name="courseId" type="number" value={form.courseId} onChange={handleChange} required /></div>
            <div className="form-group"><label>Date</label><input name="date" type="date" value={form.date} onChange={handleChange} required /></div>
          </div>
          <div className="grid-3">
            <div className="form-group"><label>Status</label><select name="status" value={form.status} onChange={handleChange}><option value="PRESENT">PRESENT</option><option value="ABSENT">ABSENT</option></select></div>
            <button className="primary-btn" type="submit" style={{ width: "auto", marginTop: 0 }}>Mark Attendance</button>
          </div>
        </form>

        <div className="table-card">
          {loading ? <div className="loading">Loading attendance...</div> : null}
          {!loading ? (
            <table>
              <thead><tr><th>Student ID</th><th>Course ID</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {attendance.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.studentId}</td>
                    <td>{entry.courseId}</td>
                    <td>{entry.date}</td>
                    <td>{entry.status}</td>
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
import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import PageSection from "../components/common/PageSection";
import { createFaculty, deleteFaculty, getFaculty, updateFaculty } from "../services/facultyService";

const emptyFaculty = { name: "", email: "", phone: "", department: "", designation: "" };

export default function Teachers() {
  const [faculty, setFaculty] = useState([]);
  const [form, setForm] = useState(emptyFaculty);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  const loadFaculty = async () => {
    setLoading(true);
    const result = await getFaculty();
    if (result.success) {
      setFaculty(result.data || []);
    } else {
      setMessage({ type: "error", text: result.message || "Could not load faculty." });
    }
    setLoading(false);
  };

  useEffect(() => { loadFaculty(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createFaculty(form);
    if (result.success) {
      setMessage({ type: "success", text: "Faculty member added successfully." });
      setForm(emptyFaculty);
      loadFaculty();
    } else {
      setMessage({ type: "error", text: result.message || "Unable to add faculty." });
    }
  };

  const handleUpdate = async (member) => {
    const result = await updateFaculty(member.id, member);
    if (result.success) {
      setMessage({ type: "success", text: "Faculty updated successfully." });
      loadFaculty();
    } else {
      setMessage({ type: "error", text: result.message || "Unable to update faculty." });
    }
  };

  const handleDelete = async (id) => {
    const result = await deleteFaculty(id);
    if (result.success) {
      setMessage({ type: "success", text: "Faculty removed." });
      loadFaculty();
    } else {
      setMessage({ type: "error", text: result.message || "Unable to delete faculty." });
    }
  };

  return (
    <Layout>
      <PageSection title="Teachers" subtitle="Manage faculty records.">
        {message.text ? <div className={`message ${message.type}`}>{message.text}</div> : null}
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px", marginBottom: "20px" }}>
          <div className="grid-3">
            <div className="form-group"><label>Name</label><input name="name" value={form.name} onChange={handleChange} required /></div>
            <div className="form-group"><label>Email</label><input name="email" type="email" value={form.email} onChange={handleChange} required /></div>
            <div className="form-group"><label>Phone</label><input name="phone" value={form.phone} onChange={handleChange} required /></div>
          </div>
          <div className="grid-3">
            <div className="form-group"><label>Department</label><input name="department" value={form.department} onChange={handleChange} required /></div>
            <div className="form-group"><label>Designation</label><input name="designation" value={form.designation} onChange={handleChange} required /></div>
            <button className="primary-btn" type="submit" style={{ width: "auto", marginTop: 0 }}>Add Faculty</button>
          </div>
        </form>

        <div className="table-card">
          {loading ? <div className="loading">Loading faculty...</div> : null}
          {!loading ? (
            <table>
              <thead><tr><th>Name</th><th>Email</th><th>Department</th><th>Designation</th><th>Action</th></tr></thead>
              <tbody>
                {faculty.map((member) => (
                  <tr key={member.id}>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>{member.department}</td>
                    <td>{member.designation}</td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="secondary-btn" onClick={() => handleUpdate(member)}>Update</button>
                        <button className="secondary-btn" onClick={() => handleDelete(member.id)}>Delete</button>
                      </div>
                    </td>
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
import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import PageSection from "../components/common/PageSection";
import { createStudent, deleteStudent, enrollStudent, getStudents, updateStudent } from "../services/studentService";

const emptyStudent = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  department: "",
  course: "",
  year: "",
  address: "",
};

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyStudent);
  const [enrollment, setEnrollment] = useState({ studentId: "", courseId: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  const loadStudents = async () => {
    setLoading(true);
    const result = await getStudents();
    if (result.success) {
      setStudents(result.data || []);
    } else {
      setMessage({ type: "error", text: result.message || "Could not load students." });
    }
    setLoading(false);
  };

  useEffect(() => { loadStudents(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEnrollmentChange = (e) => {
    setEnrollment({ ...enrollment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const payload = { ...form, year: Number(form.year) || 1 };
    const result = await createStudent(payload);

    if (result.success) {
      setMessage({ type: "success", text: "Student added successfully." });
      setForm(emptyStudent);
      loadStudents();
    } else {
      setMessage({ type: "error", text: result.message || "Unable to add student." });
    }
  };

  const handleUpdate = async (student) => {
    const payload = { ...student, course: student.course || "" };
    const result = await updateStudent(student.id, payload);
    if (result.success) {
      setMessage({ type: "success", text: "Student updated successfully." });
      loadStudents();
    } else {
      setMessage({ type: "error", text: result.message || "Unable to update student." });
    }
  };

  const handleDelete = async (id) => {
    const result = await deleteStudent(id);
    if (result.success) {
      setMessage({ type: "success", text: "Student removed." });
      loadStudents();
    } else {
      setMessage({ type: "error", text: result.message || "Unable to delete student." });
    }
  };

  const handleEnroll = async (e) => {
    e.preventDefault();
    const result = await enrollStudent(Number(enrollment.studentId), Number(enrollment.courseId));
    if (result.success) {
      setMessage({ type: "success", text: "Student enrolled successfully." });
      setEnrollment({ studentId: "", courseId: "" });
      loadStudents();
    } else {
      setMessage({ type: "error", text: result.message || "Unable to enroll student." });
    }
  };

  return (
    <Layout>
      <PageSection title="Students" subtitle="Manage student records and enrollment data.">
        {message.text ? <div className={`message ${message.type}`}>{message.text}</div> : null}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px", marginBottom: "20px" }}>
          <div className="grid-3">
            <div className="form-group"><label>First Name</label><input name="firstName" value={form.firstName} onChange={handleChange} required /></div>
            <div className="form-group"><label>Last Name</label><input name="lastName" value={form.lastName} onChange={handleChange} required /></div>
            <div className="form-group"><label>Email</label><input name="email" type="email" value={form.email} onChange={handleChange} required /></div>
          </div>
          <div className="grid-3">
            <div className="form-group"><label>Phone</label><input name="phone" value={form.phone} onChange={handleChange} required /></div>
            <div className="form-group"><label>Department</label><input name="department" value={form.department} onChange={handleChange} required /></div>
            <div className="form-group"><label>Course</label><input name="course" value={form.course} onChange={handleChange} required /></div>
          </div>
          <div className="grid-3">
            <div className="form-group"><label>Year</label><input name="year" type="number" value={form.year} onChange={handleChange} /></div>
            <div className="form-group"><label>Address</label><input name="address" value={form.address} onChange={handleChange} /></div>
            <button className="primary-btn" type="submit" style={{ width: "auto", marginTop: 0 }}>Add Student</button>
          </div>
        </form>

        <form onSubmit={handleEnroll} style={{ display: "grid", gap: "12px", marginBottom: "20px" }}>
          <div className="grid-3">
            <div className="form-group"><label>Student ID</label><input name="studentId" type="number" value={enrollment.studentId} onChange={handleEnrollmentChange} required /></div>
            <div className="form-group"><label>Course ID</label><input name="courseId" type="number" value={enrollment.courseId} onChange={handleEnrollmentChange} required /></div>
            <button className="primary-btn" type="submit" style={{ width: "auto", marginTop: 0 }}>Enroll</button>
          </div>
        </form>

        <div className="table-card">
          {loading ? <div className="loading">Loading students...</div> : null}
          {!loading ? (
            <table>
              <thead><tr><th>Name</th><th>Email</th><th>Department</th><th>Course</th><th>Actions</th></tr></thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{`${student.firstName || ""} ${student.lastName || ""}`.trim()}</td>
                    <td>{student.email}</td>
                    <td>{student.department}</td>
                    <td>{student.course}</td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="secondary-btn" onClick={() => handleUpdate(student)}>Update</button>
                        <button className="secondary-btn" onClick={() => handleDelete(student.id)}>Delete</button>
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
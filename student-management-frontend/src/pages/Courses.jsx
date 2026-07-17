import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import PageSection from "../components/common/PageSection";
import { createCourse, deleteCourse, getCourses, updateCourse } from "../services/courseService";

const emptyCourse = { courseName: "", courseCode: "", credits: "", facultyId: "" };

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(emptyCourse);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  const loadCourses = async () => {
    setLoading(true);
    const result = await getCourses();
    if (result.success) {
      setCourses(result.data || []);
    } else {
      setMessage({ type: "error", text: result.message || "Could not load courses." });
    }
    setLoading(false);
  };

  useEffect(() => { loadCourses(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createCourse({ ...form, credits: Number(form.credits) || 0, facultyId: Number(form.facultyId) || null });
    if (result.success) {
      setMessage({ type: "success", text: "Course added successfully." });
      setForm(emptyCourse);
      loadCourses();
    } else {
      setMessage({ type: "error", text: result.message || "Unable to add course." });
    }
  };

  const handleUpdate = async (course) => {
    const result = await updateCourse(course.id, course);
    if (result.success) {
      setMessage({ type: "success", text: "Course updated successfully." });
      loadCourses();
    } else {
      setMessage({ type: "error", text: result.message || "Unable to update course." });
    }
  };

  const handleDelete = async (id) => {
    const result = await deleteCourse(id);
    if (result.success) {
      setMessage({ type: "success", text: "Course removed." });
      loadCourses();
    } else {
      setMessage({ type: "error", text: result.message || "Unable to delete course." });
    }
  };

  return (
    <Layout>
      <PageSection title="Courses" subtitle="Manage available courses.">
        {message.text ? <div className={`message ${message.type}`}>{message.text}</div> : null}
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px", marginBottom: "20px" }}>
          <div className="grid-3">
            <div className="form-group"><label>Course Name</label><input name="courseName" value={form.courseName} onChange={handleChange} required /></div>
            <div className="form-group"><label>Course Code</label><input name="courseCode" value={form.courseCode} onChange={handleChange} required /></div>
            <div className="form-group"><label>Credits</label><input name="credits" type="number" value={form.credits} onChange={handleChange} required /></div>
          </div>
          <div className="grid-3">
            <div className="form-group"><label>Faculty ID</label><input name="facultyId" type="number" value={form.facultyId} onChange={handleChange} /></div>
            <button className="primary-btn" type="submit" style={{ width: "auto", marginTop: 0 }}>Add Course</button>
          </div>
        </form>

        <div className="table-card">
          {loading ? <div className="loading">Loading courses...</div> : null}
          {!loading ? (
            <table>
              <thead><tr><th>Course Name</th><th>Code</th><th>Credits</th><th>Faculty ID</th><th>Action</th></tr></thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.courseName}</td>
                    <td>{course.courseCode}</td>
                    <td>{course.credits}</td>
                    <td>{course.facultyId}</td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="secondary-btn" onClick={() => handleUpdate(course)}>Update</button>
                        <button className="secondary-btn" onClick={() => handleDelete(course.id)}>Delete</button>
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
import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import PageSection from "../components/common/PageSection";
import StatusCard from "../components/common/StatusCard";
import { getStudents } from "../services/studentService";
import { getFaculty } from "../services/facultyService";
import { getCourses } from "../services/courseService";

export default function Dashboard() {
  const [stats, setStats] = useState({ students: 0, faculty: 0, courses: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      setError("");

      const [studentsRes, facultyRes, coursesRes] = await Promise.all([
        getStudents(),
        getFaculty(),
        getCourses(),
      ]);

      if (studentsRes.success && facultyRes.success && coursesRes.success) {
        setStats({
          students: studentsRes.data?.length || 0,
          faculty: facultyRes.data?.length || 0,
          courses: coursesRes.data?.length || 0,
        });
      } else {
        setError("Unable to load dashboard data.");
      }

      setLoading(false);
    };

    loadStats();
  }, []);

  return (
    <Layout>
      <PageSection title="Dashboard" subtitle="Overview of the current academic data.">
        {error ? <div className="message error">{error}</div> : null}
        {loading ? <div className="loading">Loading dashboard data...</div> : null}

        {!loading ? (
          <div className="grid-3">
            <StatusCard title="Students" value={stats.students} tone="success" />
            <StatusCard title="Faculty" value={stats.faculty} />
            <StatusCard title="Courses" value={stats.courses} />
          </div>
        ) : null}
      </PageSection>
    </Layout>
  );
}
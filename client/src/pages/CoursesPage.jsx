import React, { useEffect, useState } from 'react';
import { getAllCourses } from '../services/coursesServices';
import { useNavigate } from 'react-router-dom';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Cargar cursos desde la API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (err) {
        setError('No se pudieron cargar los cursos');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (isLoading) return <p>Cargando cursos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center mb-6">Cursos Disponibles</h1>
      <div className="grid gap-4 justify-center w-full"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '16px',
          }}
      >

        {courses.map((course) => (
          <div
            key={course.id}
            className="border p-4 rounded shadow-md w-80 text-center"
          >
            <h2 className="font-semibold text-lg">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
            <button
              className="mt-4 bg-orange-500 text-dark px-4 py-2 rounded"
              onClick={() => navigate(`/inscription/${course.id}`)}
            >
              Inscribirme
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;

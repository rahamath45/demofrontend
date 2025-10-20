import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import teamwork from "../assets/image.svg";


const Home = () => {
  const user = useSelector((s) => s.auth.user);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto p-8">
        <div className="text-center md:text-left md:w-1/2 space-y-6 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Team Task Manager
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            Organize, assign, and track tasks efficiently with your team. Manage your workflow seamlessly in one place.
          </p>
          {!user ? (
            <Link
              to="/register"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transform hover:scale-105 transition duration-300"
            >
              Get Started
            </Link>
          ) : (
            <Link
              to="/tasks"
              className="inline-block bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-medium transform hover:scale-105 transition duration-300"
            >
              Go to Dashboard
            </Link>
          )}
        </div>

        <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center animate-fadeIn">
          <img
            src={teamwork}
            alt="Teamwork Illustration"
            className="rounded-lg shadow-lg max-w-full h-auto transform hover:scale-105 transition duration-500"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-2 animate-slideUp">
          <h3 className="font-semibold text-xl mb-2">Task Management</h3>
          <p className="text-gray-600">Create, assign, and track tasks for your team efficiently.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-2 animate-slideUp delay-100">
          <h3 className="font-semibold text-xl mb-2">Team Collaboration</h3>
          <p className="text-gray-600">Stay in sync with your team, communicate and manage roles easily.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-2 animate-slideUp delay-200">
          <h3 className="font-semibold text-xl mb-2">Progress Tracking</h3>
          <p className="text-gray-600">Visualize project progress with clear dashboards and reports.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

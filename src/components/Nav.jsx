
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearState } from "../slices/authSlice";

const Nav = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <nav className="bg-gray-800 text-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold hover:text-gray-300">
          Team Task Management
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="font-medium">{user.name} ({user.role})</span>
              <button
                onClick={() => dispatch(clearState())}
                className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;

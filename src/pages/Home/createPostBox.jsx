import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const CreatePostBox = () => {
  const { user } = useAuth();

  return (
    <div className="bg-base-100 p-4 rounded-xl shadow mb-4">

      <div className="flex gap-3 items-center">
        <img
          src={user?.photoURL || "https://i.ibb.co/2kR6z6n/user.png"}
          className="w-10 h-10 rounded-full"
        />

        <Link
          to="/createpost"
          className="flex-1 bg-base-200 p-2 rounded-full cursor-pointer"
        >
          What's on your mind?
        </Link>
      </div>

    </div>
  );
};

export default CreatePostBox;

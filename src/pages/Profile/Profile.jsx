import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { auth, db } from "../../Firebase/Firebase.init";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const Profile = () => {
  const { user, loading } = useAuth();
  const storage = getStorage();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [uploading, setUploading] = useState(false);
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        No user found. Please login.
      </div>
    );
  }
  //Conver Photo 
 const handleCoverUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    setUploading(true);
    const storageRef = ref(storage, `covers/${user.uid}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    // update Firestore
    await updateDoc(doc(db, "users", user.uid), {
      coverPhoto: url,
    });
    setCoverPhoto(url);
    Swal.fire("Success", "Cover photo updated!", "success");
  } catch (err) {
    Swal.fire("Error", err.message, "error");
  } finally {
    setUploading(false);
  }
};


  // ---------------- OPEN EDIT ----------------
  const handleEditOpen = () => {
    setName(user.displayName || "");
    setPhoto(user.photoURL || "");
    setBio(profile?.bio || "");
    setSkills(profile?.skills?.join(", ") || "");
    setOpen(true);
  };

  // ---------------- UPDATE PROFILE ----------------
  const handleUpdate = async () => {
    try {
      const userRef = doc(db, "users", user.uid);

      const skillArray = skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      // Firebase Auth update
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });

      // Firestore update
      await updateDoc(userRef, {
        displayName: name,
        photoURL: photo,
        bio,
        skills: skillArray,
      });

      Swal.fire("Success", "Profile updated!", "success");

      setProfile((prev) => ({
        ...prev,
        displayName: name,
        photoURL: photo,
        bio,
        skills: skillArray,
      }));

      setOpen(false);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // PROFILE
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile(data);

          setName(data.displayName || "");
          setPhoto(data.photoURL || "");
          setCoverPhoto(data.coverPhoto || "");
          setBio(data.bio || "");
          setSkills(data.skills ? data.skills.join(", ") : "");
        }

        // POSTS
        const q = query(
          collection(db, "posts"),
          where("authorId", "==", user.uid)
        );

        const snap = await getDocs(q);

        setPosts(
          snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }))
        );
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, [user]);

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">

      {/* HERO */}
      <div className="relative bg-base-100 rounded-2xl shadow-lg overflow-hidden">

        {/* COVER */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        {/* AVATAR */}
        <div className="absolute left-6 -bottom-12">
          <img
            src={photo || user.photoURL || "https://i.ibb.co/2s3zLZP/default-avatar.png"}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
          />
        </div>

        {/* USER INFO */}
        <div className="p-6 pt-16 md:pt-20 flex flex-col md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              {profile?.displayName || user.displayName || "No Name"}
            </h2>
            <p className="text-gray-500">{user.email}</p>
          </div>

          <button className="btn btn-primary mt-3 md:mt-0" onClick={handleEditOpen}>
            Edit Profile
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        {/* BIO */}
        <div className="card bg-base-100 shadow p-4">
          <h3 className="font-bold mb-2">Bio</h3>
          <p>{profile?.bio || "No bio yet"}</p>
        </div>

        {/* STATS */}
        <div className="stats shadow bg-base-100">

          <div className="stat">
            <div className="stat-title">Followers</div>
            <div className="stat-value">{profile?.followers?.length || 0}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Following</div>
            <div className="stat-value">{profile?.following?.length || 0}</div>
          </div>

        </div>

        {/* SKILLS */}
        <div className="card bg-base-100 shadow p-4">
          <h3 className="font-bold mb-2">Skills</h3>

          <div className="flex flex-wrap gap-2">
            {(profile?.skills || []).map((s, i) => (
              <span key={i} className="badge badge-outline">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* POSTS */}
      <div className="mt-8 card bg-base-100 shadow">
        <div className="card-body">
          <h3 className="text-lg font-semibold">My Posts</h3>

          {posts.length === 0 ? (
            <p className="text-gray-500">Nothing here yet 😴</p>
          ) : (
            <div className="space-y-3 mt-4">
              {posts.map((post) => (
                <div key={post.id} className="p-3 border rounded-lg">
                  <p>{post.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-white w-[90%] max-w-md p-6 rounded-xl space-y-4">

            <h2 className="text-xl font-bold text-center">Edit Profile</h2>

            <input
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />

            <input
              className="input input-bordered w-full"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Photo URL"
            />

            <input
              className="input input-bordered w-full"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
            />

            <input
              className="input input-bordered w-full"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Skills (comma separated)"
            />

            <div className="flex justify-center">
              <img
                src={photo || "https://i.ibb.co/2s3zLZP/default-avatar.png"}
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button className="btn" onClick={() => setOpen(false)}>
                Cancel
              </button>

              <button className="btn btn-primary" onClick={handleUpdate}>
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
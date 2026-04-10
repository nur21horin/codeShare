import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">

      {/* HERO SECTION */}
      <div className="relative bg-base-100 rounded-2xl shadow-lg overflow-hidden">

        {/* Cover Image */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        {/* Avatar */}
        <div className="absolute left-6 -bottom-12">
          <img
            src="https://i.ibb.co/2s3zLZP/default-avatar.png"
            alt="profile"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
          />
        </div>

        {/* Name + Actions */}
        <div className="p-6 pt-16 md:pt-20 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-gray-500">@johndoe</p>
          </div>

          <button className="btn btn-primary mt-3 md:mt-0">
            Follow
          </button>
        </div>
      </div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        {/* LEFT SIDEBAR */}
        <div className="space-y-6">

          {/* BIO CARD */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="font-semibold text-lg">Bio</h3>
              <p className="text-gray-500">
                Full-stack developer passionate about UI/UX, React, and scalable web apps.
              </p>

              {/* SOCIAL ICONS */}
              <div className="flex gap-3 mt-3">
                <a className="btn btn-circle btn-sm">🐙</a>
                <a className="btn btn-circle btn-sm">𝕏</a>
                <a className="btn btn-circle btn-sm">🌐</a>
              </div>
            </div>
          </div>

          {/* SKILLS */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="font-semibold text-lg">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {["React", "Node.js", "UI Design", "Python"].map((skill) => (
                  <span key={skill} className="badge badge-outline">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="stats shadow bg-base-100">

            <div className="stat">
              <div className="stat-title">Followers</div>
              <div className="stat-value">1.2K</div>
            </div>

            <div className="stat">
              <div className="stat-title">Views</div>
              <div className="stat-value">8.4K</div>
            </div>

          </div>

        </div>

        {/* MIDDLE CONTENT */}
        <div className="md:col-span-2 space-y-6">

          {/* ACTIVITY FEED */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="font-semibold text-lg">Activity Feed</h3>

              <ul className="timeline timeline-vertical mt-4">

                <li>
                  <div className="timeline-start">Today</div>
                  <div className="timeline-middle">🔥</div>
                  <div className="timeline-end">Created a new project</div>
                </li>

                <li>
                  <div className="timeline-start">Yesterday</div>
                  <div className="timeline-middle">💬</div>
                  <div className="timeline-end">Commented on post</div>
                </li>

              </ul>
            </div>
          </div>

          {/* PROJECT GRID */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Projects</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="relative group rounded-xl overflow-hidden shadow"
                >
                  <img
                    src={`https://source.unsplash.com/random/400x300?sig=${item}`}
                    className="w-full h-40 object-cover"
                  />

                  {/* HOVER OVERLAY */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition flex items-center justify-center">
                    <p className="text-white opacity-0 group-hover:opacity-100">
                      Project Stats: 👍 120 | 👁 2.4K
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
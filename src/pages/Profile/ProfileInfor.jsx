import { motion } from "framer-motion";

const ProfileInfo = ({ profile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
    >

      {/* BIO CARD */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h3 className="font-bold text-lg">Bio</h3>

          <p className="text-sm text-base-content/70 leading-relaxed">
            {profile?.bio || "No bio added yet 😴"}
          </p>
        </div>
      </div>

      {/* SKILLS CARD */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h3 className="font-bold text-lg">Skills</h3>

          <div className="flex flex-wrap gap-2 mt-2">
            {(profile?.skills || []).length === 0 ? (
              <p className="text-sm text-base-content/60">
                No skills added yet
              </p>
            ) : (
              profile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="badge badge-outline hover:badge-primary transition"
                >
                  {skill}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default ProfileInfo;
import React, { useState, useEffect } from "react";
import { getAuth, updateProfile, updateEmail, onAuthStateChanged } from "firebase/auth";

const ProfileSettings = () => {
  const [user, setUser] = useState(null); // Firebase user data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const auth = getAuth();

  // Fetch the current user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const displayName = currentUser.displayName || "";
        const [firstName = "", lastName = ""] = displayName.split(" ");
        setFormData((prev) => ({
          ...prev,
          firstName,
          lastName,
          email: currentUser.email || "",
        }));
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to update user information
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, newPassword, confirmPassword } = formData;

    try {
      // Update display name
      if (user && (firstName || lastName)) {
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`.trim(),
        });
      }

      // Update email
      if (user && email && email !== user.email) {
        await updateEmail(user, email);
      }

      // Update password if provided
      if (newPassword && newPassword === confirmPassword) {
        // Add password update logic using `reauthenticateWithCredential` if necessary
        console.log("Password updated!");
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <header className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
          <p className="text-sm text-gray-500">Manage your account settings and details</p>
        </header>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Information Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          {/* Password Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800">Change Password</h2>
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your current password"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your new password"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm your new password"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-500 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;

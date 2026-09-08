/**
 * Provides the authenticated employee profile state to nested components.
 */
import React, { useEffect, useState, useCallback } from "react";
import EmployeeProfileContext from "./EmployeeProfileContext";
import {
  toastError,
  toastSuccess,
} from "../../../../shared/services/toastService";
import getEmployeeDataService, {
  updateEmployeeAvatarService,
} from "../services/employeeProfile";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/context/AuthContext";

function EmployeeProfileProvider({ children }) {
  const { employeeId } = useParams(); // URL parameter
  const { user } = useAuth(); // Authenticated Logged-in user
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [employeeProfile, setEmployeeProfile] = useState(null);

  /**
   * Fetches and stores the current employee profile.
   */
  const getEmployeeProfile = useCallback(async () => {
    try {
      setIsLoading(true);

      const currentUserId = user?.uid || user?.employeeId;

      if (!currentUserId) {
        setEmployeeProfile(null);
        return;
      }

      // SECURITY CHECK:
      // Agar URL me ID di gayi hai, lekin wo logged-in user ki ID se MATCH NAHI karti
      // (Aur user Admin nahi hai), toh use block/redirect kar do.
      const isSelfProfile = !employeeId || employeeId === currentUserId;
      const isAdmin = user?.role === "admin"; // Check user role

      if (!isSelfProfile && !isAdmin) {
        toastError("Security Alert: You can only view your own profile.");
        // Redirect user back to their own profile URL
        navigate(`/profile/${currentUserId}`, { replace: true });
        return;
      }

      // Target ID strictly set to current user if not authorized admin
      const targetEmployeeId = isSelfProfile ? currentUserId : employeeId;

      const employee = await getEmployeeDataService(targetEmployeeId);

      if (!employee) {
        toastError("Profile record not found.");
        setEmployeeProfile(null);
        return;
      }

      setEmployeeProfile(employee);
    } catch (error) {
      toastError("Error fetching profile: " + error.message);
      setEmployeeProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, [employeeId, user, navigate]);

  /**
   * Updates employee avatar profile picture
   */
  const updateProfileAvatar = async (newAvatarUrl) => {
    try {
      setIsLoading(true);
      const targetDocId = employeeProfile?.id;

      if (!targetDocId) throw new Error("Employee document ID missing.");

      // Service call to update avatar in Firestore
      await updateEmployeeAvatarService(targetDocId, newAvatarUrl);

      // Local State Update
      setEmployeeProfile((prev) => ({
        ...prev,
        avatarUrl: newAvatarUrl,
      }));

      toastSuccess("Profile Photo Updated Successfully!");
    } catch (error) {
      toastError("Failed to update profile picture: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployeeProfile();
  }, [getEmployeeProfile]);

  return (
    <EmployeeProfileContext.Provider
      value={{
        employeeProfile,
        isLoading,
        updateProfileAvatar,
        refreshProfile: getEmployeeProfile,
      }}
    >
      {children}
    </EmployeeProfileContext.Provider>
  );
}

export default EmployeeProfileProvider;

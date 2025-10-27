import { useNavigate } from "react-router-dom";

export function SettingsModel() {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/settings/edit-profile");
  };

  const handlePrivacyPolicy = () => {
    window.open("/privacy-policy", "_blank");
  };

  const handleTermsOfService = () => {
    window.open("/terms-of-service", "_blank");
  };

  const handleChangePassword = () => {
    navigate("/settings/edit-profile");
  };

  return {
    handleEditProfile,
    handlePrivacyPolicy,
    handleTermsOfService,
    handleChangePassword,
  };
}

import { SettingsModel } from "./SettingsModel";
import { SettingsView } from "./SettingsView";

export const Settings = () => {
  const settingsModelData = SettingsModel();

  return <SettingsView {...settingsModelData} />;
};

export default Settings;

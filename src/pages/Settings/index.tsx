import { SettingsModel } from "./SettingsModel";
import { SettingsView } from "./SettingsView";

export default function Settings() {
  const settingsModelData = SettingsModel();

  return <SettingsView {...settingsModelData} />;
}


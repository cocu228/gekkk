export type SelectArea =
  | "identification-status"
  | "personal-information"
  | "my-reports"
  | "pricing"
  | "app-version"
  | "change-password"
  | "user-keys"
  | "sign-history"
  | "user-sessions"
  | "language";

export interface ISettingsItem {
  iconCode: string;
  text: string;
  selectArea: SelectArea;
}

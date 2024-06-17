import { IS_GEKKARD_APP } from "@/shared/lib";

export const settingsList = [
    {
      iconCode: 't53',
      text: 'app_version',
      selectArea: 'app-version',
    },
    ...(IS_GEKKARD_APP() ?
      [{
        iconCode: 't55',
        text: 'personal_information',
        selectArea: 'personal-information',
      }] : []
    ),
    {
      iconCode: 't52',
      text: 'language',
      selectArea: 'language',
    },
    {
      iconCode: 't54',
      text: 'change_password',
      selectArea: 'change-password',
    },
    {
      iconCode: 't46',
      text: 'user_keys',
      selectArea: 'user-keys',
    },
    {
      iconCode: 't45',
      text: 'sign_history',
      selectArea: 'sign-history',
    },
    {
      iconCode: 't43',
      text: 'user_sessions',
      selectArea: 'user-sessions',
    },
    {
      iconCode: 't61',
      text: 'pricing',
      selectArea: 'pricing',
    },
    // {
    //   iconCode: 't09',
    //   text: 'my_reports',
    //   selectArea: 'my-reports',
    // },
]
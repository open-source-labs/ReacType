/* eslint-disable */

const awsmobile = {
  aws_project_region: import.meta.env.REACT_APP_AWS_PROJECT_REGION,
  aws_cognito_identity_pool_id: import.meta.env
    .REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: import.meta.env.REACT_APP_AWS_COGNITO_REGION,
  aws_user_pools_id: import.meta.env.REACT_APP_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: import.meta.env
    .REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID,
  oauth: {},
  aws_cognito_username_attributes: import.meta.env
    .REACT_APP_AWS_COGNITO_USERNAME_ATTRIBUTES
    ? import.meta.env.REACT_APP_AWS_COGNITO_USERNAME_ATTRIBUTES.split(',')
    : [],
  aws_cognito_social_providers: import.meta.env
    .REACT_APP_AWS_COGNITO_SOCIAL_PROVIDERS
    ? import.meta.env.REACT_APP_AWS_COGNITO_SOCIAL_PROVIDERS.split(',')
    : [],
  aws_cognito_signup_attributes: import.meta.env
    .REACT_APP_AWS_COGNITO_SIGNUP_ATTRIBUTES
    ? import.meta.env.REACT_APP_AWS_COGNITO_SIGNUP_ATTRIBUTES.split(',')
    : [],
  aws_cognito_mfa_configuration: import.meta.env
    .REACT_APP_AWS_COGNITO_MFA_CONFIGURATION,
  aws_cognito_mfa_types: import.meta.env.REACT_APP_AWS_COGNITO_MFA_TYPES
    ? import.meta.env.REACT_APP_AWS_COGNITO_MFA_TYPES.split(',')
    : [],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: import.meta.env
      .REACT_APP_AWS_COGNITO_PASSWORD_PROTECTION_SETTINGS_PASSWORDPOLICYMINLENGTH,
    passwordPolicyCharacters: import.meta.env
      .REACT_APP_AWS_COGNITO_PASSWORD_PROTECTION_SETTINGS_PASSWORDPOLICYCHARACTERS
      ? import.meta.env.REACT_APP_AWS_COGNITO_PASSWORD_PROTECTION_SETTINGS_PASSWORDPOLICYCHARACTERS.split(
          ','
        )
      : []
  },
  aws_cognito_verification_mechanisms: import.meta.env
    .REACT_APP_AWS_COGNITO_VERIFICATION_MECHANISMS
    ? import.meta.env.REACT_APP_AWS_COGNITO_VERIFICATION_MECHANISMS.split(',')
    : [],
  aws_user_files_s3_bucket: import.meta.env.REACT_APP_AWS_USER_FILES_S3_BUCKET,
  aws_user_files_s3_bucket_region: import.meta.env
    .REACT_APP_AWS_USER_FILES_S3_BUCKET_REGION
};

export default awsmobile;

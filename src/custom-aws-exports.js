/* eslint-disable */

const awsmobile = {
    "aws_project_region": process.env.REACT_APP_AWS_PROJECT_REGION,
    "aws_cognito_identity_pool_id": process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID,
    "aws_cognito_region": process.env.REACT_APP_AWS_COGNITO_REGION,
    "aws_user_pools_id": process.env.REACT_APP_AWS_USER_POOLS_ID,
    "aws_user_pools_web_client_id": process.env.REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID,
    "oauth": {},
    "aws_cognito_username_attributes": process.env.REACT_APP_AWS_COGNITO_USERNAME_ATTRIBUTES ? process.env.REACT_APP_AWS_COGNITO_USERNAME_ATTRIBUTES.split(',') : [],
    "aws_cognito_social_providers": process.env.REACT_APP_AWS_COGNITO_SOCIAL_PROVIDERS ? process.env.REACT_APP_AWS_COGNITO_SOCIAL_PROVIDERS.split(',') : [],
    "aws_cognito_signup_attributes": process.env.REACT_APP_AWS_COGNITO_SIGNUP_ATTRIBUTES ? process.env.REACT_APP_AWS_COGNITO_SIGNUP_ATTRIBUTES.split(',') : [],
    "aws_cognito_mfa_configuration": process.env.REACT_APP_AWS_COGNITO_MFA_CONFIGURATION,
    "aws_cognito_mfa_types": process.env.REACT_APP_AWS_COGNITO_MFA_TYPES ? process.env.REACT_APP_AWS_COGNITO_MFA_TYPES.split(',') : [],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": process.env.REACT_APP_AWS_COGNITO_PASSWORD_PROTECTION_SETTINGS_PASSWORDPOLICYMINLENGTH,
        "passwordPolicyCharacters": process.env.REACT_APP_AWS_COGNITO_PASSWORD_PROTECTION_SETTINGS_PASSWORDPOLICYCHARACTERS ? process.env.REACT_APP_AWS_COGNITO_PASSWORD_PROTECTION_SETTINGS_PASSWORDPOLICYCHARACTERS.split(',') : []
    },
    "aws_cognito_verification_mechanisms": process.env.REACT_APP_AWS_COGNITO_VERIFICATION_MECHANISMS ? process.env.REACT_APP_AWS_COGNITO_VERIFICATION_MECHANISMS.split(',') : [],
    "aws_user_files_s3_bucket": process.env.REACT_APP_AWS_USER_FILES_S3_BUCKET,
    "aws_user_files_s3_bucket_region": process.env.REACT_APP_AWS_USER_FILES_S3_BUCKET_REGION
};

export default awsmobile;

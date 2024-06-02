export const MAX_FILE_SIZE = 5; // In MegaBytes
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
// cspell:disable-next
export const ACCEPTED_DOCUMENT_TYPES = ['application/pdf', 'application/msword'];

export const MAX_STRING_MSG = 'Must not be longer than 200 characters.';
export const REQUIRED_MSG = 'Field is required';

export const TOKEN = localStorage.getItem('token');
export const ACCOUNT_ID = localStorage.getItem('accountId');
export const IS_LOGGED_IN = !!TOKEN;

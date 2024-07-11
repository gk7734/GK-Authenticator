export function parseOtpAuthUrl(url: string) {
  const urlObj = new URL(url);

  if (urlObj.protocol !== 'otpauth:') {
    throw new Error('Invalid URL protocol');
  }

  const pathParts = urlObj.pathname.split(':');
  const label = pathParts[1];
  const params = new URLSearchParams(urlObj.search);
  const secret = params.get('secret');
  const issuer = params.get('issuer');

  if (!label || !secret || !issuer) {
    throw new Error('Missing required parameters in URL');
  }

  return {
    user: label,
    secret: secret,
    issuer: issuer,
  };
}

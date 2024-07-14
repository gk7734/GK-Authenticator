export function parseOtpAuthUrl(url: string) {
  // 'otpauth://totp/' 이후의 부분을 추출
  const urlPart = url.slice('otpauth://totp/'.length);
  const [labelPart, queryPart] = urlPart.split('?');

  // 유저명 추출
  const user: string[] = labelPart.split(':');

  // query 부분을 파싱하여 secret과 issuer 추출
  function parseQuery(query: string) {
    const params: {[key: string]: string} = {};
    const pairs: string[] = query.split('&');
    for (const pair of pairs) {
      const [key, value] = pair.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    }
    return params;
  }

  // 쿼리 문자열에서 secret과 issuer 추출
  const params = parseQuery(queryPart);
  const secret: string = params.secret;
  const queryIssuer: string = params.issuer;

  if (!user || !secret || !queryIssuer) {
    throw new Error('Missing required parameters in URL');
  }

  return {
    user: user[1],
    secret: secret,
    issuer: queryIssuer,
  };
}

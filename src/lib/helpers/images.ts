interface SocialLupaImageParams {
  event_token: string;
  picture: string;
  type: string;
  token: string;
}

export function constructSocialLupaImageUrl(
  baseUrl: string,
  params: SocialLupaImageParams
): string {
  const queryString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');

  return `${baseUrl}?${queryString}`;
}


export const TWITCH_GQL_ENDPOINT = 'https://gql.twitch.tv/gql';

// RegEx to match Twitch URLs
// https://www.twitch.tv/channel
// https://www.twitch.tv/videos/12345
// https://www.twitch.tv/channel/clip/slug
// https://clips.twitch.tv/slug
export const TWITCH_REGEX = /twitch\.tv\/(?:videos\/(\d+)|([a-zA-Z0-9_]+)(?:\/clip\/([a-zA-Z0-9-]+))?)|clips\.twitch\.tv\/([a-zA-Z0-9-]+)/;

export interface TwitchData {
  channel?: string;
  videoId?: string;
  clipSlug?: string;
}

export const matchTwitchUrl = (url: string): TwitchData | null => {
  const match = url.match(TWITCH_REGEX);
  if (!match) return null;

  // undefined means not matched in that group
  const [_, videoId, channel, clipSlugFromChannel, clipSlugDirect] = match;

  if (videoId) {
    return { videoId };
  }
  if (clipSlugFromChannel || clipSlugDirect) {
    return { clipSlug: clipSlugFromChannel || clipSlugDirect };
  }
  if (channel) {
    return { channel };
  }
  return null;
};

// GQL Queries
const STREAM_QUERY = `
query StreamMetadata($channelLogin: String!) {
  user(login: $channelLogin) {
    id
    login
    displayName
    profileImageURL(width: 150)
    description
    stream {
      id
      title
      viewersCount
      game {
        name
      }
      type
      tags {
        tagName
        localizedName
      }
      isMature
    }
    followers {
      totalCount
    }
  }
}
`;

const VIDEO_QUERY = `
query VideoMetadata($videoId: ID!) {
  video(id: $videoId) {
    id
    title
    previewThumbnailURL(width: 640, height: 360)
    viewCount
    publishedAt
    lengthSeconds
    owner {
      login
      displayName
      profileImageURL(width: 150)
    }
    game {
      name
    }
  }
}
`;

const CLIP_QUERY = `
query ClipMetadata($slug: ID!) {
  clip(slug: $slug) {
    id
    slug
    title
    viewCount
    createdAt
    durationSeconds
    thumbnailURL
    broadcaster {
      login
      displayName
      profileImageURL(width: 150)
    }
    game {
      name
    }
  }
}
`;

// Query to get video playback access token for VODs
const VIDEO_PLAYBACK_ACCESS_TOKEN_QUERY = `
query VideoPlaybackAccessToken($id: ID!, $platform: String!, $playerBackend: String!, $playerType: String!) {
  videoPlaybackAccessToken(id: $id, params: {
    platform: $platform,
    playerBackend: $playerBackend,
    playerType: $playerType
  }) {
    value
    signature
    __typename
  }
}
`;

// Fetch the m3u8 URL for a VOD using the access token
export const fetchTwitchVodUrl = async (videoId: string, clientId: string): Promise<string | null> => {
  if (!clientId) {
    throw new Error('Twitch client ID is required.');
  }
  try {
    // Step 1: Get the playback access token
    const tokenRes = await fetch(TWITCH_GQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Client-Id': clientId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: VIDEO_PLAYBACK_ACCESS_TOKEN_QUERY,
        variables: {
          id: videoId,
          platform: 'web',
          playerBackend: 'mediaplayer',
          playerType: 'site'
        },
        operationName: 'VideoPlaybackAccessToken'
      })
    });

    if (!tokenRes.ok) {
      console.error('Failed to get VOD access token:', tokenRes.status);
      return null;
    }

    const tokenJson = await tokenRes.json();
    const accessToken = tokenJson.data?.videoPlaybackAccessToken;

    if (!accessToken || !accessToken.value || !accessToken.signature) {
      console.error('Invalid access token response:', tokenJson);
      return null;
    }

    // Step 2: Construct the usher URL to get the m3u8 playlist
    const usherParams = new URLSearchParams({
      nauth: accessToken.value,
      nauthsig: accessToken.signature,
      allow_source: 'true',
      allow_audio_only: 'true',
      allow_spectre: 'true',
      player: 'twitchweb',
      playlist_include_framerate: 'true',
      sig: accessToken.signature,
      token: accessToken.value
    });

    const m3u8Url = `https://usher.ttvnw.net/vod/${videoId}.m3u8?${usherParams.toString()}`;
    return m3u8Url;
  } catch (e) {
    console.error('Error fetching Twitch VOD URL:', e);
    return null;
  }
};

export const fetchTwitchData = async (data: TwitchData, clientId: string) => {
  if (!clientId) {
    throw new Error('Twitch client ID is required.');
  }
  let operationName = '';
  let query = '';
  let variables = {};

  if (data.videoId) {
    operationName = 'VideoMetadata';
    query = VIDEO_QUERY;
    variables = { videoId: data.videoId };
  } else if (data.clipSlug) {
    operationName = 'ClipMetadata';
    query = CLIP_QUERY;
    variables = { slug: data.clipSlug };
  } else if (data.channel) {
    operationName = 'StreamMetadata';
    query = STREAM_QUERY;
    variables = { channelLogin: data.channel };
  }

  const res = await fetch(TWITCH_GQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Client-Id': clientId,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
      operationName
    })
  });

  if (!res.ok) {
    throw new Error(`Twitch GQL Error: ${res.status}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0]?.message || 'Twitch GQL Error');
  }

  return json.data;
};

import React from "react";
import { render, waitFor, act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../src/utils/tiktok", () => ({
  extractTikTokVideoId: () => "123",
  fetchTikTokOembed: async () => ({
    title: "TikTok Video",
    author_name: "TikTok User"
  })
}));

vi.mock("../../src/utils/rumble", () => ({
  isValidRumbleUrl: () => true,
  extractRumbleEmbedIdFromUrl: () => "abc123",
  fetchRumbleVideoDataDirect: async () => ({
    title: "Rumble Video",
    author: { name: "Rumble Author" },
    i: "https://example.com/rumble.jpg",
    w: 640,
    h: 360,
    fps: 30,
    duration: 120,
    pubDate: "2020-01-01T00:00:00Z"
  })
}));

vi.mock("../../src/utils/dailymotion", () => ({
  isValidDailymotionUrl: () => true,
  extractVideoId: () => "x7tgad0",
  fetchDailymotionData: async () => ({
    type: "video",
    version: "1.0",
    provider_name: "Dailymotion",
    provider_url: "https://www.dailymotion.com",
    title: "Dailymotion Video",
    description: "Video description",
    author_name: "Dailymotion Author",
    author_url: "https://www.dailymotion.com",
    width: 640,
    height: 360,
    html: "",
    thumbnail_url: "https://example.com/dailymotion.jpg",
    thumbnail_width: 640,
    thumbnail_height: 360
  })
}));

vi.mock("../../src/utils/odysee", () => ({
  isValidOdyseeUrl: () => true,
  extractEmbedUrl: () => "https://example.com/odysee-embed",
  fetchOdyseeData: async () => ({
    title: "Odysee Video",
    description: "Description",
    author_name: "Odysee Author",
    author_url: "https://odysee.com/@author",
    thumbnail_url: "https://example.com/odysee.jpg",
    thumbnail_width: 640,
    thumbnail_height: 360,
    html: '<iframe src="https://example.com/odysee-embed"></iframe>',
    version: "1.0",
    provider_name: "Odysee",
    provider_url: "https://odysee.com",
    type: "video",
    width: 640,
    height: 360
  })
}));

vi.mock("../../src/utils/pinterest", () => ({
  isValidPinterestUrl: () => true,
  parsePinterestUrl: (url: string) => ({
    pinId: "123456789",
    originalUrl: url,
    isValid: true
  }),
  fetchPinterestData: async () => ({
    id: "123456789",
    title: "Pinterest Title",
    description: "Description",
    text: "Text",
    link: "https://example.com",
    images: {
      originals: { url: "https://example.com/pin.jpg", width: 600, height: 800 }
    },
    pinner: {
      fullName: "Pinner",
      username: "pinner",
      profileUrl: "https://pinterest.com/pinner",
      avatarUrl: "https://example.com/pinner.jpg"
    },
    stats: {
      saves: 1,
      comments: 1
    },
    isVideo: false
  }),
  formatCount: (count: number) => String(count),
  getBestImage: (images: Record<string, { url: string; width: number; height: number }>) => images.originals
}));

vi.mock("../../src/utils/twitch", () => ({
  matchTwitchUrl: () => ({ channel: "testchannel" }),
  fetchTwitchData: async () => ({
    user: {
      displayName: "Test Channel",
      profileImageURL: "https://example.com/twitch.jpg",
      description: "Channel description",
      followers: { totalCount: 5 },
      stream: null
    }
  })
}));

vi.mock("../../src/utils/twitter", () => ({
  normalizeTwitterUrl: (url: string) => url,
  fetchTwitterOembed: async () => ({
    html: "<blockquote>Tweet</blockquote>"
  })
}));

vi.mock("../../src/utils/tumblr", () => ({
  isValidTumblrUrl: () => true,
  parseTumblrUrl: (url: string) => ({
    blogName: "blog",
    postId: "1",
    isValid: true,
    originalUrl: url
  }),
  getTumblrApiUrl: () => "https://blog.tumblr.com/api/read/json?id=1",
  parseTumblrJsonp: () => ({}),
  extractPostData: () => ({
    blogTitle: "Blog",
    blogName: "blog",
    blogDescription: "Description",
    avatarUrl: "https://example.com/avatar.jpg",
    postId: "1",
    postType: "text",
    title: "Post title",
    body: "<p>Body</p>",
    date: "2020-01-01T00:00:00Z",
    timestamp: 1577836800,
    noteCount: 1,
    tags: ["tag"],
    postUrl: "https://blog.tumblr.com/post/1"
  }),
  formatTumblrDate: () => "Jan 1, 2020",
  formatNoteCount: () => "1"
}));

vi.mock("../../src/utils/archive", () => ({
  matchArchiveUrl: () => "test-item",
  fetchArchiveData: async () => ({
    title: "Archive Item",
    description: "Description",
    creator: "Creator",
    uploadDate: "2020-01-01",
    mediaUrl: "video.mp4",
    mediaType: "video",
    posterUrl: "https://example.com/archive.jpg",
    streamUrl: "https://archive.org/download/test-item/video.mp4",
    views: 10,
    size: "10 MB",
    reviewCount: 1,
    rating: 4.5
  })
}));

import { ArchiveOrgEmbed } from "../../src/components/ArchiveOrgEmbed";
import { AppleMusicEmbed } from "../../src/components/AppleMusicEmbed";
import { ApplePodcastsEmbed } from "../../src/components/ApplePodcastsEmbed";
import { BilibiliEmbed } from "../../src/components/BilibiliEmbed";
import { BlueskyEmbed } from "../../src/components/BlueskyEmbed";
import { CardLayoutProvider, useCardLayout } from "../../src/components/CardLayout";
import { DailymotionEmbed } from "../../src/components/DailymotionEmbed";
import { DeezerEmbed } from "../../src/components/DeezerEmbed";
import { EmbedCard } from "../../src/components/EmbedCard";
import { FacebookEmbed } from "../../src/components/FacebookEmbed";
import { InstagramEmbed } from "../../src/components/InstagramEmbed";
import { KickEmbed } from "../../src/components/KickEmbed";
import { LinkedInEmbed } from "../../src/components/LinkedInEmbed";
import { MastodonEmbed } from "../../src/components/MastodonEmbed";
import { MediaPlayer } from "../../src/components/MediaPlayer";
import { OdyseeEmbed } from "../../src/components/OdyseeEmbed";
import { PinterestEmbed } from "../../src/components/PinterestEmbed";
import { PlatformBranding } from "../../src/components/PlatformBranding";
import { PlatformIcon } from "../../src/components/PlatformIcons";
import { RedditEmbed } from "../../src/components/RedditEmbed";
import { RumbleEmbed } from "../../src/components/RumbleEmbed";
import { SoundCloudEmbed } from "../../src/components/SoundCloudEmbed";
import { SpotifyEmbed } from "../../src/components/SpotifyEmbed";
import { TelegramEmbed } from "../../src/components/TelegramEmbed";
import { ThreadsEmbed } from "../../src/components/ThreadsEmbed";
import { TidalEmbed } from "../../src/components/TidalEmbed";
import { TikTokEmbed } from "../../src/components/TikTokEmbed";
import { TruthSocialEmbed } from "../../src/components/TruthSocialEmbed";
import { TwitchEmbed } from "../../src/components/TwitchEmbed";
import { TumblrEmbed } from "../../src/components/TumblrEmbed";
import { XEmbed } from "../../src/components/XEmbed";
import { YouTubeEmbed } from "../../src/components/YouTubeEmbed";
import { PlayIcon } from "../../src/components/Icons";

const renderAndExpect = async (element: React.ReactElement) => {
  let container: HTMLElement;
  await act(async () => {
    const result = render(element);
    container = result.container;
  });
  await waitFor(() => {
    expect(container!.firstChild).toBeTruthy();
  });
};

const jsonResponse = (data: unknown) => ({
  ok: true,
  status: 200,
  json: async () => data
});

const textResponse = (text: string) => ({
  ok: true,
  status: 200,
  text: async () => text
});

const redditListing = [
  {
    data: {
      children: [
        {
          data: {
            title: "Reddit post",
            subreddit_name_prefixed: "r/test",
            author: "author",
            selftext: "Body",
            created_utc: 1700000000,
            score: 1,
            num_comments: 2,
            permalink: "/r/test/comments/abc123/test/",
            url: "https://example.com",
            over_18: false,
            spoiler: false,
            preview: {
              images: [
                {
                  resolutions: [{ url: "https://example.com/image.jpg" }]
                }
              ]
            }
          }
        }
      ]
    }
  }
];

const blueskyResponse = {
  thread: {
    $type: "app.bsky.feed.defs#threadViewPost",
    post: {
      uri: "at://user/app.bsky.feed.post/abc",
      author: {
        handle: "user",
        displayName: "User",
        avatar: "https://example.com/avatar.jpg"
      },
      record: {
        text: "Hello",
        createdAt: "2020-01-01T00:00:00.000Z"
      },
      embed: {
        $type: "app.bsky.embed.images#view",
        images: [
          { fullsize: "https://example.com/image.jpg", thumb: "https://example.com/thumb.jpg", alt: "alt" }
        ]
      },
      likeCount: 1,
      repostCount: 1,
      replyCount: 1
    }
  }
};

const kickResponse = {
  livestream: {
    session_title: "Kick Live",
    thumbnail: { url: "https://example.com/kick.jpg" },
    is_live: true,
    viewer_count: 10,
    categories: [{ name: "Game" }],
    language: "en",
    is_mature: false,
    tags: [{ name: "tag" }]
  },
  followers_count: 5,
  banner_image: { url: "https://example.com/banner.jpg" },
  user: {
    username: "kickuser",
    profile_pic: "https://example.com/profile.jpg",
    bio: "Bio"
  }
};

const tumblrJsonp = `var tumblr_api_read = ${JSON.stringify({
  tumblelog: {
    title: "Blog",
    name: "blog",
    description: "Description",
    avatar_url_128: "https://example.com/avatar.jpg"
  },
  posts: [
    {
      id: "1",
      type: "text",
      date: "2020-01-01 00:00:00 GMT",
      "unix-timestamp": 1577836800,
      "note-count": "1",
      tags: ["tag"],
      "regular-title": "Post title",
      "regular-body": "Body",
      url: "https://blog.tumblr.com/post/1"
    }
  ]
})};`;

beforeEach(() => {
  const fetchMock = vi.fn(async (input: RequestInfo) => {
    const url = typeof input === "string" ? input : input.url;

    if (url.includes("public.api.bsky.app/xrpc/app.bsky.feed.getPostThread")) {
      return jsonResponse(blueskyResponse);
    }
    if (url.startsWith("https://kick.com/api/")) {
      return jsonResponse(kickResponse);
    }
    if (url.includes("reddit.com/comments")) {
      return jsonResponse(redditListing);
    }
    if (url.includes("reddit.com/oembed")) {
      return jsonResponse({ title: "Reddit", author_name: "u/test" });
    }
    if (url.includes(".tumblr.com/api/read/json")) {
      return textResponse(tumblrJsonp);
    }
    return jsonResponse({});
  });

  vi.stubGlobal("fetch", fetchMock);
});

describe("components", () => {
  it("renders ArchiveOrgEmbed", async () => {
    await renderAndExpect(<ArchiveOrgEmbed url="https://archive.org/details/test-item" />);
  });

  it("renders AppleMusicEmbed", async () => {
    await renderAndExpect(<AppleMusicEmbed url="https://music.apple.com/us/album/evermore/1540314609" />);
  });

  it("renders ApplePodcastsEmbed", async () => {
    await renderAndExpect(<ApplePodcastsEmbed url="https://podcasts.apple.com/us/podcast/sample/id123456789" />);
  });

  it("renders BilibiliEmbed", async () => {
    await renderAndExpect(<BilibiliEmbed url="https://www.bilibili.com/video/BV1xK4y1w7i8" />);
  });

  it("renders BlueskyEmbed", async () => {
    await renderAndExpect(<BlueskyEmbed url="https://bsky.app/profile/user/post/abc123" />);
  });

  it("renders CardLayoutProvider and hook", () => {
    function LayoutProbe() {
      const layout = useCardLayout();
      return <div data-layout={layout} />;
    }

    const { container } = render(
      <CardLayoutProvider layout="modern">
        <LayoutProbe />
      </CardLayoutProvider>
    );
    expect(container.querySelector("[data-layout='modern']")).toBeTruthy();
  });

  it("renders DailymotionEmbed", async () => {
    await renderAndExpect(<DailymotionEmbed url="https://www.dailymotion.com/video/x7tgad0" />);
  });

  it("renders DeezerEmbed", async () => {
    await renderAndExpect(<DeezerEmbed url="https://www.deezer.com/us/track/3135556" />);
  });

  it("renders EmbedCard", async () => {
    await renderAndExpect(
      <EmbedCard provider="Test" title="Title" body="Body" href="https://example.com" />
    );
  });

  it("renders FacebookEmbed", async () => {
    await renderAndExpect(<FacebookEmbed url="https://www.facebook.com/zuck/posts/10102509264909801" />);
  });

  it("renders InstagramEmbed", async () => {
    await renderAndExpect(<InstagramEmbed url="https://www.instagram.com/p/CG0UU3J" />);
  });

  it("renders KickEmbed", async () => {
    await renderAndExpect(<KickEmbed url="https://kick.com/testchannel" />);
  });

  it("renders LinkedInEmbed", async () => {
    await renderAndExpect(<LinkedInEmbed url="https://www.linkedin.com/posts/test_123" />);
  });

  it("renders MastodonEmbed", async () => {
    await renderAndExpect(
      <MastodonEmbed
        url="https://mastodon.social/@user/109823456789012345"
        renderMode="oembed"
      />
    );
  });

  it("renders MediaPlayer", async () => {
    await renderAndExpect(<MediaPlayer src="https://example.com/video.mp4" />);
  });

  it("renders OdyseeEmbed", async () => {
    await renderAndExpect(<OdyseeEmbed url="https://odysee.com/@user:1/video:1" />);
  });

  it("renders PinterestEmbed", async () => {
    await renderAndExpect(<PinterestEmbed url="https://www.pinterest.com/pin/123456789/" />);
  });

  it("renders PlatformBranding", async () => {
    await renderAndExpect(<PlatformBranding provider="YouTube" theme="light" />);
  });

  it("renders PlatformIcon", async () => {
    await renderAndExpect(<PlatformIcon platform="youtube" />);
  });

  it("renders RedditEmbed", async () => {
    await renderAndExpect(<RedditEmbed url="https://www.reddit.com/r/test/comments/abc123/test/" />);
  });

  it("renders RumbleEmbed", async () => {
    await renderAndExpect(<RumbleEmbed url="https://rumble.com/embed/vb7jz7/?pub=4" />);
  });

  it("renders SoundCloudEmbed", async () => {
    await renderAndExpect(<SoundCloudEmbed url="https://soundcloud.com/artist/track" />);
  });

  it("renders SpotifyEmbed", async () => {
    await renderAndExpect(<SpotifyEmbed url="https://open.spotify.com/track/11dFghVXANMlKmJXsNCbNl" />);
  });

  it("renders TelegramEmbed", async () => {
    await renderAndExpect(<TelegramEmbed url="https://t.me/telegram/1" />);
  });

  it("renders ThreadsEmbed", async () => {
    await renderAndExpect(<ThreadsEmbed url="https://www.threads.net/@user/post/abc123" />);
  });

  it("renders TidalEmbed", async () => {
    await renderAndExpect(<TidalEmbed url="https://tidal.com/browse/track/123" />);
  });

  it("renders TikTokEmbed", async () => {
    await renderAndExpect(<TikTokEmbed url="https://www.tiktok.com/@user/video/123" />);
  });

  it("renders TruthSocialEmbed", async () => {
    await renderAndExpect(<TruthSocialEmbed url="https://truthsocial.com/@user/posts/109823456789012345" />);
  });

  it("renders TwitchEmbed", async () => {
    await renderAndExpect(
      <TwitchEmbed url="https://www.twitch.tv/testchannel" clientId="test-client" />
    );
  });

  it("renders TumblrEmbed", async () => {
    await renderAndExpect(<TumblrEmbed url="https://blog.tumblr.com/post/1" />);
  });

  it("renders XEmbed", async () => {
    await renderAndExpect(<XEmbed url="https://x.com/user/status/20" />);
  });

  it("renders YouTubeEmbed", async () => {
    await renderAndExpect(<YouTubeEmbed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />);
  });

  it("renders PlayIcon", async () => {
    await renderAndExpect(<PlayIcon />);
  });
});


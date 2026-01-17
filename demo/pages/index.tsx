import React, { useMemo, useState } from "react";
import { CardLayout, CardLayoutProvider, EmbedCard, RedditEmbed, XEmbed, BlueskyEmbed, MastodonEmbed, ThreadsEmbed, TruthSocialEmbed, LinkedInEmbed, BilibiliEmbed, InstagramEmbed, TikTokEmbed, YouTubeEmbed, RumbleEmbed, DailymotionEmbed, OdyseeEmbed, ArchiveOrgEmbed, KickEmbed, TwitchEmbed, TumblrEmbed, PinterestEmbed, SpotifyEmbed, AppleMusicEmbed, DeezerEmbed, TidalEmbed, SoundCloudEmbed, ApplePodcastsEmbed, FacebookEmbed, TelegramEmbed, SnapchatEmbed, PlatformIcon } from "react-embeds";
import {
  COMMON_PROP_KEYS,
  DEFAULT_CTA_LABELS,
  DEFAULT_CTA_LABEL_ICONS,
  DEFAULT_CTA_LABEL_ICON_POSITIONS,
  DEFAULT_CTA_USE_PLATFORM_COLORS,
  DEFAULT_CTA_USE_PLATFORM_ICON_COLORS,
  PLATFORM_DEFAULT_LAYOUTS,
  buildCommonPropEntries,
  buildCtaPropEntries
} from "../lib/sharedEmbedOptions";

const REDDIT_EXAMPLE_URL =
  "https://www.reddit.com/r/CATHELP/comments/1q7i40f/why_does_my_6yo_male_cat_do_this_to_my_4_month/";
const REDDIT_REMOVED_URL = "https://www.reddit.com/r/AskReddit/comments/1c3xu3q/whats_the_most_unexpected_thing/";

const X_EXAMPLE_URL = "https://x.com/TrumpUpdateHQ/status/2008307923047555156";
const BLUESKY_EXAMPLE_URL = "https://bsky.app/profile/denniskberlin.bsky.social/post/3mbyfrts2522k";
const MASTODON_EXAMPLE_URL = "https://mastodon.social/@trwnh/99664077509711321";
const THREADS_EXAMPLE_URL = "https://www.threads.net/@zuck/post/CuP48CiS5sx";
const TRUTH_SOCIAL_EXAMPLE_URL = "https://truthsocial.com/@realDonaldTrump/115886085338434959";
const LINKEDIN_EXAMPLE_URL = "https://www.linkedin.com/posts/naturenergy_energiewende-wasserkraft-aemkostrom-activity-7416739784716623872-xSTU/";
const BILIBILI_EXAMPLE_URL = "https://www.bilibili.com/video/av20204904/";
const TELEGRAM_EXAMPLE_URL = "https://t.me/telegram/83";
const SNAPCHAT_EXAMPLE_URL = "https://www.snapchat.com/spotlight/W7_EDlXWTBiXAEEniNoMPwAAYdnRyb2diaXFkAZs2ZevKAZs2Zeu1AAAAAQ?ref=web_spotlight";
const INSTAGRAM_EXAMPLE_URL = "https://www.instagram.com/reels/DLcih1IJg9Q/";
const TIKTOK_EXAMPLE_URL = "https://www.tiktok.com/@wrldoftshirt/video/7528110250075950358";
const FACEBOOK_EXAMPLE_URL = "https://www.facebook.com/watch/?v=1206521130975911";
const YOUTUBE_EXAMPLE_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
const RUMBLE_EXAMPLE_URL = "https://rumble.com/embed/v5a6o71/?pub=4";
const RUMBLE_EMBED_EXAMPLE_URL = "https://rumble.com/embed/v5a6o71/";
const DAILYMOTION_EXAMPLE_URL = "https://www.dailymotion.com/video/x9xl74m";
const ODYSEE_EXAMPLE_URL = "https://odysee.com/@FeldwebelSchultz:c/astrale-%C3%A4therische-spinnen:3";
const ARCHIVE_EXAMPLE_URL = "https://archive.org/details/download-7_202304";
const KICK_EXAMPLE_URL = "https://kick.com/tosnie";
const TWITCH_EXAMPLE_URL = "https://www.twitch.tv/gamesdonequick";
const TUMBLR_EXAMPLE_URL = "https://www.tumblr.com/beejwatch/805343459034775552/god-im-so-glad-hes-here-six-seasons-of-this";
const PINTEREST_EXAMPLE_URL = "https://www.pinterest.com/pin/871516965409702084/";
const SPOTIFY_EXAMPLE_URL = "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT";
const SPOTIFY_ALBUM_URL = "https://open.spotify.com/album/4m2880jivSbbyEGAKfITCa";
const SPOTIFY_ARTIST_URL = "https://open.spotify.com/artist/0TnOYISbd1XYRBk9myaseg";
const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M";
const SPOTIFY_USER_URL = "https://open.spotify.com/user/spotify";
const APPLE_MUSIC_ARTIST_URL = "https://music.apple.com/de/artist/christian-l%C3%B6ffler/334282801";
const APPLE_MUSIC_ALBUM_URL = "https://music.apple.com/de/album/until-we-meet-again/1852510251";
const APPLE_MUSIC_SONG_URL = "https://music.apple.com/de/song/no-distance-can-dim-our-light-feat-adna/1852510262";
const APPLE_MUSIC_PLAYLIST_URL = "https://music.apple.com/de/playlist/christian-l%C3%B6ffler-essentials/pl.aa2f29dbe21f4404a97f3c6901dd1cdf";
const DEEZER_ARTIST_URL = "https://www.deezer.com/de/artist/14910979";
const DEEZER_ALBUM_URL = "https://www.deezer.com/de/album/866158632";
const DEEZER_TRACK_URL = "https://www.deezer.com/us/track/3684446062";
const DEEZER_PLAYLIST_URL = "https://www.deezer.com/de/playlist/10437203622";
const TIDAL_ALBUM_URL = "https://tidal.com/album/471563016";
const TIDAL_TRACK_URL = "https://tidal.com/track/121444600/u";
const TIDAL_PLAYLIST_URL = "https://tidal.com/playlist/36ea71a8-445e-41a4-82ab-6628c581535d";
const SOUNDCLOUD_TRACK_URL = "https://soundcloud.com/forss/flickermood";
const SOUNDCLOUD_PLAYLIST_URL = "https://soundcloud.com/eddie-odame/sets/dj-mixes";
const APPLE_PODCAST_SHOW_URL = "https://podcasts.apple.com/us/podcast/serial/id917918570";
const APPLE_PODCAST_EPISODE_URL = "https://podcasts.apple.com/us/podcast/were-playing-for-keeps-in-2026/id558364221?i=1000743945204";

type Platform = "reddit" | "x" | "bluesky" | "mastodon" | "threads" | "truthSocial" | "linkedin" | "bilibili" | "instagram" | "tiktok" | "facebook" | "youtube" | "rumble" | "dailymotion" | "odysee" | "archive" | "kick" | "twitch" | "tumblr" | "pinterest" | "spotify" | "appleMusic" | "deezer" | "tidal" | "soundcloud" | "applePodcasts" | "telegram" | "snapchat";
type LayoutOption = "default" | CardLayout;

const PLATFORM_CONFIG = [
  { id: "reddit", label: "Reddit", color: "#ff4500" },
  { id: "x", label: "X", color: "#111111" },
  { id: "bluesky", label: "Bluesky", color: "#0285ff" },
  { id: "mastodon", label: "Mastodon", color: "#6364ff" },
  { id: "threads", label: "Threads", color: "#111111" },
  { id: "truthSocial", label: "Truth Social", color: "#661dff" },
  { id: "telegram", label: "Telegram", color: "#229ED9" },
  { id: "linkedin", label: "LinkedIn", color: "#0a66c2" },
  { id: "bilibili", label: "Bilibili", color: "#00a1d6" },
  { id: "instagram", label: "Instagram", color: "#e1306c" },
  { id: "tiktok", label: "TikTok", color: "#000000" },
  { id: "facebook", label: "Facebook", color: "#1877f2" },
  { id: "youtube", label: "YouTube", color: "#ff0000" },
  { id: "rumble", label: "Rumble", color: "#85c742" },
  { id: "dailymotion", label: "Dailymotion", color: "#0a0a0a" },
  { id: "odysee", label: "Odysee", color: "#ef2e24" },
  { id: "archive", label: "Archive.org", color: "#222222" },
  { id: "kick", label: "Kick", color: "#53fc18" },
  { id: "twitch", label: "Twitch", color: "#9146ff" },
  { id: "tumblr", label: "Tumblr", color: "#001935" },
  { id: "pinterest", label: "Pinterest", color: "#e60023" },
  { id: "spotify", label: "Spotify", color: "#1db954" },
  { id: "appleMusic", label: "Apple Music", color: "#fa243c" },
  { id: "deezer", label: "Deezer", color: "#ef5466" },
  { id: "tidal", label: "Tidal", color: "#000000" },
  { id: "soundcloud", label: "SoundCloud", color: "#ff5500" },
  { id: "applePodcasts", label: "Apple Podcasts", color: "#a24bdc" },
  { id: "snapchat", label: "Snapchat", color: "#FFFC00" }
] as const;

const renderPlatformIcon = (platformId: Platform, iconColor: string) => (
  <PlatformIcon
    platform={platformId}
    size={16}
    color={
      platformId === "truthSocial"
        ? iconColor === "#ffffff"
          ? "#ffffff"
          : "currentColor"
        : iconColor
    }
    aria-hidden="true"
    focusable="false"
    style={{ display: "block" }}
  />
);


export default function Home() {
  const [platform, setPlatform] = useState<Platform>("reddit");
  const [url, setUrl] = useState(REDDIT_EXAMPLE_URL);
  const [activeUrl, setActiveUrl] = useState(REDDIT_EXAMPLE_URL);
  const previewUrl = useMemo(() => url.trim(), [url]);

  const [darkMode, setDarkMode] = useState(false);
  const [globalLayout, setGlobalLayout] = useState<LayoutOption>("default");
  const [platformLayouts, setPlatformLayouts] = useState<Record<Platform, LayoutOption>>(() => {
    return PLATFORM_CONFIG.reduce((acc, item) => {
      acc[item.id as Platform] = "default";
      return acc;
    }, {} as Record<Platform, LayoutOption>);
  });

  // Configuration options
  const [showTitle, setShowTitle] = useState(true);
  const [showSubreddit, setShowSubreddit] = useState(true);
  const [showAuthor, setShowAuthor] = useState(true);
  const [showHandle, setShowHandle] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [showBody, setShowBody] = useState(true);
  const [showMedia, setShowMedia] = useState(true);
  const [showUpvotes, setShowUpvotes] = useState(true);
  const [showCommentCount, setShowCommentCount] = useState(true);
  const [showPostType, setShowPostType] = useState(true);
  const [showBranding, setShowBranding] = useState(true);
  const [showCTA, setShowCTA] = useState(true);
  const [ctaLabels, setCtaLabels] = useState<Record<Platform, string>>(() => ({
    ...(DEFAULT_CTA_LABELS as Record<Platform, string>)
  }));
  const [ctaLabelIcons, setCtaLabelIcons] = useState<Record<Platform, boolean>>(() => ({
    ...(DEFAULT_CTA_LABEL_ICONS as Record<Platform, boolean>)
  }));
  const [ctaLabelIconPositions, setCtaLabelIconPositions] = useState<Record<Platform, "before" | "after">>(() => ({
    ...(DEFAULT_CTA_LABEL_ICON_POSITIONS as Record<Platform, "before" | "after">)
  }));
  const [ctaUsePlatformColors, setCtaUsePlatformColors] = useState<Record<Platform, boolean>>(() => ({
    ...(DEFAULT_CTA_USE_PLATFORM_COLORS as Record<Platform, boolean>)
  }));
  const [ctaUsePlatformIconColors, setCtaUsePlatformIconColors] = useState<Record<Platform, boolean>>(() => ({
    ...(DEFAULT_CTA_USE_PLATFORM_ICON_COLORS as Record<Platform, boolean>)
  }));
  const [disableCard, setDisableCard] = useState(false);
  const [width, setWidth] = useState<string | number>("100%");
  const [maxWidth, setMaxWidth] = useState<string | number>("100%");
  const [linkBehavior, setLinkBehavior] = useState<"card" | "title" | "cta" | "none">("cta");
  const [linkTarget, setLinkTarget] = useState<"_blank" | "_self" | "_parent" | "_top">("_blank");

  // X-specific options (FxTwitter API provides these)
  const [showLikes, setShowLikes] = useState(true);
  const [showRetweets, setShowRetweets] = useState(true);

  // TikTok specific state
  const [tiktokControls, setTikTokControls] = useState(true);
  const [tiktokLoop, setTikTokLoop] = useState(false);
  const [tiktokAutoPlay, setTikTokAutoPlay] = useState(false);
  const [tiktokMusicInfo, setTikTokMusicInfo] = useState(false);
  const [tiktokDescription, setTikTokDescription] = useState(false);
  const [tiktokProgressBar, setTikTokProgressBar] = useState(true);
  const [tiktokPlayButton, setTikTokPlayButton] = useState(true);
  const [tiktokVolumeControl, setTikTokVolumeControl] = useState(true);
  const [tiktokFullscreen, setTikTokFullscreen] = useState(true);
  const [tiktokTimestamp, setTikTokTimestamp] = useState(true);

  // Other specific state
  const [showReplies, setShowReplies] = useState(true);
  const [showViews, setShowViews] = useState(true);
  const [xAlignment, setXAlignment] = useState<"center" | "left" | "right">("center");
  const [xConstrainWidth, setXConstrainWidth] = useState(false);
  const [mastodonShowFavorites, setMastodonShowFavorites] = useState(true);
  const [mastodonShowReblogs, setMastodonShowReblogs] = useState(true);
  const [mastodonBodyMaxLength, setMastodonBodyMaxLength] = useState(500);

  // Instagram-specific options
  const [instagramAlignment, setInstagramAlignment] = useState<"center" | "left" | "right">("center");
  const [instagramConstrainWidth, setInstagramConstrainWidth] = useState(true);
  const [instagramConstrainCardWidth, setInstagramConstrainCardWidth] = useState(false);
  const [pinterestAlignment, setPinterestAlignment] = useState<"center" | "left" | "right">("center");
  const [pinterestConstrainWidth, setPinterestConstrainWidth] = useState(false);
  const [pinterestImageMaxWidth, setPinterestImageMaxWidth] = useState("100%");
  const [pinterestShowSaves, setPinterestShowSaves] = useState(true);
  // Facebook-specific options
  const [facebookConstrainCardWidth, setFacebookConstrainCardWidth] = useState(false);
  // Mastodon-specific options
  const [mastodonUseOfficial, setMastodonUseOfficial] = useState(false);
  const [threadsCtaAlignment, setThreadsCtaAlignment] = useState<"left" | "center" | "right">("left");
  const [truthSocialCtaAlignment, setTruthSocialCtaAlignment] = useState<"left" | "center" | "right">("left");
  const [useRumbleDuration, setUseRumbleDuration] = useState(true);
  const [useRumbleMeta, setUseRumbleMeta] = useState(false);

  // Telegram-specific options
  const [telegramAccentColor, setTelegramAccentColor] = useState("F646A4"); // Default from user request
  const [telegramCtaAlignment, setTelegramCtaAlignment] = useState<"left" | "center" | "right">("left");
  const [telegramEmbedAlignment, setTelegramEmbedAlignment] = useState<"left" | "center" | "right">("center");
  const [telegramConstrainWidth, setTelegramConstrainWidth] = useState(false);

  // Snapchat-specific options
  const [snapchatCtaAlignment, setSnapchatCtaAlignment] = useState<"left" | "center" | "right">("left");
  const [snapchatEmbedAlignment, setSnapchatEmbedAlignment] = useState<"left" | "center" | "right">("center");
  const [snapchatConstrainWidth, setSnapchatConstrainWidth] = useState(false);

  // Dailymotion-specific options
  const [useDailymotionClickToPlay, setUseDailymotionClickToPlay] = useState(true);
  const [dailymotionBodyMaxLength, setDailymotionBodyMaxLength] = useState(100);

  const [odyseeBodyMaxLength, setOdyseeBodyMaxLength] = useState(100);
  const [archiveBodyMaxLength, setArchiveBodyMaxLength] = useState(100);
  const [archiveShowViews, setArchiveShowViews] = useState(true);
  const [archiveShowSize, setArchiveShowSize] = useState(true);
  const [archiveShowReviews, setArchiveShowReviews] = useState(true);
  const [archiveShowDate, setArchiveShowDate] = useState(true);

  // Enforce default width for Telegram if strictly 100% (allows user to change it, but resets on platform switch/load)
  React.useEffect(() => {
    if (platform === "telegram" && width === "100%") {
      setWidth("700px");
    }
  }, [platform, width]);

  // Kick-specific options
  // Kick-specific options
  const [kickShowTitle, setKickShowTitle] = useState(true);
  const [kickShowThumbnail, setKickShowThumbnail] = useState(true);
  const [kickShowViews, setKickShowViews] = useState(true);
  const [kickShowBadge, setKickShowBadge] = useState(true);
  const [kickShowCategory, setKickShowCategory] = useState(true);
  const [kickShowLanguage, setKickShowLanguage] = useState(true);
  const [kickShowMature, setKickShowMature] = useState(true);
  const [kickShowFollowers, setKickShowFollowers] = useState(true);
  const [kickShowTags, setKickShowTags] = useState(true);

  const [tumblrShowNotes, setTumblrShowNotes] = useState(true);
  const [tumblrShowTags, setTumblrShowTags] = useState(true);

  // LinkedIn state
  const [linkedInCollapsed, setLinkedInCollapsed] = useState(true);
  const [linkedInHeight, setLinkedInHeight] = useState<number | undefined>(undefined);
  const [linkedInConstrainWidth, setLinkedInConstrainWidth] = useState(false);
  const [bilibiliConstrainWidth, setBilibiliConstrainWidth] = useState(false);

  const isMastodon = platform === "mastodon";
  const isThreads = platform === "threads";
  const isTelegram = platform === "telegram";
  const isLinkedIn = platform === "linkedin";
  const isBilibili = platform === "bilibili";
  const isSpotify = platform === "spotify";
  const isAppleMusic = platform === "appleMusic";
  const isDeezer = platform === "deezer";
  const isTidal = platform === "tidal";
  const isSoundCloud = platform === "soundcloud";
  const isApplePodcasts = platform === "applePodcasts";
  const isSnapchat = platform === "snapchat";
  const isDailymotion = platform === "dailymotion";
  const activeCtaLabel = ctaLabels[platform];
  const resolvedCtaLabel = activeCtaLabel?.trim();
  const activeCtaLabelIcon = ctaLabelIcons[platform];
  const activeCtaLabelIconPosition = ctaLabelIconPositions[platform];
  const activeCtaUsePlatformColor = ctaUsePlatformColors[platform];
  const activeCtaUsePlatformIconColor = ctaUsePlatformIconColors[platform];

  const formatProp = (name: string, value: string | number | boolean | undefined) => {
    if (value === undefined) return null;
    if (typeof value === "string") return `  ${name}=${JSON.stringify(value)}`;
    if (typeof value === "number") return `  ${name}={${value}}`;
    return `  ${name}={${value}}`;
  };

  const buildEmbedCode = () => {
    const themeValue = darkMode ? "dark" : "light";
    const commonValues = {
      theme: themeValue,
      width,
      maxWidth,
      showBranding,
      showCTA,
      disableCard,
      linkBehavior,
      linkTarget
    };
    const baseCtaProps = buildCommonPropEntries(commonValues, [
      ...COMMON_PROP_KEYS.base,
      ...COMMON_PROP_KEYS.cta
    ]);
    const baseCtaLinkProps = buildCommonPropEntries(commonValues, [
      ...COMMON_PROP_KEYS.base,
      ...COMMON_PROP_KEYS.cta,
      ...COMMON_PROP_KEYS.link
    ]);
    const baseNoThemeCtaProps = buildCommonPropEntries(commonValues, [
      "width",
      "maxWidth",
      "showBranding",
      "disableCard",
      "showCTA"
    ] as const);
    let componentName: string;
    let props: Array<[string, string | number | boolean | undefined]> = [];

    switch (platform) {
      case "reddit":
        componentName = "RedditEmbed";
        props = [
          ["url", activeUrl],
          ["showTitle", showTitle],
          ["showSubreddit", showSubreddit],
          ["showAuthor", showAuthor],
          ["showDate", showDate],
          ["showBody", showBody],
          ["showMedia", showMedia],
          ["showUpvotes", showUpvotes],
          ["showCommentCount", showCommentCount],
          ["showPostType", showPostType],
          ...baseCtaLinkProps
        ];
        break;
      case "x":
        componentName = "XEmbed";
        props = [
          ["url", activeUrl],
          ["iframeAlignment", xAlignment],
          ["constrainWidthByViewport", xConstrainWidth],
          ...baseCtaLinkProps
        ];
        break;
      case "bluesky":
        componentName = "BlueskyEmbed";
        props = [
          ["url", activeUrl],
          ["showAuthor", showAuthor],
          ["showHandle", showHandle],
          ["showDate", showDate],
          ["showBody", showBody],
          ["showMedia", showMedia],
          ...baseCtaLinkProps
        ];
        break;
      case "mastodon":
        componentName = "MastodonEmbed";
        props = [
          ["url", activeUrl],
          ["theme", themeValue],
          ["renderMode", mastodonUseOfficial ? "oembed" : "card"],
          ["linkBehavior", mastodonUseOfficial ? undefined : linkBehavior],
          ["linkTarget", mastodonUseOfficial ? undefined : linkTarget],
          ["showBranding", mastodonUseOfficial ? undefined : showBranding],
          ["showAuthor", mastodonUseOfficial ? undefined : showAuthor],
          ["showHandle", mastodonUseOfficial ? undefined : showHandle],
          ["showDate", mastodonUseOfficial ? undefined : showDate],
          ["showBody", mastodonUseOfficial ? undefined : showBody],
          ["showMedia", mastodonUseOfficial ? undefined : showMedia],
          ["showFavorites", mastodonUseOfficial ? undefined : mastodonShowFavorites],
          ["showReblogs", mastodonUseOfficial ? undefined : mastodonShowReblogs],
          ["showReplies", mastodonUseOfficial ? undefined : showReplies],
          ["maxBodyLength", mastodonUseOfficial ? undefined : mastodonBodyMaxLength],
          ["disableCard", mastodonUseOfficial ? undefined : disableCard],
          ...buildCommonPropEntries(commonValues, ["width", "maxWidth", "showCTA"] as const)
        ];
        break;
      case "threads":
        componentName = "ThreadsEmbed";
        props = [
          ["url", activeUrl],
          ["ctaAlignment", showCTA ? threadsCtaAlignment : undefined],
          ...baseCtaProps
        ];
        break;
      case "truthSocial":
        componentName = "TruthSocialEmbed";
        props = [
          ["url", activeUrl],
          ["ctaAlignment", showCTA ? truthSocialCtaAlignment : undefined],
          ...baseCtaProps
        ];
        break;
      case "telegram":
        componentName = "TelegramEmbed";
        props = [
          ["url", activeUrl],
          ["accentColor", telegramAccentColor],
          ["dark", darkMode],
          ["className", "telegram-embed"],
          ["ctaAlignment", showCTA ? telegramCtaAlignment : undefined],
          ["embedAlignment", telegramEmbedAlignment],
          ["constrainWidthByEmbed", telegramConstrainWidth],
          ...baseNoThemeCtaProps
        ];
        break;
      case "linkedin":
        componentName = "LinkedInEmbed";
        props = [
          ["url", activeUrl],
          ["height", linkedInHeight],
          ["collapsed", linkedInCollapsed],
          ["constrainWidthByEmbed", linkedInConstrainWidth],
          ...baseCtaProps
        ];
        break;
      case "bilibili":
        componentName = "BilibiliEmbed";
        props = [
          ["url", activeUrl],
          ["constrainWidthByEmbed", bilibiliConstrainWidth],
          ...baseCtaLinkProps
        ];
        break;
      case "tiktok":
        componentName = "TikTokEmbed";
        props = [
          ["url", activeUrl],
          ["showTitle", showTitle],
          ["showAuthor", showAuthor],
          ["showDate", showDate],
          ["showBody", showBody],
          ["showMedia", showMedia],
          ["showLikes", showLikes],
          ["showComments", showCommentCount],
          ["showShares", showRetweets],
          ["showViews", showViews],
          ...baseCtaLinkProps
        ];
        break;
      case "facebook":
        componentName = "FacebookEmbed";
        props = [
          ["url", activeUrl],
          ["constrainWidthByEmbed", facebookConstrainCardWidth],
          ...baseCtaProps
        ];
        break;
      case "youtube":
        componentName = "YouTubeEmbed";
        props = [
          ["url", activeUrl],
          ["showTitle", showTitle],
          ["showAuthor", showAuthor],
          ["showDate", showDate],
          ["showMedia", showMedia],
          ...baseCtaLinkProps
        ];
        break;
      case "rumble":
        componentName = "RumbleEmbed";
        props = [
          ["url", activeUrl],
          ["showTitle", showTitle],
          ["showAuthor", showAuthor],
          ["showDate", showDate],
          ["showMedia", showMedia],
          ["showDuration", useRumbleDuration],
          ["showMeta", useRumbleMeta],
          ...buildCommonPropEntries(commonValues, [
            "theme",
            "width",
            "maxWidth",
            "showBranding",
            "disableCard",
            "linkBehavior",
            "linkTarget"
          ] as const)
        ];
        break;
      case "dailymotion":
        componentName = "DailymotionEmbed";
        props = [
          ["url", activeUrl],
          ["showTitle", showTitle],
          ["showAuthor", showAuthor],
          ["showBody", showBody],
          ["bodyMaxLength", dailymotionBodyMaxLength],
          ["showMedia", showMedia],
          ["clickToPlay", useDailymotionClickToPlay],
          ...baseCtaLinkProps
        ];
        break;
      case "odysee":
        componentName = "OdyseeEmbed";
        props = [
          ["url", activeUrl],
          ["showTitle", showTitle],
          ["showAuthor", showAuthor],
          ["showBody", showBody],
          ["bodyMaxLength", odyseeBodyMaxLength],
          ["showMedia", showMedia],
          ...baseCtaLinkProps
        ];
        break;
      case "archive":
        componentName = "ArchiveOrgEmbed";
        props = [
          ["url", activeUrl],
          ["showTitle", showTitle],
          ["showAuthor", showAuthor],
          ["showBody", showBody],
          ["bodyMaxLength", archiveBodyMaxLength],
          ["showViews", archiveShowViews],
          ["showSize", archiveShowSize],
          ["showReviews", archiveShowReviews],
          ["showDate", archiveShowDate],
          ["autoPlay", false],
          ...baseCtaLinkProps
        ];
        break;
      case "kick":
        componentName = "KickEmbed";
        props = [
          ["url", activeUrl],
          ["showTitle", kickShowTitle],
          ["showAuthor", showAuthor],
          ["showBody", showBody],
          ["showMedia", showMedia],
          ["showDate", showDate],
          ["showThumbnail", kickShowThumbnail],
          ["showViews", kickShowViews],
          ["showLiveBadge", kickShowBadge],
          ["showCategory", kickShowCategory],
          ["showLanguage", kickShowLanguage],
          ["showMature", kickShowMature],
          ["showTags", kickShowTags],
          ...baseCtaProps
        ];
        break;
      case "twitch":
        componentName = "TwitchEmbed";
        props = [
          ["url", activeUrl],
          ["showViews", showViews],
          ...baseCtaProps
        ];
        break;
      case "tumblr":
        componentName = "TumblrEmbed";
        props = [
          ["url", activeUrl],
          ["showTitle", showTitle],
          ["showAuthor", showAuthor],
          ["showBody", showBody],
          ["showMedia", showMedia],
          ["showDate", showDate],
          ["showNotes", tumblrShowNotes],
          ["showTags", tumblrShowTags],
          ...baseCtaLinkProps
        ];
        break;
      case "pinterest":
        componentName = "PinterestEmbed";
        props = [
          ["url", activeUrl],
          ["showDescription", showBody],
          ["showMedia", showMedia],
          ["showAuthor", showAuthor],
          ["showStats", true],
          ["showSaves", pinterestShowSaves],
          ["constrainImageWidth", pinterestConstrainWidth],
          ["imageAlignment", pinterestAlignment],
          ["imageMaxWidth", pinterestImageMaxWidth],
          ...baseCtaLinkProps
        ];
        break;
      case "spotify":
        componentName = "SpotifyEmbed";
        props = [
          ["url", activeUrl],
          ...baseCtaLinkProps
        ];
        break;
      case "appleMusic":
        componentName = "AppleMusicEmbed";
        props = [
          ["url", activeUrl],
          ...baseCtaLinkProps
        ];
        break;
      case "deezer":
        componentName = "DeezerEmbed";
        props = [
          ["url", activeUrl],
          ...baseCtaLinkProps
        ];
        break;
      case "tidal":
        componentName = "TidalEmbed";
        props = [
          ["url", activeUrl],
          ...baseCtaLinkProps
        ];
        break;
      case "soundcloud":
        componentName = "SoundCloudEmbed";
        props = [
          ["url", activeUrl],
          ...baseCtaLinkProps
        ];
        break;
      case "applePodcasts":
        componentName = "ApplePodcastsEmbed";
        props = [
          ["url", activeUrl],
          ...baseCtaLinkProps
        ];
        break;
      case "instagram":
        componentName = "InstagramEmbed";
        props = [
          ["url", activeUrl],
          ["iframeAlignment", instagramAlignment],
          ["constrainWidthByViewport", instagramConstrainWidth],
          ["constrainWidthByEmbed", instagramConstrainCardWidth],
          ...baseCtaProps
        ];
        break;
      case "snapchat":
        componentName = "SnapchatEmbed";
        props = [
          ["url", activeUrl],
          ["ctaAlignment", showCTA ? snapchatCtaAlignment : undefined],
          ["embedAlignment", snapchatEmbedAlignment],
          ["constrainWidthByEmbed", snapchatConstrainWidth],
          ...buildCommonPropEntries(
            commonValues,
            ["theme", "width", "maxWidth", "showBranding", "disableCard", "showCTA"] as const
          )
        ];
        break;
      default:
        componentName = "EmbedCard";
        props = [["provider", "Example"]];
    }
    props.push(...buildCtaPropEntries({
      showCTA,
      ctaLabel: resolvedCtaLabel,
      ctaLabelIcon: activeCtaLabelIcon,
      ctaLabelIconPosition: activeCtaLabelIconPosition,
      ctaUsePlatformColor: activeCtaUsePlatformColor,
      ctaUsePlatformIconColor: activeCtaUsePlatformIconColor
    }));

    const propLines = props
      .map(([name, value]) => formatProp(name, value))
      .filter(Boolean)
      .join("\n");

    const platformLayout = platformLayouts[platform];
    const layoutProp = platformLayout !== "default" ? `\n  cardLayout="${platformLayout}"` : "";
    const componentMarkup = `<${componentName}${propLines ? `\n${propLines}` : ""}${layoutProp}${propLines || layoutProp ? "\n" : ""}/>`;

    if (globalLayout !== "default") {
      return `import { ${componentName}, CardLayoutProvider } from \"react-embeds\";\n\n<CardLayoutProvider layout=\"${globalLayout}\">\n  ${componentMarkup}\n</CardLayoutProvider>`;
    }

    return `import { ${componentName}, CardLayoutProvider } from \"react-embeds\";\n\n${componentMarkup}`;
  };

  const embedCode = buildEmbedCode();
  const platformLayout = platformLayouts[platform];
  const resolvedCardLayout = platformLayout === "default" ? undefined : platformLayout;
  const effectiveLayout = platformLayout !== "default"
    ? platformLayout
    : globalLayout !== "default"
      ? globalLayout
      : PLATFORM_DEFAULT_LAYOUTS[platform] ?? "classic";
  const lastEffectiveLayoutRef = React.useRef<Record<Platform, LayoutOption>>(
    PLATFORM_CONFIG.reduce((acc, item) => {
      acc[item.id as Platform] = "default";
      return acc;
    }, {} as Record<Platform, LayoutOption>)
  );
  React.useEffect(() => {
    const lastLayout = lastEffectiveLayoutRef.current[platform];
    if (lastLayout !== effectiveLayout && effectiveLayout === "modern") {
      setCtaUsePlatformColors((prev) => {
        if (prev[platform] || ctaUsePlatformIconColors[platform]) return prev;
        return { ...prev, [platform]: true };
      });
      setCtaUsePlatformIconColors((prev) => {
        if (prev[platform] === false) return prev;
        return { ...prev, [platform]: false };
      });
    }
    lastEffectiveLayoutRef.current[platform] = effectiveLayout;
  }, [effectiveLayout, platform, ctaUsePlatformIconColors, setCtaUsePlatformColors, setCtaUsePlatformIconColors]);
  const defaultsCode = useMemo(() => {
    switch (platform) {
      case "reddit":
        return [
          `import { RedditEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<RedditEmbed`,
          `  url="$url"`,
          `  maxBodyLength={220}`,
          `  showTitle={true}`,
          `  showSubreddit={true}`,
          `  showAuthor={true}`,
          `  showDate={true}`,
          `  showBody={true}`,
          `  showMedia={true}`,
          `  showUpvotes={true}`,
          `  showCommentCount={true}`,
          `  showPostType={true}`,
          `  showBranding={true}`,
          `  showCTA={true}`,
          `  ctaLabel="View on Reddit"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={true}`,
          `  ctaUsePlatformIconColor={false}`,
          `  disableCard={false}`,
          `  linkBehavior="cta"`,
          `  linkTarget="_blank"`,
          `/>`
        ].join("\n");
      case "x":
        return [
          `import { XEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<XEmbed`,
          `  url="$url"`,
          `  theme="light"`,
          `  showBranding={true}`,
          `  showCTA={true}`,
          `  disableCard={false}`,
          `  ctaLabel="Open on X"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  linkBehavior="cta"`,
          `  linkTarget="_blank"`,
          `  iframeAlignment="center"`,
          `  constrainWidthByViewport={false}`,
          `  maxWidth="100%"`,
          `/>`
        ].join("\n");
      case "bluesky":
        return [
          `import { BlueskyEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<BlueskyEmbed`,
          `  url="$url"`,
          `  linkTarget="_blank"`,
          `  showCTA={true}`,
          `  ctaLabel="View on Bluesky"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  showAuthor={true}`,
          `  showHandle={true}`,
          `  showDate={true}`,
          `  showBody={true}`,
          `  showMedia={true}`,
          `  theme="light"`,
          `  retryDelay={5000}`,
          `  maxRetries={3}`,
          `  showBranding={true}`,
          `/>`
        ].join("\n");
      case "mastodon":
        return [
          `import { MastodonEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<MastodonEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth="100%"`,
          `  theme="light"`,
          `  renderMode="card"`,
          `  linkTarget="_blank"`,
          `  linkBehavior="cta"`,
          `  showCTA={true}`,
          `  ctaLabel="View on Mastodon"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  showBranding={true}`,
          `  showAuthor={true}`,
          `  showHandle={true}`,
          `  showDate={true}`,
          `  showBody={true}`,
          `  showMedia={true}`,
          `  showFavorites={true}`,
          `  showReblogs={true}`,
          `  showReplies={true}`,
          `  maxBodyLength={500}`,
          `  disableCard={false}`,
          `  oembedProxyUrl="/api/mastodon-oembed"`,
          `/>`
        ].join("\n");
      case "threads":
        return [
          `import { ThreadsEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<ThreadsEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth={540}`,
          `  theme="light"`,
          `  showCTA={true}`,
          `  ctaLabel="View on Threads"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  ctaAlignment="left"`,
          `  showBranding={true}`,
          `  disableCard={false}`,
          `/>`
        ].join("\n");
      case "truthSocial":
        return [
          `import { TruthSocialEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<TruthSocialEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth="100%"`,
          `  theme="light"`,
          `  linkTarget="_blank"`,
          `  linkBehavior="cta"`,
          `  showCTA={true}`,
          `  ctaLabel="View on Truth Social"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  ctaAlignment="left"`,
          `  showBranding={true}`,
          `  disableCard={false}`,
          `  oembedProxyUrl="/api/truthsocial-oembed"`,
          `/>`
        ].join("\n");
      case "linkedin":
        return [
          `import { LinkedInEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<LinkedInEmbed`,
          `  url="$url"`,
          `  width={504}`,
          `  maxWidth="100%"`,
          `  height={670}`,
          `  collapsed={true}`,
          `  theme="light"`,
          `  linkTarget="_blank"`,
          `  linkBehavior="cta"`,
          `  showCTA={true}`,
          `  ctaLabel="View on LinkedIn"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  ctaAlignment="left"`,
          `  showBranding={true}`,
          `  disableCard={false}`,
          `  iframeAlignment="center"`,
          `  constrainWidthByEmbed={false}`,
          `/>`
        ].join("\n");
      case "bilibili":
        return [
          `import { BilibiliEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<BilibiliEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth="100%"`,
          `  aspectRatio="16/9"`,
          `  autoplay={false}`,
          `  highQuality={true}`,
          `  danmaku={true}`,
          `  page={1}`,
          `  theme="light"`,
          `  showCTA={true}`,
          `  ctaLabel="View on Bilibili"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  showBranding={true}`,
          `  disableCard={false}`,
          `  constrainWidthByEmbed={false}`,
          `  linkBehavior="cta"`,
          `  linkTarget="_blank"`,
          `  cardLayout="modern"`,
          `/>`
        ].join("\n");
      case "instagram":
        return [
          `import { InstagramEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<InstagramEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth={550}`,
          `  theme="light"`,
          `  iframeAlignment="center"`,
          `  constrainWidthByViewport={true}`,
          `  constrainWidthByEmbed={false}`,
          `  showBranding={true}`,
          `  showCTA={true}`,
          `  ctaLabel="View on Instagram"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  disableCard={false}`,
          `/>`
        ].join("\n");
      case "tiktok":
        return [
          `import { TikTokEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<TikTokEmbed`,
          `  url="$url"`,
          `  theme="light"`,
          `  showBranding={true}`,
          `  showCTA={true}`,
          `  ctaLabel="View on TikTok"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  disableCard={false}`,
          `  showAuthor={true}`,
          `  showTitle={true}`,
          `  controls={true}`,
          `  progressBar={true}`,
          `  playButton={true}`,
          `  volumeControl={true}`,
          `  fullscreenButton={true}`,
          `  timestamp={true}`,
          `  loop={false}`,
          `  autoPlay={false}`,
          `  musicInfo={false}`,
          `  description={false}`,
          `  rel={true}`,
          `  nativeContextMenu={true}`,
          `  closedCaption={true}`,
          `  cardLayout="modern"`,
          `/>`
        ].join("\n");
      case "facebook":
        return [
          `import { FacebookEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<FacebookEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth={550}`,
          `  theme="light"`,
          `  constrainWidthByEmbed={false}`,
          `  showBranding={true}`,
          `  showCTA={true}`,
          `  ctaLabel="View on Facebook"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  disableCard={false}`,
          `/>`
        ].join("\n");
      case "youtube":
        return [
          `import { YouTubeEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<YouTubeEmbed`,
          `  url="$url"`,
          `  showTitle={true}`,
          `  showAuthor={true}`,
          `  showMedia={true}`,
          `  showBranding={true}`,
          `  showCTA={true}`,
          `  ctaLabel="Watch on YouTube"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  disableCard={false}`,
          `  width="100%"`,
          `  maxWidth="100%"`,
          `  linkBehavior="cta"`,
          `  linkTarget="_blank"`,
          `  theme="light"`,
          `  cardLayout="modern"`,
          `/>`
        ].join("\n");
      case "rumble":
        return [
          `import { RumbleEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<RumbleEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth="100%"`,
          `  theme="light"`,
          `  showTitle={true}`,
          `  showAuthor={true}`,
          `  showDate={true}`,
          `  showMedia={true}`,
          `  showBranding={true}`,
          `  ctaLabel="Watch on Rumble"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  disableCard={false}`,
          `  linkBehavior="cta"`,
          `  linkTarget="_blank"`,
          `  showDuration={false}`,
          `  showMeta={false}`,
          `  cardLayout="modern"`,
          `/>`
        ].join("\n");
      case "dailymotion":
        return [
          `import { DailymotionEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<DailymotionEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth="100%"`,
          `  theme="light"`,
          `  showTitle={true}`,
          `  showAuthor={true}`,
          `  showBody={true}`,
          `  bodyMaxLength={100}`,
          `  showMedia={true}`,
          `  showBranding={true}`,
          `  showCTA={true}`,
          `  ctaLabel="Watch on Dailymotion"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  disableCard={false}`,
          `  linkBehavior="cta"`,
          `  linkTarget="_blank"`,
          `  autoPlay={false}`,
          `  clickToPlay={true}`,
          `  cardLayout="modern"`,
          `/>`
        ].join("\n");
      case "odysee":
        return [
          `import { OdyseeEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<OdyseeEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth="100%"`,
          `  theme="light"`,
          `  showTitle={true}`,
          `  showAuthor={true}`,
          `  showBody={false}`,
          `  bodyMaxLength={100}`,
          `  showMedia={true}`,
          `  showBranding={true}`,
          `  showCTA={true}`,
          `  ctaLabel="Watch on Odysee"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  disableCard={false}`,
          `  linkBehavior="cta"`,
          `  linkTarget="_blank"`,
          `  autoPlay={false}`,
          `  clickToPlay={true}`,
          `/>`
        ].join("\n");
      case "archive":
        return [
          `import { ArchiveOrgEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<ArchiveOrgEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth="100%"`,
          `  theme="light"`,
          `  showTitle={true}`,
          `  showAuthor={true}`,
          `  showBody={false}`,
          `  showDate={true}`,
          `  showViews={true}`,
          `  showSize={true}`,
          `  showReviews={true}`,
          `  bodyMaxLength={100}`,
          `  showMedia={true}`,
          `  showBranding={true}`,
          `  showCTA={true}`,
          `  ctaLabel="View on Archive.org"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  disableCard={false}`,
          `  linkBehavior="cta"`,
          `  linkTarget="_blank"`,
          `  autoPlay={false}`,
          `  cardLayout="modern"`,
          `/>`
        ].join("\n");
      case "kick":
        return [
          `import { KickEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<KickEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth="100%"`,
          `  height={480}`,
          `  theme="light"`,
          `  showTitle={true}`,
          `  showAuthor={true}`,
          `  showDate={true}`,
          `  showThumbnail={true}`,
          `  showLiveBadge={true}`,
          `  showViews={true}`,
          `  showDescription={true}`,
          `  showCategory={true}`,
          `  showLanguage={true}`,
          `  showMature={true}`,
          `  showFollowers={true}`,
          `  showTags={true}`,
          `  showBranding={true}`,
          `  showCTA={true}`,
          `  ctaLabel="Watch on Kick"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  disableCard={false}`,
          `  cardLayout="modern"`,
          `/>`
        ].join("\n");
      case "twitch":
        return [
          `import { TwitchEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<TwitchEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth="100%"`,
          `  height={480}`,
          `  theme="light"`,
          `  showViews={true}`,
          `  showFollowers={true}`,
          `  showBranding={true}`,
          `  showCTA={true}`,
          `  ctaLabel="Watch on Twitch"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  disableCard={false}`,
          `  cardLayout="modern"`,
          `/>`
        ].join("\n");
      case "tumblr":
        return [
          `import { TumblrEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<TumblrEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth="100%"`,
          `  theme="light"`,
          `  showAvatar={true}`,
          `  showTitle={true}`,
          `  showBody={true}`,
          `  showMedia={true}`,
          `  showAuthor={true}`,
          `  showDate={true}`,
          `  showNotes={true}`,
          `  showTags={true}`,
          `  showBranding={true}`,
          `  showCTA={true}`,
          `  ctaLabel="View on Tumblr"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  disableCard={false}`,
          `  linkBehavior="cta"`,
          `  linkTarget="_blank"`,
          `/>`
        ].join("\n");
      case "pinterest":
        return [
          `import { PinterestEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<PinterestEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth={450}`,
          `  theme="light"`,
          `  showDescription={true}`,
          `  showMedia={true}`,
          `  showAuthor={true}`,
          `  showStats={true}`,
          `  showSaves={true}`,
          `  showBranding={true}`,
          `  showCTA={true}`,
          `  ctaLabel="View on Pinterest"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  constrainImageWidth={false}`,
          `  imageAlignment="center"`,
          `  disableCard={false}`,
          `  linkBehavior="cta"`,
          `  linkTarget="_blank"`,
          `/>`
        ].join("\n");
      case "spotify":
        return [
          `import { SpotifyEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<SpotifyEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth="100%"`,
          `  theme="light"`,
          `  showBranding={true}`,
          `  showCTA={true}`,
          `  ctaLabel="Open in Spotify"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  disableCard={false}`,
          `  constrainWidthByEmbed={false}`,
          `  linkBehavior="cta"`,
          `  linkTarget="_blank"`,
          `/>`
        ].join("\n");
      case "appleMusic":
        return [
          `import { AppleMusicEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<AppleMusicEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth="100%"`,
          `  theme="light"`,
          `  showBranding={true}`,
          `  showCTA={true}`,
          `  ctaLabel="Listen on Apple Music"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  disableCard={false}`,
          `  constrainWidthByEmbed={false}`,
          `  linkBehavior="cta"`,
          `  linkTarget="_blank"`,
          `/>`
        ].join("\n");
      case "deezer":
        return [
          `import { DeezerEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<DeezerEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth="100%"`,
          `  theme="light"`,
          `  showBranding={true}`,
          `  showCTA={true}`,
          `  ctaLabel="Listen on Deezer"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  disableCard={false}`,
          `  constrainWidthByEmbed={false}`,
          `  linkBehavior="cta"`,
          `  linkTarget="_blank"`,
          `/>`
        ].join("\n");
      case "tidal":
        return [
          `import { TidalEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<TidalEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth="100%"`,
          `  theme="light"`,
          `  showBranding={true}`,
          `  showCTA={true}`,
          `  ctaLabel="Listen on Tidal"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  disableCard={false}`,
          `  constrainWidthByEmbed={false}`,
          `  linkBehavior="cta"`,
          `  linkTarget="_blank"`,
          `/>`
        ].join("\n");
      case "soundcloud":
        return [
          `import { SoundCloudEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<SoundCloudEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth="100%"`,
          `  theme="light"`,
          `  showBranding={true}`,
          `  showCTA={true}`,
          `  ctaLabel="Listen on SoundCloud"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  disableCard={false}`,
          `  constrainWidthByEmbed={false}`,
          `  linkBehavior="cta"`,
          `  linkTarget="_blank"`,
          `  autoPlay={false}`,
          `/>`
        ].join("\n");
      case "applePodcasts":
        return [
          `import { ApplePodcastsEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<ApplePodcastsEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  maxWidth="100%"`,
          `  theme="light"`,
          `  showBranding={true}`,
          `  showCTA={true}`,
          `  ctaLabel="Listen on Apple Podcasts"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  disableCard={false}`,
          `  constrainWidthByEmbed={false}`,
          `  linkBehavior="cta"`,
          `  linkTarget="_blank"`,
          `/>`
        ].join("\n");
      case "telegram":
        return [
          `import { TelegramEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<TelegramEmbed`,
          `  url="$url"`,
          `  width={700}`,
          `  dark={false}`,
          `  showComments={true}`,
          `  disableCard={false}`,
          `  showCTA={true}`,
          `  ctaLabel="View on Telegram"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  ctaAlignment="left"`,
          `  embedAlignment="center"`,
          `  showBranding={true}`,
          `  constrainWidthByEmbed={false}`,
          `/>`
        ].join("\n");
      case "snapchat":
        return [
          `import { SnapchatEmbed, CardLayoutProvider } from "react-embeds";`,
          ``,
          `<SnapchatEmbed`,
          `  url="$url"`,
          `  width="100%"`,
          `  height={650}`,
          `  scriptLoad={true}`,
          `  disableCard={false}`,
          `  showCTA={true}`,
          `  ctaLabel="View on Snapchat"`,
          `  ctaLabelIcon={true}`,
          `  ctaLabelIconPosition="before"`,
          `  ctaUsePlatformColor={false}`,
          `  ctaUsePlatformIconColor={false}`,
          `  ctaAlignment="left"`,
          `  embedAlignment="center"`,
          `  showBranding={true}`,
          `  constrainWidthByEmbed={false}`,
          `  theme="light"`,
          `/>`
        ].join("\n");
      default:
        return "";
    }
  }, [platform]);
  const minimalUsageCode = useMemo(() => {
    const componentMap: Record<Platform, { name: string; url: string; importLines: string[] }> = {
      reddit: { name: "RedditEmbed", url: REDDIT_EXAMPLE_URL, importLines: [`import { RedditEmbed, CardLayoutProvider } from "react-embeds";`] },
      x: { name: "XEmbed", url: X_EXAMPLE_URL, importLines: [`import { XEmbed, CardLayoutProvider } from "react-embeds";`] },
      bluesky: { name: "BlueskyEmbed", url: BLUESKY_EXAMPLE_URL, importLines: [`import { BlueskyEmbed, CardLayoutProvider } from "react-embeds";`] },
      mastodon: { name: "MastodonEmbed", url: MASTODON_EXAMPLE_URL, importLines: [`import { MastodonEmbed, CardLayoutProvider } from "react-embeds";`] },
      threads: { name: "ThreadsEmbed", url: THREADS_EXAMPLE_URL, importLines: [`import { ThreadsEmbed, CardLayoutProvider } from "react-embeds";`] },
      truthSocial: { name: "TruthSocialEmbed", url: TRUTH_SOCIAL_EXAMPLE_URL, importLines: [`import { TruthSocialEmbed, CardLayoutProvider } from "react-embeds";`] },
      linkedin: { name: "LinkedInEmbed", url: LINKEDIN_EXAMPLE_URL, importLines: [`import { LinkedInEmbed, CardLayoutProvider } from "react-embeds";`] },
      bilibili: { name: "BilibiliEmbed", url: BILIBILI_EXAMPLE_URL, importLines: [`import { BilibiliEmbed, CardLayoutProvider } from "react-embeds";`] },
      instagram: { name: "InstagramEmbed", url: INSTAGRAM_EXAMPLE_URL, importLines: [`import { InstagramEmbed, CardLayoutProvider } from "react-embeds";`] },
      tiktok: { name: "TikTokEmbed", url: TIKTOK_EXAMPLE_URL, importLines: [`import { TikTokEmbed, CardLayoutProvider } from "react-embeds";`] },
      facebook: { name: "FacebookEmbed", url: FACEBOOK_EXAMPLE_URL, importLines: [`import { FacebookEmbed, CardLayoutProvider } from "react-embeds";`] },
      youtube: { name: "YouTubeEmbed", url: YOUTUBE_EXAMPLE_URL, importLines: [`import { YouTubeEmbed, CardLayoutProvider } from "react-embeds";`] },
      rumble: { name: "RumbleEmbed", url: RUMBLE_EXAMPLE_URL, importLines: [`import { RumbleEmbed, CardLayoutProvider } from "react-embeds";`] },
      dailymotion: { name: "DailymotionEmbed", url: DAILYMOTION_EXAMPLE_URL, importLines: [`import { DailymotionEmbed, CardLayoutProvider } from "react-embeds";`] },
      odysee: { name: "OdyseeEmbed", url: ODYSEE_EXAMPLE_URL, importLines: [`import { OdyseeEmbed, CardLayoutProvider } from "react-embeds";`] },
      archive: { name: "ArchiveOrgEmbed", url: ARCHIVE_EXAMPLE_URL, importLines: [`import { ArchiveOrgEmbed, CardLayoutProvider } from "react-embeds";`] },
      kick: { name: "KickEmbed", url: KICK_EXAMPLE_URL, importLines: [`import { KickEmbed, CardLayoutProvider } from "react-embeds";`] },
      twitch: { name: "TwitchEmbed", url: TWITCH_EXAMPLE_URL, importLines: [`import { TwitchEmbed, CardLayoutProvider } from "react-embeds";`] },
      tumblr: { name: "TumblrEmbed", url: TUMBLR_EXAMPLE_URL, importLines: [`import { TumblrEmbed, CardLayoutProvider } from "react-embeds";`] },
      pinterest: { name: "PinterestEmbed", url: PINTEREST_EXAMPLE_URL, importLines: [`import { PinterestEmbed, CardLayoutProvider } from "react-embeds";`] },
      spotify: { name: "SpotifyEmbed", url: SPOTIFY_EXAMPLE_URL, importLines: [`import { SpotifyEmbed, CardLayoutProvider } from "react-embeds";`] },
      appleMusic: { name: "AppleMusicEmbed", url: APPLE_MUSIC_SONG_URL, importLines: [`import { AppleMusicEmbed, CardLayoutProvider } from "react-embeds";`] },
      deezer: { name: "DeezerEmbed", url: DEEZER_TRACK_URL, importLines: [`import { DeezerEmbed, CardLayoutProvider } from "react-embeds";`] },
      tidal: { name: "TidalEmbed", url: TIDAL_TRACK_URL, importLines: [`import { TidalEmbed, CardLayoutProvider } from "react-embeds";`] },
      soundcloud: { name: "SoundCloudEmbed", url: SOUNDCLOUD_TRACK_URL, importLines: [`import { SoundCloudEmbed, CardLayoutProvider } from "react-embeds";`] },
      applePodcasts: { name: "ApplePodcastsEmbed", url: APPLE_PODCAST_EPISODE_URL, importLines: [`import { ApplePodcastsEmbed, CardLayoutProvider } from "react-embeds";`] },
      telegram: { name: "TelegramEmbed", url: TELEGRAM_EXAMPLE_URL, importLines: [`import { TelegramEmbed, CardLayoutProvider } from "react-embeds";`] },
      snapchat: { name: "SnapchatEmbed", url: SNAPCHAT_EXAMPLE_URL, importLines: [`import { SnapchatEmbed, CardLayoutProvider } from "react-embeds";`] }
    };
    const info = componentMap[platform];
    const usageLines = [
      ...info.importLines,
      ``,
      ...(globalLayout !== "default" ? [`<CardLayoutProvider layout="${globalLayout}">`, `  <${info.name}`, `    url="$url"`, `  />`, `</CardLayoutProvider>`] : [`<${info.name}`, `  url="$url"`, `/>`])
    ];
    return usageLines.join("\n");
  }, [globalLayout, platform]);
  const [usageText, setUsageText] = useState(embedCode);
  const [usageDirty, setUsageDirty] = useState(false);
  const [usageError, setUsageError] = useState<string | null>(null);
  const [layoutMenuOpen, setLayoutMenuOpen] = useState(false);
  const layoutMenuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!usageDirty) {
      setUsageText(embedCode);
    }
  }, [embedCode, usageDirty]);

  const parsePropValue = (rawValue: string) => {
    const trimmed = rawValue.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      const inner = trimmed.slice(1, -1).trim();
      if ((inner.startsWith('"') && inner.endsWith('"')) || (inner.startsWith("'") && inner.endsWith("'"))) {
        return inner.slice(1, -1);
      }
      if (inner === "true") return true;
      if (inner === "false") return false;
      const numberValue = Number(inner);
      if (!Number.isNaN(numberValue)) return numberValue;
      return inner;
    }
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return trimmed.slice(1, -1);
    }
    return trimmed;
  };

  const parseUsageSnippet = (text: string) => {
    const globalLayoutMatch = text.match(/<CardLayoutProvider[^>]*layout=['"]([^'"]+)['"]/);
    const globalLayoutValue = globalLayoutMatch?.[1] as LayoutOption | undefined;
    const componentMatch = text.match(/<\s*([A-Za-z][A-Za-z0-9]*)\s+([^>]*)\/>/s);
    if (!componentMatch) {
      return { globalLayout: globalLayoutValue, componentName: null, props: {} as Record<string, unknown> };
    }
    const componentName = componentMatch[1];
    const propsBlock = componentMatch[2] || "";
    const propRegex = /(\w+)\s*=\s*({[^}]*}|"[^"]*"|'[^']*')/g;
    const props: Record<string, unknown> = {};
    let match: RegExpExecArray | null;
    while ((match = propRegex.exec(propsBlock)) !== null) {
      props[match[1]] = parsePropValue(match[2]);
    }
    return { globalLayout: globalLayoutValue, componentName, props };
  };

  const applyUsageOverrides = (text: string) => {
    const componentMap: Record<string, Platform> = {
      RedditEmbed: "reddit",
      XEmbed: "x",
      BlueskyEmbed: "bluesky",
      MastodonEmbed: "mastodon",
      ThreadsEmbed: "threads",
      TruthSocialEmbed: "truthSocial",
      LinkedInEmbed: "linkedin",
      BilibiliEmbed: "bilibili",
      InstagramEmbed: "instagram",
      TikTokEmbed: "tiktok",
      FacebookEmbed: "facebook",
      YouTubeEmbed: "youtube",
      RumbleEmbed: "rumble",
      DailymotionEmbed: "dailymotion",
      OdyseeEmbed: "odysee",
      ArchiveOrgEmbed: "archive",
      KickEmbed: "kick",
      TwitchEmbed: "twitch",
      TumblrEmbed: "tumblr",
      PinterestEmbed: "pinterest",
      SpotifyEmbed: "spotify",
      AppleMusicEmbed: "appleMusic",
      DeezerEmbed: "deezer",
      TidalEmbed: "tidal",
      SoundCloudEmbed: "soundcloud",
      ApplePodcastsEmbed: "applePodcasts",
      TelegramEmbed: "telegram",
      SnapchatEmbed: "snapchat"
    };

    const { globalLayout, componentName, props } = parseUsageSnippet(text);
    if (globalLayout && ["default", "classic", "modern"].includes(globalLayout)) {
      setGlobalLayout(globalLayout);
    } else if (!globalLayout) {
      setGlobalLayout("default");
    }

    if (!componentName || !componentMap[componentName]) {
      return false;
    }

    const targetPlatform = componentMap[componentName];
    if (targetPlatform !== platform) {
      setPlatform(targetPlatform);
    }

    if (typeof props.url === "string") {
      setUrl(props.url);
      setActiveUrl(props.url);
    }
    if (props.theme === "dark") setDarkMode(true);
    if (props.theme === "light") setDarkMode(false);

    const booleanProps: Array<[string, (value: boolean) => void]> = [
      ["showTitle", setShowTitle],
      ["showSubreddit", setShowSubreddit],
      ["showAuthor", setShowAuthor],
      ["showHandle", setShowHandle],
      ["showDate", setShowDate],
      ["showBody", setShowBody],
      ["showMedia", setShowMedia],
      ["showUpvotes", setShowUpvotes],
      ["showCommentCount", setShowCommentCount],
      ["showPostType", setShowPostType],
      ["showBranding", setShowBranding],
      ["showCTA", setShowCTA],
      ["disableCard", setDisableCard],
      ["showFavorites", setMastodonShowFavorites],
      ["showReblogs", setMastodonShowReblogs],
      ["constrainWidthByViewport", setXConstrainWidth],
      ["constrainWidthByEmbed", setTelegramConstrainWidth],
      ["showLikes", setShowLikes],
      ["showShares", setShowRetweets],
      ["showViews", setShowViews],
      ["showReplies", setShowReplies],
      ["showNotes", setTumblrShowNotes],
      ["showTags", setTumblrShowTags],
      ["showSaves", setPinterestShowSaves],
      ["showDuration", setUseRumbleDuration],
      ["showMeta", setUseRumbleMeta]
    ];

    booleanProps.forEach(([key, setter]) => {
      if (typeof props[key] === "boolean") {
        setter(props[key] as boolean);
      }
    });

    if (typeof props.width === "string" || typeof props.width === "number") {
      setWidth(props.width as string | number);
    }
    if (typeof props.maxWidth === "string" || typeof props.maxWidth === "number") {
      setMaxWidth(props.maxWidth as string | number);
    }
    if (typeof props.linkBehavior === "string") {
      setLinkBehavior(props.linkBehavior as "card" | "title" | "cta" | "none");
    }
    if (typeof props.linkTarget === "string") {
      setLinkTarget(props.linkTarget as "_blank" | "_self" | "_parent" | "_top");
    }
    if (typeof props.ctaLabel === "string") {
      setCtaLabels((prev) => ({
        ...prev,
        [targetPlatform]: props.ctaLabel as string
      }));
    }
    if (typeof props.ctaLabelIcon === "boolean") {
      setCtaLabelIcons((prev) => ({
        ...prev,
        [targetPlatform]: props.ctaLabelIcon as boolean
      }));
    }
    if (typeof props.ctaLabelIconPosition === "string" && (props.ctaLabelIconPosition === "before" || props.ctaLabelIconPosition === "after")) {
      setCtaLabelIconPositions((prev) => ({
        ...prev,
        [targetPlatform]: props.ctaLabelIconPosition as "before" | "after"
      }));
    }
    if (typeof props.ctaUsePlatformColor === "boolean") {
      setCtaUsePlatformColors((prev) => ({
        ...prev,
        [targetPlatform]: props.ctaUsePlatformColor as boolean
      }));
      if (props.ctaUsePlatformColor) {
        setCtaUsePlatformIconColors((prev) => ({
          ...prev,
          [targetPlatform]: false
        }));
      }
    }
    if (typeof props.ctaUsePlatformIconColor === "boolean") {
      setCtaUsePlatformIconColors((prev) => ({
        ...prev,
        [targetPlatform]: props.ctaUsePlatformIconColor as boolean
      }));
      if (props.ctaUsePlatformIconColor) {
        setCtaUsePlatformColors((prev) => ({
          ...prev,
          [targetPlatform]: false
        }));
      }
    }
    if (Object.prototype.hasOwnProperty.call(props, "cardLayout") && typeof props.cardLayout === "string") {
      setPlatformLayouts((prev) => ({
        ...prev,
        [targetPlatform]: props.cardLayout as LayoutOption
      }));
    } else if (!Object.prototype.hasOwnProperty.call(props, "cardLayout")) {
      setPlatformLayouts((prev) => ({
        ...prev,
        [targetPlatform]: "default"
      }));
    }

    if (typeof props.iframeAlignment === "string") {
      setXAlignment(props.iframeAlignment as "center" | "left" | "right");
      setInstagramAlignment(props.iframeAlignment as "center" | "left" | "right");
    }
    if (typeof props.embedAlignment === "string") {
      setTelegramEmbedAlignment(props.embedAlignment as "center" | "left" | "right");
      setSnapchatEmbedAlignment(props.embedAlignment as "center" | "left" | "right");
    }
    if (typeof props.ctaAlignment === "string") {
      setThreadsCtaAlignment(props.ctaAlignment as "left" | "center" | "right");
      setTruthSocialCtaAlignment(props.ctaAlignment as "left" | "center" | "right");
      setTelegramCtaAlignment(props.ctaAlignment as "left" | "center" | "right");
      setSnapchatCtaAlignment(props.ctaAlignment as "left" | "center" | "right");
    }

    if (typeof props.renderMode === "string") {
      setMastodonUseOfficial(props.renderMode === "oembed");
    }
    if (typeof props.collapsed === "boolean") {
      setLinkedInCollapsed(props.collapsed);
    }
    if (typeof props.height === "number") {
      setLinkedInHeight(props.height);
    }
    if (typeof props.bodyMaxLength === "number") {
      setMastodonBodyMaxLength(props.bodyMaxLength);
      setDailymotionBodyMaxLength(props.bodyMaxLength);
      setOdyseeBodyMaxLength(props.bodyMaxLength);
      setArchiveBodyMaxLength(props.bodyMaxLength);
    }
    if (typeof props.clickToPlay === "boolean") {
      setUseDailymotionClickToPlay(props.clickToPlay);
    }
    if (typeof props.showViews === "boolean") {
      setArchiveShowViews(props.showViews);
    }
    if (typeof props.showSize === "boolean") {
      setArchiveShowSize(props.showSize);
    }
    if (typeof props.showReviews === "boolean") {
      setArchiveShowReviews(props.showReviews);
    }
    if (typeof props.showDate === "boolean") {
      setArchiveShowDate(props.showDate);
    }
    if (typeof props.showTitle === "boolean") {
      setKickShowTitle(props.showTitle);
    }
    if (typeof props.showThumbnail === "boolean") {
      setKickShowThumbnail(props.showThumbnail);
    }
    if (typeof props.showLiveBadge === "boolean") {
      setKickShowBadge(props.showLiveBadge);
    }
    if (typeof props.showCategory === "boolean") {
      setKickShowCategory(props.showCategory);
    }
    if (typeof props.showLanguage === "boolean") {
      setKickShowLanguage(props.showLanguage);
    }
    if (typeof props.showMature === "boolean") {
      setKickShowMature(props.showMature);
    }
    if (typeof props.showTags === "boolean") {
      setKickShowTags(props.showTags);
    }
    if (typeof props.showDescription === "boolean") {
      setShowBody(props.showDescription);
    }
    if (typeof props.constrainImageWidth === "boolean") {
      setPinterestConstrainWidth(props.constrainImageWidth);
    }
    if (typeof props.imageAlignment === "string") {
      setPinterestAlignment(props.imageAlignment as "center" | "left" | "right");
    }
    if (typeof props.imageMaxWidth === "string" || typeof props.imageMaxWidth === "number") {
      setPinterestImageMaxWidth(String(props.imageMaxWidth));
    }
    if (typeof props.accentColor === "string") {
      setTelegramAccentColor(props.accentColor);
    }
    if (typeof props.dark === "boolean") {
      setDarkMode(props.dark);
    }
    if (typeof props.constrainWidthByViewport === "boolean") {
      setInstagramConstrainWidth(props.constrainWidthByViewport);
      setXConstrainWidth(props.constrainWidthByViewport);
    }
    if (typeof props.constrainWidthByEmbed === "boolean") {
      setInstagramConstrainCardWidth(props.constrainWidthByEmbed);
      setLinkedInConstrainWidth(props.constrainWidthByEmbed);
      setFacebookConstrainCardWidth(props.constrainWidthByEmbed);
      setBilibiliConstrainWidth(props.constrainWidthByEmbed);
      setTelegramConstrainWidth(props.constrainWidthByEmbed);
      setSnapchatConstrainWidth(props.constrainWidthByEmbed);
    }
    if (typeof props.controls === "boolean") setTikTokControls(props.controls);
    if (typeof props.loop === "boolean") setTikTokLoop(props.loop);
    if (typeof props.autoPlay === "boolean") setTikTokAutoPlay(props.autoPlay);
    if (typeof props.musicInfo === "boolean") setTikTokMusicInfo(props.musicInfo);
    if (typeof props.description === "boolean") setTikTokDescription(props.description);
    if (typeof props.progressBar === "boolean") setTikTokProgressBar(props.progressBar);
    if (typeof props.playButton === "boolean") setTikTokPlayButton(props.playButton);
    if (typeof props.volumeControl === "boolean") setTikTokVolumeControl(props.volumeControl);
    if (typeof props.fullscreenButton === "boolean") setTikTokFullscreen(props.fullscreenButton);
    if (typeof props.timestamp === "boolean") setTikTokTimestamp(props.timestamp);
    return true;
  };


  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  React.useEffect(() => {
    if (!layoutMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!layoutMenuRef.current) return;
      if (!layoutMenuRef.current.contains(event.target as Node)) {
        setLayoutMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [layoutMenuOpen]);

  // Handle platform change
  const handlePlatformChange = (newPlatform: Platform) => {
    setPlatform(newPlatform);
    setWidth("100%");
    setMaxWidth("100%");
    if (newPlatform === "reddit") {
      setUrl(REDDIT_EXAMPLE_URL);
      setActiveUrl(REDDIT_EXAMPLE_URL);
    } else if (newPlatform === "x") {
      setUrl(X_EXAMPLE_URL);
      setActiveUrl(X_EXAMPLE_URL);
    } else if (newPlatform === "bluesky") {
      setUrl(BLUESKY_EXAMPLE_URL);
      setActiveUrl(BLUESKY_EXAMPLE_URL);
    } else if (newPlatform === "mastodon") {
      setUrl(MASTODON_EXAMPLE_URL);
      setActiveUrl(MASTODON_EXAMPLE_URL);
    } else if (newPlatform === "threads") {
      setUrl(THREADS_EXAMPLE_URL);
      setActiveUrl(THREADS_EXAMPLE_URL);
    } else if (newPlatform === "truthSocial") {
      setUrl(TRUTH_SOCIAL_EXAMPLE_URL);
      setActiveUrl(TRUTH_SOCIAL_EXAMPLE_URL);
    } else if (newPlatform === "telegram") {
      setUrl(TELEGRAM_EXAMPLE_URL);
      setActiveUrl(TELEGRAM_EXAMPLE_URL);
    } else if (newPlatform === "linkedin") {
      setUrl(LINKEDIN_EXAMPLE_URL);
      setActiveUrl(LINKEDIN_EXAMPLE_URL);
    } else if (newPlatform === "bilibili") {
      setUrl(BILIBILI_EXAMPLE_URL);
      setActiveUrl(BILIBILI_EXAMPLE_URL);
    } else if (newPlatform === "tiktok") {
      setUrl(TIKTOK_EXAMPLE_URL);
      setActiveUrl(TIKTOK_EXAMPLE_URL);
    } else if (newPlatform === "facebook") {
      setUrl(FACEBOOK_EXAMPLE_URL);
      setActiveUrl(FACEBOOK_EXAMPLE_URL);
    } else if (newPlatform === "youtube") {
      setUrl(YOUTUBE_EXAMPLE_URL);
      setActiveUrl(YOUTUBE_EXAMPLE_URL);
    } else if (newPlatform === "rumble") {
      setUrl(RUMBLE_EXAMPLE_URL);
      setActiveUrl(RUMBLE_EXAMPLE_URL);
    } else if (newPlatform === "dailymotion") {
      setUrl(DAILYMOTION_EXAMPLE_URL);
      setActiveUrl(DAILYMOTION_EXAMPLE_URL);
    } else if (newPlatform === "odysee") {
      setUrl(ODYSEE_EXAMPLE_URL);
      setActiveUrl(ODYSEE_EXAMPLE_URL);
    } else if (newPlatform === "archive") {
      setUrl(ARCHIVE_EXAMPLE_URL);
      setActiveUrl(ARCHIVE_EXAMPLE_URL);
    } else if (newPlatform === "kick") {
      setUrl(KICK_EXAMPLE_URL);
      setActiveUrl(KICK_EXAMPLE_URL);
    } else if (newPlatform === "twitch") {
      setUrl("https://www.twitch.tv/gamesdonequick");
      setActiveUrl("https://www.twitch.tv/gamesdonequick");
    } else if (newPlatform === "tumblr") {
      setUrl(TUMBLR_EXAMPLE_URL);
      setActiveUrl(TUMBLR_EXAMPLE_URL);
    } else if (newPlatform === "pinterest") {
      setUrl(PINTEREST_EXAMPLE_URL);
      setActiveUrl(PINTEREST_EXAMPLE_URL);
    } else if (newPlatform === "spotify") {
      setUrl(SPOTIFY_EXAMPLE_URL);
      setActiveUrl(SPOTIFY_EXAMPLE_URL);
    } else if (newPlatform === "appleMusic") {
      setUrl(APPLE_MUSIC_SONG_URL);
      setActiveUrl(APPLE_MUSIC_SONG_URL);
    } else if (newPlatform === "deezer") {
      setUrl(DEEZER_TRACK_URL);
      setActiveUrl(DEEZER_TRACK_URL);
    } else if (newPlatform === "tidal") {
      setUrl(TIDAL_TRACK_URL);
      setActiveUrl(TIDAL_TRACK_URL);
    } else if (newPlatform === "soundcloud") {
      setUrl(SOUNDCLOUD_TRACK_URL);
      setActiveUrl(SOUNDCLOUD_TRACK_URL);
    } else if (newPlatform === "applePodcasts") {
      setUrl(APPLE_PODCAST_EPISODE_URL);
      setActiveUrl(APPLE_PODCAST_EPISODE_URL);
    } else if (newPlatform === "snapchat") {
      setUrl(SNAPCHAT_EXAMPLE_URL);
      setActiveUrl(SNAPCHAT_EXAMPLE_URL);
      setWidth("100%");
      setMaxWidth("100%");
    } else { // instagram
      setUrl(INSTAGRAM_EXAMPLE_URL);
      setActiveUrl(INSTAGRAM_EXAMPLE_URL);
      setMaxWidth("100%");
    }

    // Reset maxWidth for non-Snapchat platforms (except Instagram which falls through to else above, wait)
    // Actually, I need to check if I should reset maxWidth for ALL others or just rely on manual change?
    // Current code doesn't reset maxWidth for others.
    // I should probably reset it to "100%" for all others to be clean.
  if (newPlatform !== "snapchat") {
      setMaxWidth("100%");
    }
  };

  const previewInner = (
    platform === "reddit" ? (
      <RedditEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        showTitle={showTitle}
        showSubreddit={showSubreddit}
        showAuthor={showAuthor}
        showDate={showDate}
        showBody={showBody}
        showMedia={showMedia}
        showUpvotes={showUpvotes}
        showCommentCount={showCommentCount}
        showPostType={showPostType}
        showBranding={showBranding}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        linkBehavior={linkBehavior}
        linkTarget={linkTarget}
        disableCard={disableCard}
        width={width}
        maxWidth={maxWidth}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "x" ? (
      <XEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        width={width}
        maxWidth={maxWidth}
        showBranding={showBranding}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        disableCard={disableCard}
        iframeAlignment={xAlignment}
        constrainWidthByViewport={xConstrainWidth}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "bluesky" ? (
      <BlueskyEmbed
        url={activeUrl}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        linkBehavior={linkBehavior}
        linkTarget={linkTarget}
        disableCard={disableCard}
        width={width}
        maxWidth={maxWidth}
        theme={darkMode ? "dark" : "light"}
        showAuthor={showAuthor}
        showHandle={showHandle}
        showDate={showDate}
        showBody={showBody}
        showMedia={showMedia}
        showBranding={showBranding}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "mastodon" ? (
      <MastodonEmbed
        url={activeUrl}
        width={width}
        maxWidth={maxWidth}
        theme={darkMode ? "dark" : "light"}
        renderMode={mastodonUseOfficial ? "oembed" : "card"}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        disableCard={mastodonUseOfficial ? false : disableCard}
        linkBehavior={mastodonUseOfficial ? undefined : linkBehavior}
        linkTarget={mastodonUseOfficial ? undefined : linkTarget}
        showBranding={mastodonUseOfficial ? undefined : showBranding}
        showAuthor={mastodonUseOfficial ? undefined : showAuthor}
        showHandle={mastodonUseOfficial ? undefined : showHandle}
        showDate={mastodonUseOfficial ? undefined : showDate}
        showBody={mastodonUseOfficial ? undefined : showBody}
        showMedia={mastodonUseOfficial ? undefined : showMedia}
        showFavorites={mastodonUseOfficial ? undefined : mastodonShowFavorites}
        showReblogs={mastodonUseOfficial ? undefined : mastodonShowReblogs}
        showReplies={mastodonUseOfficial ? undefined : showReplies}
        maxBodyLength={mastodonUseOfficial ? undefined : mastodonBodyMaxLength}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "threads" ? (
      <ThreadsEmbed
        url={activeUrl}
        width={width}
        maxWidth={maxWidth}
        theme={darkMode ? "dark" : "light"}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        ctaAlignment={showCTA ? threadsCtaAlignment : undefined}
        showBranding={showBranding}
        disableCard={disableCard}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "truthSocial" ? (
      <TruthSocialEmbed
        url={activeUrl}
        width={width}
        maxWidth={maxWidth}
        theme={darkMode ? "dark" : "light"}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        ctaAlignment={showCTA ? truthSocialCtaAlignment : undefined}
        showBranding={showBranding}
        disableCard={disableCard}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "telegram" ? (
      <TelegramEmbed
        url={activeUrl}
        width={width}
        maxWidth={maxWidth}
        accentColor={telegramAccentColor}
        dark={darkMode}
        className="telegram-embed"
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        ctaAlignment={showCTA ? telegramCtaAlignment : undefined}
        embedAlignment={telegramEmbedAlignment}
        showBranding={showBranding}
        disableCard={disableCard}
        constrainWidthByEmbed={telegramConstrainWidth}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "linkedin" ? (
      <LinkedInEmbed
        url={activeUrl}
        width={width}
        maxWidth={maxWidth}
        height={linkedInHeight}
        collapsed={linkedInCollapsed}
        theme={darkMode ? "dark" : "light"}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        showBranding={showBranding}
        disableCard={disableCard}
        constrainWidthByEmbed={linkedInConstrainWidth}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "bilibili" ? (
      <BilibiliEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        showBranding={showBranding}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        linkBehavior={linkBehavior}
        linkTarget={linkTarget}
        disableCard={disableCard}
        width={width}
        maxWidth={maxWidth}
        constrainWidthByEmbed={bilibiliConstrainWidth}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "tiktok" ? (
      <TikTokEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        width={width}
        showBranding={showBranding}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        disableCard={disableCard}
        showAuthor={showAuthor}
        showTitle={showTitle}
        controls={tiktokControls}
        loop={tiktokLoop}
        autoPlay={tiktokAutoPlay}
        musicInfo={tiktokMusicInfo}
        description={tiktokDescription}
        progressBar={tiktokProgressBar}
        playButton={tiktokPlayButton}
        volumeControl={tiktokVolumeControl}
        fullscreenButton={tiktokFullscreen}
        timestamp={tiktokTimestamp}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "facebook" ? (
      <FacebookEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        showBranding={showBranding}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        width={width}
        maxWidth={maxWidth}
        disableCard={disableCard}
        constrainWidthByEmbed={facebookConstrainCardWidth}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "youtube" ? (
      <YouTubeEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        linkBehavior={linkBehavior}
        linkTarget={linkTarget}
        disableCard={disableCard}
        width={width}
        maxWidth={maxWidth}
        showTitle={showTitle}
        showAuthor={showAuthor}
        showBranding={showBranding}
        showMedia={showMedia}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "rumble" ? (
      <RumbleEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        showTitle={showTitle}
        showAuthor={showAuthor}
        showDate={showDate}
        showMedia={showMedia}
        showBranding={showBranding}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        linkBehavior={linkBehavior}
        linkTarget={linkTarget}
        disableCard={disableCard}
        width={width}
        maxWidth={maxWidth}
        showDuration={useRumbleDuration}
        showMeta={useRumbleMeta}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "dailymotion" ? (
      <DailymotionEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        showTitle={showTitle}
        showAuthor={showAuthor}
        showBody={showBody}
        bodyMaxLength={dailymotionBodyMaxLength}
        showMedia={showMedia}
        showBranding={showBranding}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        linkBehavior={linkBehavior}
        linkTarget={linkTarget}
        disableCard={disableCard}
        width={width}
        maxWidth={maxWidth}
        clickToPlay={useDailymotionClickToPlay}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "odysee" ? (
      <OdyseeEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        showTitle={showTitle}
        showAuthor={showAuthor}
        showBody={showBody}
        bodyMaxLength={odyseeBodyMaxLength}
        showMedia={showMedia}
        showBranding={showBranding}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        linkBehavior={linkBehavior}
        linkTarget={linkTarget}
        disableCard={disableCard}
        width={width}
        maxWidth={maxWidth}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "archive" ? (
      <ArchiveOrgEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        showTitle={showTitle}
        showAuthor={showAuthor}
        showBody={showBody}
        bodyMaxLength={archiveBodyMaxLength}
        showViews={archiveShowViews}
        showSize={archiveShowSize}
        showReviews={archiveShowReviews}
        showDate={archiveShowDate}
        showBranding={showBranding}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        linkBehavior={linkBehavior}
        linkTarget={linkTarget}
        disableCard={disableCard}
        width={width}
        maxWidth={maxWidth}
        autoPlay={false}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "kick" ? (
      <KickEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        width={width}
        maxWidth={maxWidth}
        showTitle={kickShowTitle}
        showAuthor={showAuthor}
        showBody={showBody}
        showMedia={showMedia}
        showBranding={showBranding}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        disableCard={disableCard}
        showDate={showDate}
        showThumbnail={kickShowThumbnail}
        showViews={kickShowViews}
        showLiveBadge={kickShowBadge}
        showCategory={kickShowCategory}
        showLanguage={kickShowLanguage}
        showMature={kickShowMature}
        showTags={kickShowTags}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "twitch" ? (
      <TwitchEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        width={width}
        maxWidth={maxWidth}
        showViews={showViews}
        showBranding={showBranding}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        disableCard={disableCard}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "tumblr" ? (
      <TumblrEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        width={width}
        maxWidth={maxWidth}
        showTitle={showTitle}
        showAuthor={showAuthor}
        showBody={showBody}
        showMedia={showMedia}
        showDate={showDate}
        showNotes={tumblrShowNotes}
        showTags={tumblrShowTags}
        showBranding={showBranding}
        disableCard={disableCard}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        linkBehavior={linkBehavior}
        linkTarget={linkTarget}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "pinterest" ? (
      <PinterestEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        width={width}
        maxWidth={maxWidth}
        showDescription={showBody}
        showMedia={showMedia}
        showAuthor={showAuthor}
        showStats={true}
        showSaves={pinterestShowSaves}
        showBranding={showBranding}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        constrainImageWidth={pinterestConstrainWidth}
        imageAlignment={pinterestAlignment}
        imageMaxWidth={pinterestImageMaxWidth}
        disableCard={disableCard}
        linkBehavior={linkBehavior}
        linkTarget={linkTarget}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "spotify" ? (
      <SpotifyEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        width={width}
        maxWidth={maxWidth}
        showBranding={showBranding}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        disableCard={disableCard}
        linkBehavior={linkBehavior}
        linkTarget={linkTarget}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "appleMusic" ? (
      <AppleMusicEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        width={width}
        maxWidth={maxWidth}
        showBranding={showBranding}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        disableCard={disableCard}
        linkBehavior={linkBehavior}
        linkTarget={linkTarget}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "deezer" ? (
      <DeezerEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        width={width}
        maxWidth={maxWidth}
        showBranding={showBranding}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        disableCard={disableCard}
        linkBehavior={linkBehavior}
        linkTarget={linkTarget}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "tidal" ? (
      <TidalEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        width={width}
        maxWidth={maxWidth}
        showBranding={showBranding}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        disableCard={disableCard}
        linkBehavior={linkBehavior}
        linkTarget={linkTarget}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "soundcloud" ? (
      <SoundCloudEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        width={width}
        maxWidth={maxWidth}
        showBranding={showBranding}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        disableCard={disableCard}
        linkBehavior={linkBehavior}
        linkTarget={linkTarget}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "applePodcasts" ? (
      <ApplePodcastsEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        width={width}
        maxWidth={maxWidth}
        showBranding={showBranding}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        disableCard={disableCard}
        linkBehavior={linkBehavior}
        linkTarget={linkTarget}
        cardLayout={resolvedCardLayout}
      />
    ) : platform === "instagram" ? (
      <InstagramEmbed
        url={activeUrl}
        theme={darkMode ? "dark" : "light"}
        showBranding={showBranding}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        disableCard={disableCard}
        width={width}
        maxWidth={maxWidth}
        iframeAlignment={instagramAlignment}
        constrainWidthByViewport={instagramConstrainWidth}
        constrainWidthByEmbed={instagramConstrainCardWidth}
        cardLayout={resolvedCardLayout}
      />
    ) : (
      <SnapchatEmbed
        url={activeUrl}
        width={width}
        maxWidth={maxWidth}
        disableCard={disableCard}
        showCTA={showCTA}
        ctaLabel={resolvedCtaLabel}
        ctaLabelIcon={activeCtaLabelIcon}
        ctaLabelIconPosition={activeCtaLabelIconPosition}
        ctaUsePlatformColor={activeCtaUsePlatformColor}
        ctaUsePlatformIconColor={activeCtaUsePlatformIconColor}
        ctaAlignment={showCTA ? snapchatCtaAlignment : undefined}
        theme={darkMode ? "dark" : "light"}
        embedAlignment={snapchatEmbedAlignment}
        showBranding={showBranding}
        constrainWidthByEmbed={snapchatConstrainWidth}
        cardLayout={resolvedCardLayout}
      />
    )
  );

  return (
    <main>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "grid", gap: 8 }}>
          <h1>react-embeds playground</h1>
          <p className="description">
            Test the shared EmbedCard surface with Reddit, X/Twitter, Bluesky, and Instagram content.
            Toggle between platforms and customize display options.
          </p>
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
          <div ref={layoutMenuRef} style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setLayoutMenuOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={layoutMenuOpen}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                borderRadius: 999,
                border: "1px solid var(--border)",
                background: "#ffffff",
                color: "#111",
                fontSize: "0.8125rem",
                fontWeight: 600,
                letterSpacing: "0.02em",
                cursor: "pointer"
              }}
            >
              <span>
                {globalLayout === "default"
                  ? "Embed Default"
                  : globalLayout === "modern"
                    ? "Modern"
                    : "Classic"}
              </span>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRight: "2px solid #111",
                  borderBottom: "2px solid #111",
                  transform: layoutMenuOpen ? "rotate(-135deg)" : "rotate(45deg)",
                  transition: "transform 0.2s ease"
                }}
              />
            </button>
            {layoutMenuOpen && (
              <div
                role="listbox"
                aria-label="Embed layout"
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  minWidth: 180,
                  background: "#ffffff",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 6,
                  display: "grid",
                  gap: 4,
                  zIndex: 20
                }}
              >
                {([
                  { value: "default", label: "Embed Default" },
                  { value: "modern", label: "Modern" },
                  { value: "classic", label: "Classic" }
                ] as const).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={globalLayout === option.value}
                    onClick={() => {
                      setGlobalLayout(option.value);
                      setLayoutMenuOpen(false);
                    }}
                    style={{
                      textAlign: "left",
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: "none",
                      background: globalLayout === option.value
                        ? "rgba(0,0,0,0.06)"
                        : "transparent",
                      color: "#111",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid var(--border)",
              background: darkMode ? "#000000" : "#ffffff",
              color: darkMode ? "#ffffff" : "#111111",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              cursor: "pointer"
            }}
          >
            <span
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: darkMode ? "#ffffff" : "#111111",
                color: darkMode ? "#000000" : "#ffffff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                lineHeight: 1
              }}
              aria-hidden="true"
            >
              {darkMode ? "☾" : "☀"}
            </span>
            {darkMode ? "Dark" : "Light"}
          </button>
        </div>
      </div>

      <section className="card">
        {/* Platform Selector */}
        <div style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          flexWrap: "wrap"
        }}>
          {PLATFORM_CONFIG.map((platformConfig) => {
            const isActive = platform === platformConfig.id;
            const pillBackground = darkMode
              ? "#000"
              : "#fff";
            const pillBorder = "none";
            const labelColor = darkMode ? "#fff" : "#000";
            const iconColor = darkMode ? "#ffffff" : platformConfig.color;
            return (
              <button
                key={platformConfig.id}
                type="button"
                onClick={() => handlePlatformChange(platformConfig.id)}
                className={`platform-pill${isActive ? " active" : ""}`}
                style={{
                  background: pillBackground,
                  color: labelColor,
                  border: pillBorder,
                  padding: "8px 16px",
                  borderRadius: 20,
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: "0.9375rem",
                  transition: "all 0.2s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  boxSizing: "border-box",
                  "--pill-accent": platformConfig.color
                } as React.CSSProperties}
              >
                <span style={{ display: "flex" }}>
                  {renderPlatformIcon(platformConfig.id, iconColor)}
                </span>
                <span>{platformConfig.label}</span>
              </button>
            );
          })}
        </div>

        <h2>Try {platform === "reddit" ? "a Reddit" : platform === "x" ? "an X" : platform === "bluesky" ? "a Bluesky" : platform === "mastodon" ? "a Mastodon" : platform === "threads" ? "a Threads" : platform === "truthSocial" ? "a Truth Social" : platform === "telegram" ? "a Telegram" : platform === "linkedin" ? "a LinkedIn" : platform === "bilibili" ? "a Bilibili" : platform === "tiktok" ? "a TikTok" : platform === "facebook" ? "a Facebook" : platform === "youtube" ? "a YouTube" : platform === "rumble" ? "a Rumble" : platform === "dailymotion" ? "a Dailymotion" : platform === "odysee" ? "an Odysee" : platform === "archive" ? "an Archive.org" : platform === "kick" ? "a Kick" : platform === "twitch" ? "a Twitch" : platform === "tumblr" ? "a Tumblr" : platform === "pinterest" ? "a Pinterest" : platform === "spotify" ? "a Spotify" : platform === "appleMusic" ? "an Apple Music" : platform === "deezer" ? "a Deezer" : platform === "tidal" ? "a Tidal" : platform === "soundcloud" ? "a SoundCloud" : platform === "applePodcasts" ? "an Apple Podcasts" : platform === "snapchat" ? "a Snapchat" : "an Instagram"} URL</h2>
        <div className="controls">
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder={
              platform === "reddit" ? "Paste a Reddit post URL" :
                platform === "x" ? "Paste an X/Twitter post URL" :
                  platform === "bluesky" ? "Paste a Bluesky post URL" :
                    platform === "mastodon" ? "Paste a Mastodon status URL" :
                      platform === "threads" ? "Paste a Threads post URL" :
                        platform === "truthSocial" ? "Paste a Truth Social post URL" :
                          platform === "telegram" ? "Paste a Telegram post URL" :
                            platform === "linkedin" ? "Paste a LinkedIn post URL" :
                              platform === "bilibili" ? "Paste a Bilibili video URL" :
                                platform === "tiktok" ? "Paste a TikTok video URL" :
                                  platform === "facebook" ? "Paste a Facebook video/post URL" :
                                    platform === "youtube" ? "Paste a YouTube video URL" :
                                      platform === "rumble" ? "Paste a Rumble video or embed URL" :
                                        platform === "dailymotion" ? "Paste a Dailymotion video URL" :
                                          platform === "odysee" ? "Paste an Odysee video URL" :
                                            platform === "archive" ? "Paste an Archive.org URL" :
                                              platform === "kick" ? "Paste a Kick Channel/Video URL" :
                                                platform === "twitch" ? "Paste a Twitch Channel/Video/Clip URL" :
                                                  platform === "tumblr" ? "Paste a Tumblr post URL" :
                                                    platform === "pinterest" ? "Paste a Pinterest Pin URL" :
                                                      platform === "spotify" ? "Paste a Spotify Track/Album/Playlist URL" :
                                                        platform === "appleMusic" ? "Paste an Apple Music song/album/playlist URL" :
                                                          platform === "deezer" ? "Paste a Deezer track/album/playlist URL" :
                                                            platform === "tidal" ? "Paste a Tidal track/album/playlist URL" :
                                                              platform === "soundcloud" ? "Paste a SoundCloud track/playlist URL" :
                                                                platform === "applePodcasts" ? "Paste an Apple Podcasts show/episode URL" :
                                                                  platform === "snapchat" ? "Paste a Snapchat Lens/Spotlight URL" :
                                                                    "Paste an Instagram reel/post URL"
            }
          />
          <button type="button" onClick={() => setActiveUrl(previewUrl)}>Load</button>
          <button
            type="button"
            onClick={() => {
              if (platform === "reddit") {
                setUrl(REDDIT_EXAMPLE_URL);
                setActiveUrl(REDDIT_EXAMPLE_URL);
              } else if (platform === "x") {
                setUrl(X_EXAMPLE_URL);
                setActiveUrl(X_EXAMPLE_URL);
              } else if (platform === "bluesky") {
                setUrl(BLUESKY_EXAMPLE_URL);
                setActiveUrl(BLUESKY_EXAMPLE_URL);
              } else if (platform === "mastodon") {
                setUrl(MASTODON_EXAMPLE_URL);
                setActiveUrl(MASTODON_EXAMPLE_URL);
              } else if (platform === "threads") {
                setUrl(THREADS_EXAMPLE_URL);
                setActiveUrl(THREADS_EXAMPLE_URL);
              } else if (platform === "truthSocial") {
                setUrl(TRUTH_SOCIAL_EXAMPLE_URL);
                setActiveUrl(TRUTH_SOCIAL_EXAMPLE_URL);
              } else if (platform === "telegram") {
                setUrl(TELEGRAM_EXAMPLE_URL);
                setActiveUrl(TELEGRAM_EXAMPLE_URL);
                setWidth("700px");
              } else if (platform === "snapchat") {
                setUrl(SNAPCHAT_EXAMPLE_URL);
                setActiveUrl(SNAPCHAT_EXAMPLE_URL);
                setWidth(350); // Vertical layout default
              } else if (platform === "linkedin") {
                setUrl(LINKEDIN_EXAMPLE_URL);
                setActiveUrl(LINKEDIN_EXAMPLE_URL);
              } else if (platform === "bilibili") {
                setUrl(BILIBILI_EXAMPLE_URL);
                setActiveUrl(BILIBILI_EXAMPLE_URL);
              } else if (platform === "tiktok") {
                setUrl(TIKTOK_EXAMPLE_URL);
                setActiveUrl(TIKTOK_EXAMPLE_URL);
              } else if (platform === "facebook") {
                setUrl(FACEBOOK_EXAMPLE_URL);
                setActiveUrl(FACEBOOK_EXAMPLE_URL);
              } else if (platform === "youtube") {
                setUrl(YOUTUBE_EXAMPLE_URL);
                setActiveUrl(YOUTUBE_EXAMPLE_URL);
              } else if (platform === "rumble") {
                setUrl(RUMBLE_EXAMPLE_URL);
                setActiveUrl(RUMBLE_EXAMPLE_URL);
              } else if (platform === "dailymotion") {
                setUrl(DAILYMOTION_EXAMPLE_URL);
                setActiveUrl(DAILYMOTION_EXAMPLE_URL);
              } else if (platform === "archive") {
                setUrl(ARCHIVE_EXAMPLE_URL);
                setActiveUrl(ARCHIVE_EXAMPLE_URL);
              } else if (platform === "kick") {
                setUrl(KICK_EXAMPLE_URL);
                setActiveUrl(KICK_EXAMPLE_URL);
              } else if (platform === "twitch") {
                setUrl("https://www.twitch.tv/gamesdonequick");
                setActiveUrl("https://www.twitch.tv/gamesdonequick");
              } else if (platform === "tumblr") {
                setUrl(TUMBLR_EXAMPLE_URL);
                setActiveUrl(TUMBLR_EXAMPLE_URL);
              } else if (platform === "pinterest") {
                setUrl(PINTEREST_EXAMPLE_URL);
                setActiveUrl(PINTEREST_EXAMPLE_URL);
              } else if (platform === "spotify") {
                setUrl(SPOTIFY_EXAMPLE_URL);
                setActiveUrl(SPOTIFY_EXAMPLE_URL);
              } else if (platform === "appleMusic") {
                setUrl(APPLE_MUSIC_SONG_URL);
                setActiveUrl(APPLE_MUSIC_SONG_URL);
              } else if (platform === "deezer") {
                setUrl(DEEZER_TRACK_URL);
                setActiveUrl(DEEZER_TRACK_URL);
              } else if (platform === "tidal") {
                setUrl(TIDAL_TRACK_URL);
                setActiveUrl(TIDAL_TRACK_URL);
              } else if (platform === "soundcloud") {
                setUrl(SOUNDCLOUD_TRACK_URL);
                setActiveUrl(SOUNDCLOUD_TRACK_URL);
              } else if (platform === "applePodcasts") {
                setUrl(APPLE_PODCAST_EPISODE_URL);
                setActiveUrl(APPLE_PODCAST_EPISODE_URL);
              } else {
                setUrl(INSTAGRAM_EXAMPLE_URL);
                setActiveUrl(INSTAGRAM_EXAMPLE_URL);
              }
            }}
          >
            Example
          </button>
          {platform === "rumble" && (
            <>
              <button type="button" onClick={() => { setUrl(RUMBLE_EXAMPLE_URL); setActiveUrl(RUMBLE_EXAMPLE_URL); }}>Video URL</button>
              <button type="button" onClick={() => { setUrl(RUMBLE_EMBED_EXAMPLE_URL); setActiveUrl(RUMBLE_EMBED_EXAMPLE_URL); }}>Embed URL</button>
            </>
          )}

          {platform === "spotify" && (
            <>
              <button type="button" onClick={() => { setUrl(SPOTIFY_EXAMPLE_URL); setActiveUrl(SPOTIFY_EXAMPLE_URL); }}>Track</button>
              <button type="button" onClick={() => { setUrl(SPOTIFY_ALBUM_URL); setActiveUrl(SPOTIFY_ALBUM_URL); }}>Album</button>
              <button type="button" onClick={() => { setUrl(SPOTIFY_ARTIST_URL); setActiveUrl(SPOTIFY_ARTIST_URL); }}>Artist</button>
              <button type="button" onClick={() => { setUrl(SPOTIFY_PLAYLIST_URL); setActiveUrl(SPOTIFY_PLAYLIST_URL); }}>Playlist</button>
              <button type="button" onClick={() => { setUrl(SPOTIFY_USER_URL); setActiveUrl(SPOTIFY_USER_URL); }}>User</button>
            </>
          )}
          {platform === "appleMusic" && (
            <>
              <button type="button" onClick={() => { setUrl(APPLE_MUSIC_SONG_URL); setActiveUrl(APPLE_MUSIC_SONG_URL); }}>Song</button>
              <button type="button" onClick={() => { setUrl(APPLE_MUSIC_ALBUM_URL); setActiveUrl(APPLE_MUSIC_ALBUM_URL); }}>Album</button>
              <button type="button" onClick={() => { setUrl(APPLE_MUSIC_ARTIST_URL); setActiveUrl(APPLE_MUSIC_ARTIST_URL); }}>Artist</button>
              <button type="button" onClick={() => { setUrl(APPLE_MUSIC_PLAYLIST_URL); setActiveUrl(APPLE_MUSIC_PLAYLIST_URL); }}>Playlist</button>
            </>
          )}
          {platform === "deezer" && (
            <>
              <button type="button" onClick={() => { setUrl(DEEZER_TRACK_URL); setActiveUrl(DEEZER_TRACK_URL); }}>Track</button>
              <button type="button" onClick={() => { setUrl(DEEZER_ALBUM_URL); setActiveUrl(DEEZER_ALBUM_URL); }}>Album</button>
              <button type="button" onClick={() => { setUrl(DEEZER_ARTIST_URL); setActiveUrl(DEEZER_ARTIST_URL); }}>Artist</button>
              <button type="button" onClick={() => { setUrl(DEEZER_PLAYLIST_URL); setActiveUrl(DEEZER_PLAYLIST_URL); }}>Playlist</button>
            </>
          )}
          {platform === "tidal" && (
            <>
              <button type="button" onClick={() => { setUrl(TIDAL_TRACK_URL); setActiveUrl(TIDAL_TRACK_URL); }}>Track</button>
              <button type="button" onClick={() => { setUrl(TIDAL_ALBUM_URL); setActiveUrl(TIDAL_ALBUM_URL); }}>Album</button>
              <button type="button" onClick={() => { setUrl(TIDAL_PLAYLIST_URL); setActiveUrl(TIDAL_PLAYLIST_URL); }}>Playlist</button>
            </>
          )}
          {platform === "soundcloud" && (
            <>
              <button type="button" onClick={() => { setUrl(SOUNDCLOUD_TRACK_URL); setActiveUrl(SOUNDCLOUD_TRACK_URL); }}>Track</button>
              <button type="button" onClick={() => { setUrl(SOUNDCLOUD_PLAYLIST_URL); setActiveUrl(SOUNDCLOUD_PLAYLIST_URL); }}>Playlist</button>
            </>
          )}
          {platform === "applePodcasts" && (
            <>
              <button type="button" onClick={() => { setUrl(APPLE_PODCAST_EPISODE_URL); setActiveUrl(APPLE_PODCAST_EPISODE_URL); }}>Episode</button>
              <button type="button" onClick={() => { setUrl(APPLE_PODCAST_SHOW_URL); setActiveUrl(APPLE_PODCAST_SHOW_URL); }}>Show</button>
            </>
          )}
        </div>



        {/* Configuration Section Header */}
        <h3 style={{
          fontSize: "1rem",
          fontWeight: 600,
          margin: "8px 0 0 0",
          color: "var(--text)"
        }}>
          ⚙️ Embed Configuration
        </h3>

        {/* Layout Configuration */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "16px",
          background: "var(--bg)",
          borderRadius: "8px",
          border: "1px solid var(--border)"
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)" }}>
                {PLATFORM_CONFIG.find((item) => item.id === platform)?.label || "Platform"} Layout:
              </label>
              <select
                value={platformLayouts[platform]}
                onChange={(e) => {
                  const nextValue = e.target.value as LayoutOption;
                  setPlatformLayouts((prev) => ({ ...prev, [platform]: nextValue }));
                }}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontSize: "0.875rem",
                  cursor: "pointer"
                }}
              >
                <option value="default">Inherit Global</option>
                <option value="classic">Classic</option>
                <option value="modern">Modern</option>
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)" }}>
                Width:
              </label>
              <input
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="e.g. 100%, 500px"
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontSize: "0.875rem"
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)" }}>
                Max Width:
              </label>
              <input
                value={maxWidth}
                onChange={(e) => setMaxWidth(e.target.value)}
                placeholder="e.g. 600px, none"
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontSize: "0.875rem"
                }}
              />
            </div>
          </div>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", margin: 0 }}>
            Set layouts globally or override per platform, plus dimensions using any active CSS unit (%, px, em, rem).
          </p>
        </div>

        {/* Link Configuration */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "16px",
          background: "var(--bg)",
          borderRadius: "8px",
          border: "1px solid var(--border)"
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)" }}>
                Link Behavior:
              </label>
              <select
                value={linkBehavior}
                onChange={(e) => setLinkBehavior(e.target.value as "card" | "title" | "cta" | "none")}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontSize: "0.875rem",
                  cursor: "pointer"
                }}
              >
                <option value="cta">CTA Button Only (default)</option>
                <option value="card">Entire Card is Clickable</option>
                <option value="title">Title Only is Clickable</option>
                <option value="none">No Links</option>
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)" }}>
                Link Target:
              </label>
              <select
                value={linkTarget}
                onChange={(e) => setLinkTarget(e.target.value as "_blank" | "_self" | "_parent" | "_top")}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontSize: "0.875rem",
                  cursor: "pointer"
                }}
              >
                <option value="_blank">New Tab (_blank)</option>
                <option value="_self">Same Tab (_self)</option>
                <option value="_parent">Parent Frame (_parent)</option>
                <option value="_top">Top Frame (_top)</option>
              </select>
            </div>
          </div>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", margin: 0 }}>
            Customize how links function and where they open.
          </p>
        </div>

        {/* Display Options */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "12px",
          padding: "16px",
          background: "var(--bg)",
          borderRadius: "8px",
          border: "1px solid var(--border)"
        }}>
          {/* Common options */}
          {!isMastodon && !isThreads && platform !== "truthSocial" && platform !== "facebook" && platform !== "instagram" && !isTelegram && !isLinkedIn && !isBilibili && !isSpotify && !isAppleMusic && !isDeezer && !isTidal && !isSoundCloud && !isApplePodcasts && !isSnapchat && platform !== "tiktok" && platform !== "x" && platform !== "twitch" && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={showAuthor} onChange={(e) => setShowAuthor(e.target.checked)} />
              <span>Show Author</span>
            </label>
          )}
          {!isMastodon && !isThreads && (platform === "bluesky") && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={showHandle} onChange={(e) => setShowHandle(e.target.checked)} />
              <span>Show Handle</span>
            </label>
          )}
          {!isMastodon && !isThreads && platform !== "truthSocial" && platform !== "facebook" && platform !== "instagram" && !isTelegram && !isLinkedIn && !isBilibili && !isSpotify && !isAppleMusic && !isDeezer && !isTidal && !isSoundCloud && !isApplePodcasts && !isSnapchat && !isDailymotion && platform !== "pinterest" && platform !== "tiktok" && platform !== "x" && platform !== "twitch" && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={showDate} onChange={(e) => setShowDate(e.target.checked)} />
              <span>Show Date</span>
            </label>
          )}
          {!isMastodon && !isThreads && platform !== "truthSocial" && platform !== "facebook" && platform !== "instagram" && !isTelegram && !isLinkedIn && !isBilibili && !isSpotify && !isAppleMusic && !isDeezer && !isTidal && !isSoundCloud && !isApplePodcasts && !isSnapchat && platform !== "tiktok" && platform !== "x" && platform !== "youtube" && platform !== "twitch" && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={showBody} onChange={(e) => setShowBody(e.target.checked)} />
              <span>Show Body/Description</span>
            </label>
          )}
          {!isMastodon && !isThreads && platform !== "truthSocial" && platform !== "facebook" && platform !== "instagram" && !isTelegram && !isLinkedIn && !isBilibili && !isSpotify && !isAppleMusic && !isDeezer && !isTidal && !isSoundCloud && !isApplePodcasts && !isSnapchat && platform !== "tiktok" && platform !== "x" && platform !== "twitch" && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={showMedia} onChange={(e) => setShowMedia(e.target.checked)} />
              <span>Show Media/Content</span>
            </label>
          )}
          {!isMastodon && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={showBranding} onChange={(e) => setShowBranding(e.target.checked)} />
              <span>Show Platform Branding</span>
            </label>
          )}

          {platform === "tiktok" && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={showAuthor} onChange={(e) => setShowAuthor(e.target.checked)} />
              <span>Show Author</span>
            </label>
          )}
          {platform === "tiktok" && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={showTitle} onChange={(e) => setShowTitle(e.target.checked)} />
              <span>Show Description</span>
            </label>
          )}
          {platform === "tiktok" && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={tiktokControls} onChange={(e) => setTikTokControls(e.target.checked)} />
              <span>Controls</span>
            </label>
          )}
          {platform === "tiktok" && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={tiktokLoop} onChange={(e) => setTikTokLoop(e.target.checked)} />
              <span>Loop</span>
            </label>
          )}
          {platform === "tiktok" && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={tiktokAutoPlay} onChange={(e) => setTikTokAutoPlay(e.target.checked)} />
              <span>AutoPlay</span>
            </label>
          )}
          {platform === "tiktok" && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={tiktokMusicInfo} onChange={(e) => setTikTokMusicInfo(e.target.checked)} />
              <span>Music Info</span>
            </label>
          )}
          {platform === "tiktok" && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={tiktokDescription} onChange={(e) => setTikTokDescription(e.target.checked)} />
              <span>Desc (In Player)</span>
            </label>
          )}
          {platform === "tiktok" && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={tiktokProgressBar} onChange={(e) => setTikTokProgressBar(e.target.checked)} />
              <span>Progress Bar</span>
            </label>
          )}
          {platform === "tiktok" && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={tiktokPlayButton} onChange={(e) => setTikTokPlayButton(e.target.checked)} />
              <span>Play Button</span>
            </label>
          )}
          {platform === "tiktok" && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={tiktokVolumeControl} onChange={(e) => setTikTokVolumeControl(e.target.checked)} />
              <span>Volume</span>
            </label>
          )}
          {platform === "tiktok" && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={tiktokFullscreen} onChange={(e) => setTikTokFullscreen(e.target.checked)} />
              <span>Fullscreen</span>
            </label>
          )}
          {platform === "tiktok" && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={tiktokTimestamp} onChange={(e) => setTikTokTimestamp(e.target.checked)} />
              <span>Timestamp</span>
            </label>
          )}
          {isMastodon && !mastodonUseOfficial && (
            <>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={showBranding} onChange={(e) => setShowBranding(e.target.checked)} />
                <span>Show Branding</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={showAuthor} onChange={(e) => setShowAuthor(e.target.checked)} />
                <span>Show Author</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={showHandle} onChange={(e) => setShowHandle(e.target.checked)} />
                <span>Show Handle</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={showDate} onChange={(e) => setShowDate(e.target.checked)} />
                <span>Show Date</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={showBody} onChange={(e) => setShowBody(e.target.checked)} />
                <span>Show Body</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={showMedia} onChange={(e) => setShowMedia(e.target.checked)} />
                <span>Show Media</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={mastodonShowFavorites} onChange={(e) => setMastodonShowFavorites(e.target.checked)} />
                <span>Show Likes</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={mastodonShowReblogs} onChange={(e) => setMastodonShowReblogs(e.target.checked)} />
                <span>Show Reposts</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={showReplies} onChange={(e) => setShowReplies(e.target.checked)} />
                <span>Show Replies</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>Max Body Length</span>
                <input
                  type="number"
                  min={50}
                  max={2000}
                  step={10}
                  value={mastodonBodyMaxLength}
                  onChange={(e) => setMastodonBodyMaxLength(Number(e.target.value))}
                  style={{
                    width: 90,
                    padding: "6px 10px",
                    borderRadius: 6,
                    border: "1px solid var(--border)",
                    background: "var(--bg)",
                    color: "var(--text)"
                  }}
                />
              </label>
            </>
          )}
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <input type="checkbox" checked={showCTA} onChange={(e) => setShowCTA(e.target.checked)} />
            <span>Show CTA Button</span>
          </label>
          {showCTA && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>CTA Label</span>
              <input
                type="text"
                value={activeCtaLabel}
                onChange={(e) => {
                  const nextValue = e.target.value;
                  setCtaLabels((prev) => ({
                    ...prev,
                    [platform]: nextValue
                  }));
                }}
                style={{
                  flex: "1 1 auto",
                  minWidth: 180,
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid var(--border)",
                  background: "var(--bg)",
                  color: "var(--text)"
                }}
              />
            </label>
          )}
          {showCTA && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={activeCtaLabelIcon}
                onChange={(e) => {
                  const nextValue = e.target.checked;
                  setCtaLabelIcons((prev) => ({
                    ...prev,
                    [platform]: nextValue
                  }));
                }}
              />
              <span>Show CTA Icon</span>
            </label>
          )}
          {showCTA && activeCtaLabelIcon && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>CTA Icon Position</span>
              <select
                value={activeCtaLabelIconPosition}
                onChange={(e) => {
                  const nextValue = e.target.value === "after" ? "after" : "before";
                  setCtaLabelIconPositions((prev) => ({
                    ...prev,
                    [platform]: nextValue
                  }));
                }}
                style={{
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid var(--border)",
                  background: "var(--bg)",
                  color: "var(--text)"
                }}
              >
                <option value="before">Before</option>
                <option value="after">After</option>
              </select>
            </label>
          )}
          {showCTA && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={activeCtaUsePlatformColor}
                onChange={(e) => {
                  const nextValue = e.target.checked;
                  setCtaUsePlatformColors((prev) => ({
                    ...prev,
                    [platform]: nextValue
                  }));
                  if (nextValue) {
                    setCtaUsePlatformIconColors((prev) => ({
                      ...prev,
                      [platform]: false
                    }));
                  }
                }}
              />
              <span>Use Platform Color for CTA Button</span>
            </label>
          )}
          {showCTA && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={activeCtaUsePlatformIconColor}
                onChange={(e) => {
                  const nextValue = e.target.checked;
                  setCtaUsePlatformIconColors((prev) => ({
                    ...prev,
                    [platform]: nextValue
                  }));
                  if (nextValue) {
                    setCtaUsePlatformColors((prev) => ({
                      ...prev,
                      [platform]: false
                    }));
                  }
                }}
              />
              <span>Use Platform Color for CTA Icon</span>
            </label>
          )}
          {!isMastodon && !isThreads && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={disableCard} onChange={(e) => setDisableCard(e.target.checked)} />
              <span>Disable Card Style (Flush)</span>
            </label>
          )}
          {isThreads && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={disableCard} onChange={(e) => setDisableCard(e.target.checked)} />
              <span>Disable Card Style (Flush)</span>
            </label>
          )}
          {isMastodon && !mastodonUseOfficial && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={disableCard} onChange={(e) => setDisableCard(e.target.checked)} />
              <span>Disable Card Style (Flush)</span>
            </label>
          )}

          {/* Snapchat-specific options */}
          {
            platform === "snapchat" && (
              <>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={snapchatConstrainWidth}
                    onChange={(e) => setSnapchatConstrainWidth(e.target.checked)}
                  />
                  <span>Limit to Embed Width</span>
                </label>
                {showCTA && (
                  <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>CTA Alignment:</span>
                    <select
                      value={snapchatCtaAlignment}
                      onChange={(e) => setSnapchatCtaAlignment(e.target.value as "left" | "center" | "right")}
                      style={{ padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc" }}
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </label>
                )}
                <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>Embed Alignment:</span>
                  <select
                    value={snapchatEmbedAlignment}
                    onChange={(e) => setSnapchatEmbedAlignment(e.target.value as "left" | "center" | "right")}
                    style={{ padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc" }}
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </label>
              </>
            )
          }

          {/* Reddit-specific options */}
          {platform === "reddit" && (
            <>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={showTitle} onChange={(e) => setShowTitle(e.target.checked)} />
                <span>Show Title</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={showSubreddit} onChange={(e) => setShowSubreddit(e.target.checked)} />
                <span>Show Subreddit</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={showUpvotes} onChange={(e) => setShowUpvotes(e.target.checked)} />
                <span>Show Upvotes</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={showCommentCount} onChange={(e) => setShowCommentCount(e.target.checked)} />
                <span>Show Comment Count</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={showPostType} onChange={(e) => setShowPostType(e.target.checked)} />
                <span>Show Post Type Badge</span>
              </label>
            </>
          )}



          {/* X-specific options */}
          {platform === "x" && (
            <>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <span>Alignment</span>
                <select
                  value={xAlignment}
                  onChange={(e) => setXAlignment(e.target.value as "center" | "left" | "right")}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 999,
                    border: "1px solid var(--border)",
                    background: "var(--bg)",
                    color: "var(--text)"
                  }}
                >
                  <option value="center">Center</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={xConstrainWidth}
                  onChange={(e) => setXConstrainWidth(e.target.checked)}
                />
                <span>Limit to Embed Width</span>
              </label>
            </>
          )}

          {/* YouTube-specific options */}
          {platform === "youtube" && (
            <>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={showTitle} onChange={(e) => setShowTitle(e.target.checked)} />
                <span>Show Title</span>
              </label>
            </>
          )}

          {/* Instagram-specific options */}
          {platform === "instagram" && (
            <>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={instagramConstrainCardWidth}
                  onChange={(e) => setInstagramConstrainCardWidth(e.target.checked)}
                />
                <span>Limit Card to Embed Width</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={instagramConstrainWidth}
                  onChange={(e) => setInstagramConstrainWidth(e.target.checked)}
                />
                <span>Constrain width by viewport height</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>Alignment</span>
                <select
                  value={instagramAlignment}
                  onChange={(e) => setInstagramAlignment(e.target.value as "center" | "left" | "right")}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 999,
                    border: "1px solid var(--border)",
                    background: "var(--bg)",
                    color: "var(--text)"
                  }}
                >
                  <option value="center">Center</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </label>
            </>
          )}

          {platform === "facebook" && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={facebookConstrainCardWidth}
                onChange={(e) => setFacebookConstrainCardWidth(e.target.checked)}
              />
              <span>Limit Card to Embed Width</span>
            </label>
          )}

          {/* Pinterest-specific options */}
          {platform === "pinterest" && (
            <>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={pinterestShowSaves}
                  onChange={(e) => setPinterestShowSaves(e.target.checked)}
                />
                <span>Show Saves</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <span>Alignment</span>
                <select
                  value={pinterestAlignment}
                  onChange={(e) => setPinterestAlignment(e.target.value as "center" | "left" | "right")}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 999,
                    border: "1px solid var(--border)",
                    background: "var(--bg)",
                    color: "var(--text)"
                  }}
                >
                  <option value="center">Center</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={pinterestConstrainWidth}
                  onChange={(e) => setPinterestConstrainWidth(e.target.checked)}
                />
                <span>Limit image width</span>
              </label>
              {pinterestConstrainWidth && (
                <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>Image width</span>
                  <input
                    value={pinterestImageMaxWidth}
                    onChange={(e) => setPinterestImageMaxWidth(e.target.value)}
                    placeholder="e.g. 100%, 70%, 420px"
                    style={{
                      width: 120,
                      padding: "6px 10px",
                      borderRadius: 6,
                      border: "1px solid var(--border)",
                      background: "var(--bg)",
                      color: "var(--text)"
                    }}
                  />
                </label>
              )}
            </>
          )}



          {/* Mastodon-specific options */}
          {platform === "mastodon" && (
            <>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={mastodonUseOfficial} onChange={(e) => setMastodonUseOfficial(e.target.checked)} />
                <span>Use official Mastodon embed (dark-only)</span>
              </label>
            </>
          )}

          {platform === "threads" && showCTA && (
            <>
              <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>CTA alignment</span>
                <select
                  value={threadsCtaAlignment}
                  onChange={(e) => setThreadsCtaAlignment(e.target.value as "left" | "center" | "right")}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 999,
                    border: "1px solid var(--border)",
                    background: "var(--bg)",
                    color: "var(--text)"
                  }}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </label>
            </>
          )}

          {platform === "linkedin" && (
            <>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={linkedInCollapsed} onChange={(e) => setLinkedInCollapsed(e.target.checked)} />
                <span>Collapsed (Show less)</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={linkedInConstrainWidth}
                  onChange={(e) => setLinkedInConstrainWidth(e.target.checked)}
                />
                <span>Limit to Embed Width</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>Height (px)</span>
                <input
                  type="number"
                  value={linkedInHeight || ""}
                  placeholder="Default (670)"
                  onChange={(e) => {
                    const val = e.target.value;
                    setLinkedInHeight(val ? parseInt(val, 10) : undefined);
                  }}
                  style={{
                    width: 120,
                    padding: "6px 10px",
                    borderRadius: 6,
                    border: "1px solid var(--border)",
                    background: "var(--bg)",
                    color: "var(--text)"
                  }}
                />
              </label>
            </>
          )}
          {platform === "bilibili" && (
            <>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={bilibiliConstrainWidth}
                  onChange={(e) => setBilibiliConstrainWidth(e.target.checked)}
                />
                <span>Limit to Embed Width</span>
              </label>
            </>
          )}
          {platform === "truthSocial" && showCTA && (
            <>
              <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>CTA alignment</span>
                <select
                  value={truthSocialCtaAlignment}
                  onChange={(e) => setTruthSocialCtaAlignment(e.target.value as "left" | "center" | "right")}
                  style={{
                    padding: "4px 8px",
                    borderRadius: 6,
                    border: "1px solid var(--border)",
                    background: "var(--bg)",
                    color: "var(--text)"
                  }}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </label>
            </>
          )}

          {/* Telegram-specific options */}
          {
            platform === "telegram" && (
              <>
                <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>Accent Color (Hex)</span>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <input
                      type="color"
                      value={`#${telegramAccentColor}`}
                      onChange={(e) => setTelegramAccentColor(e.target.value.replace("#", ""))}
                      style={{ border: "none", width: 32, height: 32, padding: 0, background: "none", cursor: "pointer" }}
                    />
                    <input
                      type="text"
                      value={telegramAccentColor}
                      onChange={(e) => setTelegramAccentColor(e.target.value.replace("#", ""))}
                      placeholder="e.g. F646A4"
                      style={{
                        padding: "6px 10px",
                        borderRadius: 6,
                        border: "1px solid var(--border)",
                        background: "var(--bg)",
                        color: "var(--text)",
                        width: 100
                      }}
                    />
                  </div>
                </label>
                {showCTA && (
                  <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>CTA alignment</span>
                    <select
                      value={telegramCtaAlignment}
                      onChange={(e) => setTelegramCtaAlignment(e.target.value as "left" | "center" | "right")}
                      style={{
                        padding: "4px 8px",
                        borderRadius: 6,
                        border: "1px solid var(--border)",
                        background: "var(--bg)",
                        color: "var(--text)"
                      }}
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </label>
                )}
                <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>Embed alignment</span>
                  <select
                    value={telegramEmbedAlignment}
                    onChange={(e) => setTelegramEmbedAlignment(e.target.value as "left" | "center" | "right")}
                    style={{
                      padding: "4px 8px",
                      borderRadius: 6,
                      border: "1px solid var(--border)",
                      background: "var(--bg)",
                      color: "var(--text)"
                    }}
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={telegramConstrainWidth}
                    onChange={(e) => setTelegramConstrainWidth(e.target.checked)}
                  />
                  <span>Limit to Embed Width</span>
                </label>
              </>
            )
          }

          {/* Rumble-specific options */}
          {
            platform === "rumble" && (
              <>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={useRumbleDuration} onChange={(e) => setUseRumbleDuration(e.target.checked)} />
                  <span>Show Duration</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={useRumbleMeta} onChange={(e) => setUseRumbleMeta(e.target.checked)} />
                  <span>Show Meta (FPS/Res)</span>
                </label>
              </>
            )
          }

          {/* Tumblr-specific options */}
          {platform === "tumblr" && (
            <>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={tumblrShowNotes} onChange={(e) => setTumblrShowNotes(e.target.checked)} />
                <span>Show Notes</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={tumblrShowTags} onChange={(e) => setTumblrShowTags(e.target.checked)} />
                <span>Show Tags</span>
              </label>
            </>
          )}

          {/* Dailymotion-specific options */}
          {platform === "dailymotion" && (
            <>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={useDailymotionClickToPlay} onChange={(e) => setUseDailymotionClickToPlay(e.target.checked)} />
                <span>Click to Play (Thumbnail first)</span>
              </label>
              {showBody && (
                <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>Max Length:</span>
                  <input
                    type="number"
                    value={dailymotionBodyMaxLength}
                    onChange={(e) => setDailymotionBodyMaxLength(parseInt(e.target.value) || 100)}
                    style={{ width: 60, padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc" }}
                    min={10}
                    max={500}
                  />
                </label>
              )}
            </>
          )}

          {/* Odysee-specific options */}
          {platform === "odysee" && showBody && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>Max Length:</span>
              <input
                type="number"
                value={odyseeBodyMaxLength}
                onChange={(e) => setOdyseeBodyMaxLength(parseInt(e.target.value) || 100)}
                style={{ width: 60, padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc" }}
                min={10}
                max={500}
              />
            </label>
          )}


          {/* Archive-specific options */}
          {
            platform === "archive" && (
              <>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={showBody} onChange={(e) => setShowBody(e.target.checked)} />
                  <span>Show Description</span>
                </label>
                {showBody && (
                  <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>Max Length:</span>
                    <input
                      type="number"
                      value={archiveBodyMaxLength}
                      onChange={(e) => setArchiveBodyMaxLength(parseInt(e.target.value) || 100)}
                      style={{ width: 60, padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc" }}
                      min={10}
                      max={1000}
                    />
                  </label>
                )}
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={archiveShowViews} onChange={(e) => setArchiveShowViews(e.target.checked)} />
                  <span>Show Views</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={archiveShowSize} onChange={(e) => setArchiveShowSize(e.target.checked)} />
                  <span>Show Size</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={archiveShowReviews} onChange={(e) => setArchiveShowReviews(e.target.checked)} />
                  <span>Show Reviews</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={archiveShowDate} onChange={(e) => setArchiveShowDate(e.target.checked)} />
                  <span>Show Date</span>
                </label>
              </>
            )
          }
          {
            platform === "kick" && (
              <>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={kickShowTitle} onChange={(e) => setKickShowTitle(e.target.checked)} />
                  <span>Show Title</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={kickShowThumbnail} onChange={(e) => setKickShowThumbnail(e.target.checked)} />
                  <span>Show Thumbnail</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={kickShowViews} onChange={(e) => setKickShowViews(e.target.checked)} />
                  <span>Show View Count</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={kickShowBadge} onChange={(e) => setKickShowBadge(e.target.checked)} />
                  <span>Show Live Badge</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={kickShowCategory} onChange={(e) => setKickShowCategory(e.target.checked)} />
                  <span>Show Category</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={kickShowLanguage} onChange={(e) => setKickShowLanguage(e.target.checked)} />
                  <span>Show Language</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={kickShowMature} onChange={(e) => setKickShowMature(e.target.checked)} />
                  <span>Show 18+ Badge</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={kickShowTags} onChange={(e) => setKickShowTags(e.target.checked)} />
                  <span>Show Tags</span>
                </label>
              </>
            )
          }



        </div >

        <div className="preview">
          {globalLayout === "default" ? previewInner : (
            <CardLayoutProvider layout={globalLayout as CardLayout}>
              {previewInner}
            </CardLayoutProvider>
          )}
        </div>
        <div className="code-preview">
          <h2>Usage</h2>
          <textarea
            value={usageText}
            onChange={(event) => {
              const nextValue = event.target.value;
              setUsageText(nextValue);
              setUsageDirty(true);
              const updated = applyUsageOverrides(nextValue);
              if (updated) {
                setUsageError(null);
                setUsageDirty(false);
              } else {
                setUsageError("Could not parse usage. Use a self-closing embed component.");
              }
            }}
            style={{
              width: "100%",
              minHeight: "50vh",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--bg)",
              color: "var(--text)",
              padding: "12px 14px",
              fontSize: "0.875rem",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              lineHeight: 1.5,
              resize: "vertical",
              whiteSpace: "pre",
              boxSizing: "border-box"
            }}
          />
          {usageError && (
            <div style={{ marginTop: 8, fontSize: "0.8125rem", color: "#d14343" }}>
              {usageError}
            </div>
          )}
        </div>
        <div className="code-preview">
          <h2>Defaults (No Custom Settings)</h2>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", margin: "0 0 12px 0" }}>
            Minimal usage renders exactly the same as the expanded defaults below.
          </p>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
              Minimal Usage (Uses Default Embed Presets)
            </div>
            <pre>
              <code>{minimalUsageCode}</code>
            </pre>
          </div>
          <div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
              Default Embed Presets
            </div>
            <pre>
              <code>{defaultsCode}</code>
            </pre>
          </div>
        </div>
      </section >


    </main >
  );
}

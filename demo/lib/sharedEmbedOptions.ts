export type PropEntry = [string, string | number | boolean | undefined];

export type CommonPropKey =
  | "theme"
  | "width"
  | "maxWidth"
  | "showBranding"
  | "showCTA"
  | "disableCard"
  | "linkBehavior"
  | "linkTarget";

export const COMMON_PROP_KEYS = {
  base: ["theme", "width", "maxWidth", "showBranding", "disableCard"] as const,
  cta: ["showCTA"] as const,
  link: ["linkBehavior", "linkTarget"] as const
};

export const buildCommonPropEntries = (
  values: Record<CommonPropKey, string | number | boolean | undefined>,
  keys: readonly CommonPropKey[]
): PropEntry[] => keys.map((key) => [key, values[key]]);

export type CtaPropValues = {
  showCTA: boolean;
  ctaLabel?: string;
  ctaLabelIcon: boolean;
  ctaLabelIconPosition: "before" | "after";
  ctaUsePlatformColor: boolean;
  ctaUsePlatformIconColor: boolean;
};

export const buildCtaPropEntries = (values: CtaPropValues): PropEntry[] => {
  if (!values.showCTA || !values.ctaLabel?.trim()) {
    return [];
  }
  return [
    ["ctaLabel", values.ctaLabel],
    ["ctaLabelIcon", values.ctaLabelIcon],
    ["ctaLabelIconPosition", values.ctaLabelIconPosition],
    ["ctaUsePlatformColor", values.ctaUsePlatformColor],
    ["ctaUsePlatformIconColor", values.ctaUsePlatformIconColor]
  ];
};

export const DEFAULT_CTA_LABELS: Record<string, string> = {
  reddit: "View on Reddit",
  x: "Open on X",
  bluesky: "View on Bluesky",
  mastodon: "View on Mastodon",
  threads: "View on Threads",
  truthSocial: "View on Truth Social",
  linkedin: "View on LinkedIn",
  bilibili: "View on Bilibili",
  instagram: "View on Instagram",
  tiktok: "View on TikTok",
  facebook: "View on Facebook",
  youtube: "Watch on YouTube",
  rumble: "Watch on Rumble",
  dailymotion: "Watch on Dailymotion",
  odysee: "Watch on Odysee",
  archive: "View on Archive.org",
  kick: "Watch on Kick",
  twitch: "Watch on Twitch",
  tumblr: "View on Tumblr",
  pinterest: "View on Pinterest",
  spotify: "Open in Spotify",
  appleMusic: "Listen on Apple Music",
  deezer: "Listen on Deezer",
  tidal: "Listen on Tidal",
  soundcloud: "Listen on SoundCloud",
  applePodcasts: "Listen on Apple Podcasts",
  telegram: "View on Telegram"
};

export const createDefaultRecord = <T extends string | boolean>(
  keys: string[],
  value: T
) => keys.reduce((acc, key) => {
  acc[key] = value;
  return acc;
}, {} as Record<string, T>);

export const DEFAULT_CTA_LABEL_ICONS = createDefaultRecord(Object.keys(DEFAULT_CTA_LABELS), true as boolean);
export const DEFAULT_CTA_LABEL_ICON_POSITIONS = createDefaultRecord(Object.keys(DEFAULT_CTA_LABELS), "before");
export const DEFAULT_CTA_USE_PLATFORM_COLORS = createDefaultRecord(Object.keys(DEFAULT_CTA_LABELS), false as boolean);
DEFAULT_CTA_USE_PLATFORM_COLORS.youtube = true;
export const DEFAULT_CTA_USE_PLATFORM_ICON_COLORS = createDefaultRecord(Object.keys(DEFAULT_CTA_LABELS), false as boolean);

export const PLATFORM_DEFAULT_LAYOUTS: Record<string, "classic" | "modern"> = {
  reddit: "classic",
  x: "classic",
  bluesky: "classic",
  mastodon: "classic",
  threads: "classic",
  truthSocial: "classic",
  linkedin: "classic",
  bilibili: "modern",
  instagram: "classic",
  tiktok: "modern",
  facebook: "classic",
  youtube: "modern",
  rumble: "modern",
  dailymotion: "modern",
  odysee: "classic",
  archive: "modern",
  kick: "modern",
  twitch: "modern",
  tumblr: "classic",
  pinterest: "classic",
  spotify: "classic",
  appleMusic: "classic",
  deezer: "classic",
  tidal: "classic",
  soundcloud: "classic",
  applePodcasts: "classic",
  telegram: "classic"
};

Object.entries(PLATFORM_DEFAULT_LAYOUTS).forEach(([platform, layout]) => {
  if (layout === "modern") {
    DEFAULT_CTA_USE_PLATFORM_COLORS[platform] = true;
  }
});

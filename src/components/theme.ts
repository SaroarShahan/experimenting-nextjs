import { createTheme } from "@mui/material/styles";
import type { CSSProperties } from "react";

type CssRule = Record<string, string | number | undefined>;
type GlobalStyleRules = Record<string, CssRule>;

type UtilityStyle = {
  className: string;
  base: CssRule;
  dark?: CssRule;
};

const colors = {
  primary: {
    100: "#fff1e6",
    500: "#ff7000",
  },
  dark: {
    100: "#000000",
    200: "#0f1117",
    300: "#151821",
    400: "#212734",
    500: "#101012",
  },
  light: {
    400: "#858ead",
    500: "#7b8ec8",
    700: "#dce3f1",
    800: "#f4f6f8",
    850: "#fdfdfd",
    900: "#ffffff",
  },
  link: {
    100: "#1da1f2",
  },
} as const;

const radii = {
  1.5: 6,
  2: 8,
  sm: 4,
  md: 6,
  lg: 8,
} as const;

const appShadows = {
  light100:
    "0px 12px 20px 0px rgba(184, 184, 184, 0.03), 0px 6px 12px 0px rgba(184, 184, 184, 0.02), 0px 2px 4px 0px rgba(184, 184, 184, 0.03)",
  light200: "10px 10px 20px 0px rgba(218, 213, 213, 0.1)",
  light300: "-10px 10px 20px 0px rgba(218, 213, 213, 0.1)",
  dark100: "0px 2px 10px 0px rgba(46, 52, 56, 0.1)",
  dark200: "2px 0px 20px 0px rgba(39, 36, 36, 0.04)",
} as const;

const gradients = {
  primary: "linear-gradient(129deg, #ff7000 0%, #e2995f 100%)",
  dark:
    "linear-gradient(232deg, rgba(23, 28, 35, 0.41) 0%, rgba(19, 22, 28, 0.7) 100%)",
  light:
    "linear-gradient(132deg, rgba(247, 249, 255, 0.5) 0%, rgba(229, 237, 255, 0.25) 100%)",
} as const;

const images = {
  authDark: 'url("/images/auth-dark.png")',
  authLight: 'url("/images/auth-light.png")',
} as const;

const fonts = {
  inter: "var(--font-inter)",
  spaceGrotesk: "var(--font-space-grotesk)",
} as const;

const appBreakpoints = {
  values: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
} as const;

const textStyles = {
  h1Bold: {
    fontSize: 30,
    fontWeight: 700,
    lineHeight: "42px",
    letterSpacing: 0,
  },
  h2Bold: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: "31.2px",
  },
  h2Semibold: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: "31.2px",
  },
  h3Bold: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: "26px",
  },
  h3Semibold: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: "24.8px",
  },
  baseMedium: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: "25.2px",
  },
  baseSemibold: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: "25.2px",
  },
  baseBold: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.4,
  },
  paragraphRegular: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "22.4px",
  },
  paragraphMedium: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "22.4px",
  },
  paragraphSemibold: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: "20.8px",
  },
  bodyRegular: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "19.6px",
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18.2px",
  },
  bodySemibold: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: "18.2px",
  },
  bodyBold: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: "18.2px",
  },
  smallRegular: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "15.6px",
  },
  smallMedium: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "15.6px",
  },
  smallSemibold: {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: "15.6px",
  },
  subtleRegular: {
    fontSize: 10,
    fontWeight: 400,
    lineHeight: "13px",
  },
  subtleMedium: {
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "13px",
  },
} satisfies Record<string, CSSProperties>;

export const tokens = {
  colors,
  radii,
  shadows: appShadows,
  gradients,
  images,
  breakpoints: {
    xs: 420,
  },
  fonts,
  textStyles,
} as const;

type AppTokens = typeof tokens;

declare module "@mui/material/styles" {
  interface Theme {
    tokens: AppTokens;
  }

  interface ThemeOptions {
    tokens?: AppTokens;
  }
}

const toKebabCase = (value: string) =>
  value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

const createUtilityStyles = (utilities: readonly UtilityStyle[]) =>
  utilities.reduce<GlobalStyleRules>((styles, { className, base, dark }) => {
    styles[`.${className}`] = base;

    if (dark) {
      styles[`.dark .${className}`] = dark;
    }

    return styles;
  }, {});

const createTextStyleClasses = () =>
  Object.fromEntries(
    Object.entries(textStyles).map(([name, style]) => [
      `.${toKebabCase(name)}`,
      style,
    ]),
  ) as GlobalStyleRules;

const createRootVariables = (): CssRule => ({
  "--radius": "0.5rem",
  "--color-primary-100": colors.primary[100],
  "--color-primary-500": colors.primary[500],
  "--color-dark-100": colors.dark[100],
  "--color-dark-200": colors.dark[200],
  "--color-dark-300": colors.dark[300],
  "--color-dark-400": colors.dark[400],
  "--color-dark-500": colors.dark[500],
  "--color-light-400": colors.light[400],
  "--color-light-500": colors.light[500],
  "--color-light-700": colors.light[700],
  "--color-light-800": colors.light[800],
  "--color-light-850": colors.light[850],
  "--color-light-900": colors.light[900],
  "--color-link-100": colors.link[100],
  "--font-inter": fonts.inter,
  "--font-space-grotesk": fonts.spaceGrotesk,
});

const backgroundUtilities = createUtilityStyles([
  {
    className: "background-light850_dark100",
    base: { backgroundColor: colors.light[850] },
    dark: { backgroundColor: colors.dark[100] },
  },
  {
    className: "background-light900_dark200",
    base: { backgroundColor: colors.light[900] },
    dark: { backgroundColor: colors.dark[200] },
  },
  {
    className: "background-light900_dark300",
    base: { backgroundColor: colors.light[900] },
    dark: { backgroundColor: colors.dark[300] },
  },
  {
    className: "background-light800_darkgradient",
    base: { backgroundColor: colors.light[800] },
    dark: { background: gradients.dark },
  },
  {
    className: "background-light800_dark400",
    base: { backgroundColor: colors.light[800] },
    dark: { backgroundColor: colors.dark[400] },
  },
  {
    className: "background-light700_dark400",
    base: { backgroundColor: colors.light[700] },
    dark: { backgroundColor: colors.dark[400] },
  },
  {
    className: "background-light700_dark300",
    base: { backgroundColor: colors.light[700] },
    dark: { backgroundColor: colors.dark[300] },
  },
  {
    className: "background-light800_dark300",
    base: { backgroundColor: colors.light[800] },
    dark: { backgroundColor: colors.dark[300] },
  },
  {
    className: "background-light800_dark200",
    base: { backgroundColor: colors.light[800] },
    dark: { backgroundColor: colors.dark[200] },
  },
  {
    className: "background-dark400_light900",
    base: { backgroundColor: colors.light[900] },
    dark: { backgroundColor: colors.dark[400] },
  },
] as const);

const textColorUtilities = createUtilityStyles([
  {
    className: "text-dark100_light900",
    base: { color: colors.dark[100] },
    dark: { color: colors.light[900] },
  },
  {
    className: "text-dark200_light900",
    base: { color: colors.dark[200] },
    dark: { color: colors.light[900] },
  },
  {
    className: "text-dark200_light800",
    base: { color: colors.dark[200] },
    dark: { color: colors.light[800] },
  },
  {
    className: "text-dark300_light700",
    base: { color: colors.dark[300] },
    dark: { color: colors.light[700] },
  },
  {
    className: "text-dark400_light700",
    base: { color: colors.dark[400] },
    dark: { color: colors.light[700] },
  },
  {
    className: "text-dark500_light700",
    base: { color: colors.dark[500] },
    dark: { color: colors.light[700] },
  },
  {
    className: "text-dark500_light500",
    base: { color: colors.dark[500] },
    dark: { color: colors.light[500] },
  },
  {
    className: "text-dark500_light400",
    base: { color: colors.dark[500] },
    dark: { color: colors.light[400] },
  },
  {
    className: "text-dark300_light900",
    base: { color: colors.dark[300] },
    dark: { color: colors.light[900] },
  },
  {
    className: "text-dark400_light800",
    base: { color: colors.dark[400] },
    dark: { color: colors.light[800] },
  },
  {
    className: "text-light400_light500",
    base: { color: colors.light[400] },
    dark: { color: colors.light[500] },
  },
  {
    className: "text-dark400_light500",
    base: { color: colors.dark[400] },
    dark: { color: colors.light[500] },
  },
  {
    className: "text-dark400_light900",
    base: { color: colors.dark[400] },
    dark: { color: colors.light[900] },
  },
] as const);

const statefulUtilities = createUtilityStyles([
  {
    className: "light-border",
    base: { borderColor: colors.light[800] },
    dark: { borderColor: colors.dark[300] },
  },
  {
    className: "light-border-2",
    base: { borderColor: colors.light[700] },
    dark: { borderColor: colors.dark[400] },
  },
  {
    className: "invert-colors",
    base: { filter: "invert(1)" },
    dark: { filter: "invert(0)" },
  },
  {
    className: "shadow-light100_dark100",
    base: { boxShadow: appShadows.light100 },
    dark: { boxShadow: appShadows.dark100 },
  },
  {
    className: "shadow-light100_darknone",
    base: { boxShadow: appShadows.light100 },
    dark: { boxShadow: "none" },
  },
  {
    className: "card-wrapper",
    base: {
      backgroundColor: colors.light[900],
      boxShadow: appShadows.light100,
    },
    dark: {
      background: gradients.dark,
      boxShadow: appShadows.dark100,
    },
  },
  {
    className: "btn",
    base: { backgroundColor: colors.light[800] },
    dark: { backgroundColor: colors.dark[300] },
  },
  {
    className: "btn-secondary",
    base: { backgroundColor: colors.light[800] },
    dark: { backgroundColor: colors.dark[400] },
  },
  {
    className: "btn-tertiary",
    base: { backgroundColor: colors.light[700] },
    dark: { backgroundColor: colors.dark[300] },
  },
] as const);

const staticUtilities: GlobalStyleRules = {
  ".placeholder::placeholder": {
    color: colors.light[400],
  },
  ".dark .placeholder::placeholder": {
    color: colors.light[500],
  },
  ".primary-gradient": {
    background: gradients.primary,
  },
  ".dark-gradient": {
    background: gradients.dark,
  },
  ".light-gradient": {
    background: gradients.light,
  },
  ".primary-text-gradient": {
    background: gradients.primary,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  ".flex-center": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ".flex-between": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ".flex-start": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  ".no-focus:focus-visible": {
    outline: "none",
    boxShadow: "none",
  },
  ".tab": {
    minHeight: "100%",
    backgroundColor: colors.light[800],
    color: colors.light[500],
  },
  ".tab[data-state='active']": {
    backgroundColor: colors.primary[100],
    color: colors.primary[500],
  },
  ".dark .tab": {
    backgroundColor: colors.dark[400],
  },
  ".dark .tab[data-state='active']": {
    backgroundColor: colors.dark[300],
  },
};

const editorStyles: GlobalStyleRules = {
  ".custom-scrollbar::-webkit-scrollbar": {
    width: 3,
    height: 3,
    borderRadius: 2,
  },
  ".custom-scrollbar::-webkit-scrollbar-track": {
    background: colors.light[900],
  },
  ".custom-scrollbar::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: 50,
  },
  ".custom-scrollbar::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
  ".no-scrollbar::-webkit-scrollbar": {
    display: "none",
  },
  ".no-scrollbar": {
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  },
  ".active-theme": {
    filter:
      "invert(53%) sepia(98%) saturate(3332%) hue-rotate(0deg) brightness(104%) contrast(106%) !important",
  },
  ".hash-span": {
    marginTop: -140,
    paddingBottom: 140,
    display: "block",
  },
  ".mdxeditor-toolbar": {
    background: `${colors.light[900]} !important`,
  },
  ".dark .mdxeditor-toolbar": {
    background: `${colors.dark[300]} !important`,
  },
  ".dark .mdxeditor-toolbar button svg": {
    color: `${colors.light[400]} !important`,
  },
  ".dark .mdxeditor-toolbar button:hover svg": {
    color: `${colors.dark[100]} !important`,
  },
  ".dark .mdxeditor-toolbar [role='separator']": {
    borderColor: "#555 !important",
  },
  ".markdown": {
    maxWidth: "100%",
  },
  ".markdown a": {
    color: colors.link[100],
  },
  ".markdown a, code": {
    overflowWrap: "break-word",
    wordWrap: "break-word",
    msWordBreak: "break-all",
    wordBreak: "break-word",
    msHyphens: "auto",
    MozHyphens: "auto",
    WebkitHyphens: "auto",
    hyphens: "auto",
    padding: 2,
    color: `${colors.primary[500]} !important`,
  },
  ".markdown pre": {
    display: "grid",
    width: "100%",
  },
  ".markdown pre code": {
    width: "100%",
    display: "block",
    overflowX: "auto",
    color: "inherit !important",
  },
  '[data-lexical-editor="true"]': {
    height: "350px !important",
    overflowY: "auto !important",
  },
  '[data-bright-mode="dark"]:not(html.light [data-bright-mode="dark"]), [data-bright-mode="light"]:not(:not(html.light [data-bright-mode="light"]))':
    {
      display: "grid !important",
      width: "100% !important",
    },
};

const globalStyles: GlobalStyleRules = {
  "*, ::after, ::before, ::backdrop, ::file-selector-button": {
    borderColor: "var(--color-gray-200, currentcolor)",
  },
  ":root": createRootVariables(),
  html: {
    minHeight: "100%",
  },
  body: {
    minHeight: "100%",
    margin: 0,
  },
  a: {
    color: "inherit",
    textDecoration: "none",
  },
  ...createTextStyleClasses(),
  ...backgroundUtilities,
  ...textColorUtilities,
  ...statefulUtilities,
  ...staticUtilities,
  ...editorStyles,
};

export const theme = createTheme({
  cssVariables: true,
  tokens,
  breakpoints: appBreakpoints,
  palette: {
    mode: "light",
    primary: {
      light: colors.primary[100],
      main: colors.primary[500],
      contrastText: colors.light[900],
    },
    secondary: {
      main: colors.link[100],
    },
    background: {
      default: colors.light[800],
      paper: colors.light[900],
    },
    text: {
      primary: colors.dark[100],
      secondary: colors.dark[400],
    },
    divider: colors.light[800],
  },
  shape: {
    borderRadius: radii[2],
  },
  typography: {
    fontFamily: `${fonts.inter}, Arial, sans-serif`,
    h1: textStyles.h1Bold,
    h2: textStyles.h2Bold,
    h3: textStyles.h3Bold,
    body1: textStyles.paragraphRegular,
    body2: textStyles.bodyRegular,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: globalStyles,
    },
  },
});

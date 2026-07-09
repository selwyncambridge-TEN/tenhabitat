export const routes = [
  { href: "/home", label: "Venture Habitat", key: "home" },
  { href: "/builders", label: "Builders", key: "builders" },
  { href: "/backers", label: "Backers", key: "backers" },
  { href: "/investors", label: "Investors", key: "investors" },
] as const;

export const roleLabels = {
  builder: "Builder",
  backer: "Backer",
  investor: "Investor",
} as const;

export const siteAssets = {
  backerCollab: "/images/backer-collab.png",
  builderOne: "/images/builder-1.jpg",
  builderTwo: "/images/builder-2.jpg",
  builderThree: "/images/builder-3.jpg",
  builderCtaBg: "/images/builder-cta-bg.jpg",
  builderValue: "/images/builder-value-hd.jpg",
  collageWarmBg: "/images/collage-warm-bg.png",
  handsRaised: "/images/hands-raised.png",
  heroSeedling: "/images/hero-seedling-hd.jpg",
  investorCta: "/images/investor-cta.png",
  investorKitchen: "/images/investor-kitchen-couple.jpg",
  networkNavyBg: "/images/network-navy-bg.jpg",
  pathBacking: "/images/path-backing.jpg",
  pathBuilding: "/images/path-building.jpg",
  pathInvesting: "/images/path-investing.jpg",
  logo: "/images/ten-habitat-logo.png",
  launchCollage: "/images/vh-collage-launch.jpg",
  communityGroup: "/images/vh-community-group.jpg",
  ventureFeature: "/images/vh-feature.png",
  visionSky: "/images/vision-sky-bg.jpg",
} as const;

export const homeStats = [
  { value: "500+", label: "founders supported" },
  { value: "US$6M+", label: "raised for ventures" },
  { value: "1,000+", label: "jobs created" },
] as const;

export const pathCards = [
  {
    title: "I’m Building",
    body: "Founders, Entrepreneurs and Ecosystem Builders growing businesses that matter.",
    href: "/builders",
    cta: "Explore Builders →",
    image: siteAssets.pathBuilding,
    alt: "Founders working through ideas together at a chalkboard",
  },
  {
    title: "I’m Backing",
    body: "Governments, Development Institutions, Credit Unions and Corporates shaping the future of enterprise.",
    href: "/backers",
    cta: "Explore Backers →",
    image: siteAssets.pathBacking,
    alt: "Institutional partners meeting around a table",
  },
  {
    title: "I’m Investing",
    body: "Diaspora, Investors and Capital Partners building stronger entrepreneurial economies.",
    href: "/investors",
    cta: "Explore Investors →",
    image: siteAssets.pathInvesting,
    alt: "Investors and diaspora partners collaborating",
  },
] as const;

export const backerPoints = [
  {
    num: "01",
    text: "Turns undercapitalised, thin-file MSMEs into diagnosed, structured, lendable borrowers.",
  },
  {
    num: "02",
    text: "Gives lenders the underwriting signal and ongoing oversight that reduce risk on both sides of the loan.",
  },
  {
    num: "03",
    text: "Helps structure Micro, Small and Medium businesses so they can attract the patient capital to confidently scale.",
  },
] as const;

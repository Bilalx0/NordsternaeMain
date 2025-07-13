import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
      heading: "'Roboto Flex Variable', sans-serif",
      body: "Lato, sans-serif",
    },
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ['48px', '72px'],
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h2: {
      fontSize: ['36px', '48px', '60px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
    semibold: {
      fontSize: '22px',
      fontWeight: 'semibold',
    },
  },
  components: {
    Text: {
      // 1. We can update the base styles
      baseStyle: {
        fontWeight: 'normal',
        lineHeight: 'normal',
        fontSize: '16px',
        fontFamily: 'var(--chakra-fonts-body)',
      },
      variants: {
        'featuredItemsHeader': {
          color: '#202020',
          fontFamily: 'var(--chakra-fonts-heading)',
          fontSize: '16px',
          fontWeight: '700',
          lineHeight: 'normal',
          textTransform: 'capitalize',
        },
        'tileItemTitle': {
          color: '#202020',
          fontFamily: 'var(--chakra-fonts-heading)',
          fontSize: '16px',
          fontWeight: '500',
          lineHeight: 'normal',
          textTransform: 'capitalize',
        },
        'tileItemText': {
          color: '#202020',
          fontFamily: 'var(--chakra-fonts-body)',
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: 'normal',
          textTransform: 'capitalize',
        },
        'agentInfo': {
          fontFamily: 'var(--chakra-fonts-body)',
          fontSize: '15px',
          fontWeight: '500',
          lineHeight: 'normal',
        },
        'featuredTag': {
          color: '#FFFFFF',
          backgroundColor: '#312A8F',
          textAlign: 'center',
          fontFamily: 'var(--chakra-fonts-body)',
          fontSize: '10px',
          fontWeight: '700',
          lineHeight: 'normal',
          letterSpacing: '0.03125rem',
          textTransform: 'uppercase',
        },
        'listYourPropBody': {
          color: '#FFFFFF',
          fontFamily: 'var(--chakra-fonts-body)',
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: 'normal',
        },
        'listYourPropBodyBold': {
          color: '#FFFFFF',
          fontFamily: 'var(--chakra-fonts-body)',
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: 'normal',
          textTransform: 'capitalize',
        },
        'searchFiltersHeader': {
          fontFamily: 'var(--chakra-fonts-body)',
          color: '#202020',
          textTransform: 'uppercase',
          fontSize: '10px',
        },
        'clearFiltersButtonUnderlined': {
          color: '#202020',
          fontFamily: 'var(--chakra-fonts-heading)',
          fontSize: '14px',
          letterSpacing: '0rem',
          padding: '0px',
          textDecoration: 'underline',
          textTransform: 'capitalize',
        },
        'footerLinkItemHeader': {
          fontSize: '12px',
          fontWeight: '700',
        },
        'footerLinkItem': {
          fontSize: ['10px', '12px'],
          fontWeight: 'normal',
        },
        'headerMenuItem': {
          fontSize: ['10px', '12px'],
          color: '#312A8F',
          fontWeight: 'normal',
        },
        'sidebarMenuItem': {
          fontSize: '30px',
          fontWeight: 'normal',
        },
        'propertyCTAText': {
          fontSize: '12px',
          fontWeight: '700',
          letterSpacing: '0.1rem',
        },
        'blackSubtitle': {
          color: '#202020',
          textTransform: 'uppercase',
          fontSize: '12px',
        },
        'mobileMenuItem': {
          fontSize: '8px',
          fontWeight: '700',
          letterSpacing: '0rem',
        },
        'articleTitle': {
          fontFamily: 'var(--chakra-fonts-heading)',
          fontSize: '30px',
          color: '#312A8F',
          fontWeight: '500',
        },
        'smallPrintRoboto': {
          fontFamily: 'var(--chakra-fonts-heading)',
          fontSize: '10px',
          fontWeight: 'normal',
        },
        'finePrint': {
          fontSize: '10px',
          color: '#B1B1B1',
          fontWeight: 'normal',
          letterSpacing: '0rem',
        },
        'largetext': {
          fontFamily: 'var(--chakra-fonts-body)',
          fontSize: '16px',
          fontWeight: 'normal',
          letterSpacing: '0rem',
          lineHeight: '1.5rem',
        },
        'robotoExpertBannerTitles': {
          color: '#202020',
          fontSize: '30px',
          fontWeight: '400',
          fontFamily: 'var(--chakra-fonts-heading)',
          letterSpacing: '0.125rem',
        },
        'robotoExpertBannerTitlesWhite': {
          color: '#FFFFFF',
          fontSize: '30px',
          fontWeight: '400',
          fontFamily: 'var(--chakra-fonts-heading)',
          letterSpacing: '0.125rem',
        },
        'robotoCareersHighlightBlue': {
          color: '#312A8F',
          fontSize: '40px',
          fontWeight: '500',
          fontFamily: 'var(--chakra-fonts-heading)',
          letterSpacing: '0.125rem',
        },
        'latoCareersHighlightSubtextGray': {
          color: '#7D7D7D',
          fontSize: '16px',
          fontFamily: 'var(--chakra-fonts-body)',
          textTransform: 'uppercase',
          letterSpacing: '0rem',
          textAlign: 'center',
        },
        'robotoSellWithNordBlue': {
          color: '#312A8F',
          fontSize: '40px',
          fontWeight: '600',
          fontFamily: 'var(--chakra-fonts-heading)',
          letterSpacing: '-0.1rem',
          textAlign: 'center',
        },
        'latoSellWithNordSubtext': {
          color: '#7D7D7D',
          fontSize: '16px',
          fontFamily: 'var(--chakra-fonts-body)',
          textTransform: 'uppercase',
          letterSpacing: '0rem',
          textAlign: 'center',
        },
        'robotoCarouselTitle': {
          fontSize: ['40px', '60px', '92px'],
          fontWeight: '200',
          fontFamily: 'var(--chakra-fonts-heading)',
          letterSpacing: '0.1rem',
        },
        'latoNormalTitle': {
          fontSize: '18px',
          fontWeight: '700',
          fontFamily: 'var(--chakra-fonts-body)',
          letterSpacing: '0.1rem',
        },
        'robotoSearchBigTitle': {
          fontSize: '26px',
          fontWeight: '500',
          fontFamily: 'var(--chakra-fonts-heading)',
          letterSpacing: '0.0375rem',
        },
        'robotoNormalTitle': {
          fontSize: ['22px', '26px', '30px'],
          fontWeight: '400',
          fontFamily: 'var(--chakra-fonts-heading)',
          letterSpacing: '0.1rem',
        },
        'robotoPropTileTitle': {
          fontSize: '18px',
          fontWeight: '600',
          fontFamily: 'var(--chakra-fonts-heading)',
          letterSpacing: '0.07rem',
        },
        'searchFilterTitles': {
          fontSize: '16px',
          fontFamily: 'var(--chakra-fonts-heading)',
          fontWeight: '600',
        },
        'latoBoldText': {
          fontSize: ['16px', '20px'],
          fontWeight: '600',
          fontFamily: 'var(--chakra-fonts-body)',
          letterSpacing: '0.1rem',
        },
        'robotoDevTileTitle': {
          fontSize: ['16px', '20px'],
          fontWeight: '600',
          fontFamily: 'var(--chakra-fonts-heading)',
          letterSpacing: '0.06rem',
        },
        'robotoNewsletter': {
          color: '#383838',
          fontSize: '16px',
          fontWeight: '500',
          fontFamily: 'var(--chakra-fonts-heading)',
          letterSpacing: '0.06rem',
        },
        'description': {
          fontSize: '24px',
          fontWeight: 'normal',
          fontFamily: 'var(--chakra-fonts-body)',
          letterSpacing: '0rem',
        },
        'ctaBoxTitle': {
          fontSize: "30px",
          fontFamily: 'var(--chakra-fonts-heading)',
          fontWeight: '500',
        },
        'justRoboto': {
          fontFamily: 'var(--chakra-fonts-heading)',
        },
        'selected': {
          fontWeight: '700',
          fontFamily: 'var(--chakra-fonts-heading)',
          borderBottom: '2px solid black',
        },
        'buttonText': {
          fontFamily: 'var(--chakra-fonts-body)',
          fontSize: '10px',
          fontWeight: '700',
        },
        'bigSearchMiniButtonText': {
          color: '#F2F2F2',
          fontFamily: 'var(--chakra-fonts-body)',
          fontSize: '14px',
          fontWeight: 'normal',
          letterSpacing: '0rem',
          padding: '0px',
          border: 'none',
          textTransform: 'capitalize',
        },
        'bigSearchMiniButtonTextUnderlined': {
          color: '#F2F2F2',
          fontFamily: 'var(--chakra-fonts-body)',
          fontSize: '14px',
          fontWeight: 'semibold',
          letterSpacing: '0rem',
          padding: '0px',
          border: 'none',
          textTransform: 'capitalize',
          borderBottom: '2px solid',
        },
      },
    },
    Input: {
      // 1. We can update the base styles
      baseStyle: {
        //fontWeight: 'semibold', // Normally, it is "semibold"
        fontSize: '10px',
        letterSpacing: '0.063rem',
        borderRadius: '8px',
        border: '1px solid',
        fontFamily: 'var(--chakra-fonts-body)',
        outline: 'none',
        transition: 'all',
        isolation: "auto !important",
        _focus: {
          outline: 'none',
        },
        _hover: {
          transform: "scale(1.01, 1.01)",
        },
      },
    },
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        //fontWeight: 'semibold', // Normally, it is "semibold"
        fontSize: '10px',
        letterSpacing: '0.063rem',
        borderRadius: '5px',
        border: '1px solid',
        fontFamily: 'var(--chakra-fonts-body)',
        outline: 'none',
        transition: 'all',
        _focus: {
          outline: 'none',
        },
        _hover: {
          transform: "scale(1.01, 1.01)",
        },
      },
      // 2. We can add a new button size or extend existing
      sizes: {
        s: {
          w: '100px',
          h: '40px',
          fontWeight: '600',
          textTransform: 'uppercase',
          fontSize: "10px",
        },
        m: {
          w: '210px',
          h: '40px',
          fontWeight: '700',
          textTransform: 'uppercase',
        },
        l: {
          w: '320px',
          h: '50px',
          fontSize: '16px',
          fontWeight: 'normal',
        },
      },
      // 3. We can add a new visual variant
      variants: {
        'bigCTA': {
          bg: '#312A8F',
          color: '#FDF9F3',
          borderColor: '#312A8F',
          fontFamily: 'var(--chakra-fonts-body)',
          fontSize: '10px',
          fontWeight: '700',
        },
        'whiteBigCTA': {
          bg: '#FDF9F3',
          color: '#312A8F',
          borderColor: '#312A8F',
          fontFamily: 'var(--chakra-fonts-body)',
          fontSize: '10px',
          fontWeight: '700',
        },
        'bigCTANoBG': {
          color: '#FDF9F3',
          borderColor: '#FDF9F3',
          fontFamily: 'var(--chakra-fonts-body)',
          fontSize: '10px',
          fontWeight: '700',
        },
        'bright': {
          bg: '#FDF9F3',
          color: '#312A8F',
          borderColor: '#FDF9F3',
        },
        'dark': {
          bg: '#222222',
          color: '#F2F2F2',
        },
        'darkNoBackground': {
          color: '#F2F2F2',
          borderColor: '#F2F2F2',
        },
        'light': {
          color: '#383838',
          borderColor: '#383838',
        },
        'arrow': {
          border: '1px solid #DDDDDD',
          borderRadius: '50px',
          width: '48px',
        },
        'carousel': {
          borderColor: 'transparent',
          borderRadius: '50%',
          border: 'none',
          width: '12px',
          height: '12px',
          bg: '#6A6A6A',
        },
        'linkButton': {
          fontFamily: 'var(--chakra-fonts-heading)',
          color: '#202020',
          fontWeight: '400',
          fontSize: '16px',
          padding: '0px',
          border: 'none',
          textTransform: 'capitalize',
          _hover: {
            fontWeight: 'bold',
          },
        },
        'closeButton': {
          width: '20px',
          height: '20px',
          color: '#202020',
          fontWeight: '400',
          fontSize: '10px',
          padding: '0px',
          border: 'none',
          borderRadius: '10px',
        },
      },
      // 6. We can overwrite defaultProps
      defaultProps: {
        size: 'm', // default is md
        variant: 'bright', // default is solid
        colorScheme: 'gray', // default is gray
      },
    },
  },
})

export default theme
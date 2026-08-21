import React from 'react';

export const sections = [
    {
        title: 'FOUNDATIONS',
        epithet: 'the architecture of self',
        num: '01',
        id: 'foundations',
        image: '/foundations.svg',
        body: 'FOUNDATIONS SERVES AS THE BASE LAYER OF REFINEMENT; THE STEPPING STONES OF YOUR WARDROBE DESIGNED FOR STRUCTURE, COMFORT AND EVERYDAY UNIFORMITY. THROUGH SIMPLICITY AND PRECISION, FOUNDATIONS DEFINES THE ESSENTIALS. WHERE FORM TAKES SHAPE AND SOPHISTICATION BEGINS.',
        products: [
            {
                id: 'the-veil',
                name: 'The Veil',
                epithet: 'Protection through perception.',
                price: '30',
                colors: ['Black', 'Camo'].sort(),
                images: [
                    '/Ghost Mannequins/Foundations/The Veil/Black/Black Veil Side.png',
                    '/Ghost Mannequins/Foundations/The Veil/Black/Black Veil Front.png',
                    '/Ghost Mannequins/Foundations/The Veil/Black/Black Veil Black.png',
                    '/Ghost Mannequins/Foundations/The Veil/Camo/Camo Veil Side.png',
                    '/Ghost Mannequins/Foundations/The Veil/Camo/Camo Veil Front.png',
                    '/Ghost Mannequins/Foundations/The Veil/Camo/Camo Veil Back.png'
                ],
                sizes: [{ size: 'ONE SIZE', soldOut: false }],
                specs: [
                    'Polyester / Spandex blend',
                    'Machine wash cold, line dry',
                    'Converts between balaclava, neck gaiter, and skull cap',
                    'Reflective Foundations insignia at side',
                    'Reflective Inferno logo at rear',
                    'Imported'
                ]
            },
            {
                id: 'the-cornerstone',
                name: 'The Cornerstone',
                epithet: 'Simplicity as sophistication.',
                price: '35',
                images: [
                    '/Ghost Mannequins/Foundations/Cornerstone/Cornerstone Black.png?v=2',
                    '/Ghost Mannequins/Foundations/Cornerstone/Cornerstone Black Closeup.png?v=2',
                    '/Ghost Mannequins/Foundations/Cornerstone/Cornerstone White.png',
                    '/Ghost Mannequins/Foundations/Cornerstone/Cornerstone White Closeup.png'
                ],
                sizes: [
                    { size: 'S', soldOut: true },
                    { size: 'M', soldOut: false },
                    { size: 'L', soldOut: false },
                    { size: 'XL', soldOut: false },
                    { size: 'XXL', soldOut: true }
                ],
                specs: [
                    '100% Cotton, Slim Fit',
                    'Ribbed crewneck collar',
                    '180 GSM medium-weight fabric',
                    'Metallic foil Foundations insignia at front left hem',
                    'Imported'
                ]
            },
            {
                id: 'the-breakaway',
                name: 'The Breakaway',
                epithet: 'Transformation in motion.',
                price: '150',
                images: [
                    '/Ghost Mannequins/Foundations/The Breakaway/Amethyst/Breakaway Amethyst Hoodie Front.png',
                    '/Ghost Mannequins/Foundations/The Breakaway/Amethyst/Breakaway Amethyst Hoodie Front Zoomed.png',
                    '/Ghost Mannequins/Foundations/The Breakaway/Amethyst/Breakaway Amethyst Hoodie Back.png',
                    '/Ghost Mannequins/Foundations/The Breakaway/Amethyst/Breakaway Amethyst Pants Front.png',
                    '/Ghost Mannequins/Foundations/The Breakaway/Amethyst/Breakaway Amethyst Pants Side.png',
                    '/Ghost Mannequins/Foundations/The Breakaway/Amethyst/Breakaway Amethyst Pants Back.png',
                    '/Ghost Mannequins/Foundations/The Breakaway/Grapefruit/Breakaway Grapefruit Hoodie Front.png',
                    '/Ghost Mannequins/Foundations/The Breakaway/Grapefruit/Breakaway Grapefruit Hoodie Front Zoomed.png',
                    '/Ghost Mannequins/Foundations/The Breakaway/Grapefruit/Breakaway Grapefruit Hoodie Back.png',
                    '/Ghost Mannequins/Foundations/The Breakaway/Grapefruit/Breakaway Grapefruit Pants Front.png',
                    '/Ghost Mannequins/Foundations/The Breakaway/Grapefruit/Breakaway Grapefruit Pants Side.png',
                    '/Ghost Mannequins/Foundations/The Breakaway/Grapefruit/Breakaway Grapefruit Pants Back.png',
                    '/Ghost Mannequins/Foundations/The Breakaway/Graphite/Breakaway Graphite Hoodie Front.png',
                    '/Ghost Mannequins/Foundations/The Breakaway/Graphite/Breakaway Graphite Hoodie Front Zoomed.png',
                    '/Ghost Mannequins/Foundations/The Breakaway/Graphite/Breakaway Graphite Hoodie Back.png',
                    '/Ghost Mannequins/Foundations/The Breakaway/Graphite/Breakaway Graphite Pants Front.png',
                    '/Ghost Mannequins/Foundations/The Breakaway/Graphite/Breakaway Graphite Pants Side.png',
                    '/Ghost Mannequins/Foundations/The Breakaway/Graphite/Breakaway Graphite Pants Back.png'
                ],
                colors: ['Amethyst', 'Grapefruit', 'Graphite'].sort(),
                breakawaySizing: {
                    hoodieSizes: [
                        { size: 'S', soldOut: false },
                        { size: 'M', soldOut: false },
                        { size: 'L', soldOut: false },
                        { size: 'XL', soldOut: false },
                        { size: 'XXL', soldOut: false }
                    ],
                    pantsSizes: [
                        { size: 'S', soldOut: false },
                        { size: 'M', soldOut: false },
                        { size: 'L', soldOut: false },
                        { size: 'XL', soldOut: false },
                        { size: 'XXL', soldOut: false }
                    ]
                },
                specsColumns: [
                    {
                        header: 'Hoodie',
                        items: [
                            '100% Polyester, double-knit construction',
                            'Sublimated gradient design featuring the New York City skyline',
                            'Contoured hood for comfort and profile',
                            'Drop-tail hem and zippered side pockets',
                            'Embroidered Foundations insignia on left arm',
                            '260 GSM midweight fabric for structured flexibility',
                            'Machine wash cold, line dry'
                        ]
                    },
                    {
                        header: 'Trackpant',
                        items: [
                            '100% Polyester, double-knit construction',
                            'Coordinated gradient detailing along side seam',
                            'Tearaway snaps along side seam for adjustable styling',
                            'Embroidered Foundations insignia at left pocket',
                            'Elastic waistband with drawstring',
                            'Durable and breathable interior mesh lining',
                            'Machine wash cold, line dry'
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: 'FORTIFICATIONS',
        epithet: 'the shield of style',
        num: '02',
        id: 'fortifications',
        image: '/fortifications.svg',
        body: 'FORTIFICATIONS REPRESENTS DEFENSE THROUGH DESIGN; LUXURIOUS GARMENTS BUILT AS ARMOR. EACH PIECE IN THIS TIER ACTS AS BOTH PROTECTION AND PROCLAMATION. CONSTRUCTED TO ENDURE, ENGINEERED TO IMPRESS.',
        products: [
            {
                id: 'the-contradiction',
                name: 'The Contradiction',
                epithet: 'Elegance built on chaos.',
                price: '420',
                images: [
                    {
                        is360: true,
                        frames: [
                            '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Exterior/Contradiction Ext. 1.png',
                            '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Exterior/Contradiction Ext. 2.png',
                            '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Exterior/Contradiction Ext. 3.png',
                            '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Exterior/Contradiction Ext. 4.png',
                            '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Exterior/Contradiction Ext. 5.png',
                            '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Exterior/Contradiction Ext. 6.png'
                        ]
                    },
                    {
                        is360: true,
                        frames: [
                            '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Reverse/Contradiction Rev. 1.png',
                            '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Reverse/Contradiction Rev. 2.png',
                            '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Reverse/Contradiction Rev. 3.png',
                            '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Reverse/Contradiction Rev. 4.png',
                            '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Reverse/Contradiction Rev. 5.png',
                            '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Reverse/Contradiction Rev. 6.png'
                        ]
                    },
                    '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Exterior/Contradiction Ext. 1.png',
                    '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Exterior/Contradiction Ext. 2.png',
                    '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Exterior/Contradiction Ext. 3.png',
                    '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Exterior/Contradiction Ext. 4.png',
                    '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Exterior/Contradiction Ext. 5.png',
                    '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Exterior/Contradiction Ext. 6.png',
                    '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Reverse/Contradiction Rev. 1.png',
                    '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Reverse/Contradiction Rev. 2.png',
                    '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Reverse/Contradiction Rev. 3.png',
                    '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Reverse/Contradiction Rev. 4.png',
                    '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Reverse/Contradiction Rev. 5.png',
                    '/Ghost Mannequins/Fortifications/The Contradiction/Contradiction Reverse/Contradiction Rev. 6.png'
                ],
                colors: ['Multi'],
                sizes: [
                    { size: 'S', soldOut: false },
                    { size: 'M', soldOut: false },
                    { size: 'L', soldOut: false },
                    { size: 'XL', soldOut: false },
                    { size: 'XXL', soldOut: false }
                ],
                specsColumns: [
                    {
                        header: 'Exterior Composition',
                        items: [
                            'Reversible construction:',
                            { text: 'Side 1: NASCAR-inspired appliqués', indent: true },
                            { text: 'Side 2: Fresco mural featuring Inferno insignia', indent: true },
                            'Contrast color trims and accent panels',
                            'Embroidered appliqués and detailed graphics'
                        ]
                    },
                    {
                        header: 'Technical Composition',
                        items: [
                            '100% Cotton midweight build for moderate temperatures',
                            'Ribbed knit cuffs and waist hem',
                            'Long sleeves, mock neck design',
                            'Two front slip pockets',
                            'Full snap closure, tonal hardware',
                            'Dry clean only',
                            'Imported'
                        ]
                    }
                ]
            },
            {
                id: 'the-intersect',
                name: 'The Intersect',
                epithet: 'The worlds of asphalt and agility collide.',
                price: '670',
                colors: ['Multi'],
                images: [
                    {
                        is360: true,
                        frames: [
                            '/Ghost Mannequins/Fortifications/The Intersect/Intersect 1.png',
                            '/Ghost Mannequins/Fortifications/The Intersect/Intersect 2.png',
                            '/Ghost Mannequins/Fortifications/The Intersect/Intersect 3.png',
                            '/Ghost Mannequins/Fortifications/The Intersect/Intersect 4.png',
                            '/Ghost Mannequins/Fortifications/The Intersect/Intersect 5.png',
                            '/Ghost Mannequins/Fortifications/The Intersect/Intersect 6.png'
                        ]
                    },
                    '/Ghost Mannequins/Fortifications/The Intersect/Intersect 1.png',
                    '/Ghost Mannequins/Fortifications/The Intersect/Intersect 2.png',
                    '/Ghost Mannequins/Fortifications/The Intersect/Intersect 3.png',
                    '/Ghost Mannequins/Fortifications/The Intersect/Intersect 4.png',
                    '/Ghost Mannequins/Fortifications/The Intersect/Intersect 5.png',
                    '/Ghost Mannequins/Fortifications/The Intersect/Intersect 6.png'
                ],
                sizes: [
                    { size: 'S', soldOut: false },
                    { size: 'M', soldOut: false },
                    { size: 'L', soldOut: false },
                    { size: 'XL', soldOut: false },
                    { size: 'XXL', soldOut: false }
                ],
                specsColumns: [
                    {
                        header: 'Construction',
                        items: [
                            '100% premium leather shell',
                            'Ergonomic tailoring for dynamic mobility',
                            'Branded hardware and tonal stitching'
                        ]
                    },
                    {
                        header: 'Features',
                        items: [
                            'Reinforced elbow panels for durability and control',
                            'Fully lined interior for structural comfort',
                            'Optional back-protector compatibility',
                            'Inquire for bespoke customization options',
                            'Imported'
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: 'RELICS',
        epithet: 'the creed of craft',
        num: '03',
        id: 'relics',
        image: '/relics.svg',
        body: 'RELICS SERVE AS TIMELESS LEATHER GOODS THAT EMBODY STRENGTH THROUGH SUBTLETY AND REFINEMENT THROUGH UTILITY. EACH PIECE IS DESIGNED TO BE CARRIED, AGED, AND REMEMBERED.',
        products: [
            {
                id: 'the-creed',
                name: 'The Creed',
                epithet: 'Every strike makes a statement.',
                price: '990',
                colors: ['Amethyst'],
                sizes: [
                    { size: '12oz', soldOut: false },
                    { size: '14oz', soldOut: false },
                    { size: '16oz', soldOut: false }
                ],
                specsColumns: [
                    {
                        items: [
                            'Individually hand-crafted from 100% genuine full-grain cowhide leather',
                            'Double-stitched seams for structural reinforcement',
                            'Hand-screen-printed texture application'
                        ]
                    },
                    {
                        items: [
                            'Triple-layer foam padding for maximum impact absorption',
                            'Embroidered Inferno logo and Foundations insignia',
                            'Bespoke customization options available upon inquiry',
                            'Imported'
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: 'DOMINION',
        epithet: 'the path of conquest',
        num: '04',
        id: 'dominion',
        image: '/dominion.svg',
        body: <>DOMINION REPRESENTS PROGRESSION THROUGH MOTION. <span className="redacted-text">FOOTWEAR</span> ENGINEERED FOR ELEVATION, <span className="redacted-text">DESIGNED TO COMMAND EVERY STEP</span>. EACH PIECE IN THIS TIER SYMBOLIZES FORWARD MOMENTUM.</>,
        comingSoon: true,
        products: []
    },
    {
        title: 'ADORNMENTS',
        epithet: 'the reign of detail',
        num: '05',
        id: 'adornments',
        image: '/adornments.svg',
        body: <>ADORNMENTS EMBODIES REFINEMENT THROUGH SUBTLETY. <span className="redacted-text">ACCESSORIES THAT</span> COMMAND ATTENTION WITHOUT EXCESS. EACH PIECE IN THIS TIER CELEBRATES INTENTION. WHERE THE DETAILS EVOKE DOMINANCE.</>,
        comingSoon: true,
        products: []
    },
    {
        title: 'CROWNWORKS',
        epithet: 'the pinnacle of refinement',
        num: '06',
        id: 'crownworks',
        image: '/crownworks.svg',
        body: 'CROWNWORKS REPRESENTS THE EMBODIMENT OF POWER PERFECTED IN PRESENTATION: GARMENTS CRAFTED FOR MOMENTS OF COMMAND, CEREMONY, AND CONSEQUENCE. EACH CREATION IN THIS TIER SIGNIFIES COMPOSURE UNDER PRESSURE; THE DISCIPLINE TO REMAIN REGAL, THE ELEGANCE TO MOVE WITH AUTHORITY.',
        products: [
            {
                id: 'the-heir',
                name: 'The Heir',
                epithet: 'Heritage in woven form.',
                price: '950',
                colors: ['Black'],
                suitSizing: {
                    fits: ['Extra Slim', 'Slim', 'Classic', 'Relaxed'],
                    jacketFits: ['Short', 'Regular', 'Long'],
                    jacketSizes: ['36', '38', '39', '40', '42', '44', '48'],
                    pantWaist: ['28', '29', '30', '31', '32', '33', '34', '36', '38'],
                    pantLength: ['28', '30', '32', '34', '36']
                },
                specsColumns: [
                    {
                        header: 'Blazer',
                        items: [
                            'Crafted from a wrinkle-resistant wool blend with a refined stretch weave for enduring comfort and structure',
                            'Tailored in a relaxed profile with precise shoulder framing and contoured chest',
                            'Notch lapels, two-button front, flap pockets, and center-back vent',
                            'Virgin Wool / Polyester / Spandex blend',
                            'Fully lined interior for structure and longevity',
                            'Dry clean only • Imported'
                        ]
                    },
                    {
                        header: 'Pants',
                        items: [
                            'Coordinating trousers with wrinkle-resistant, stretch construction for fluid movement',
                            'Sits low on the waist, tapered through the thigh for a sculpted silhouette',
                            'Hook-and-bar closure, zip fly, buttoned back welt pockets, and slant hand pockets',
                            'Virgin Wool / Polyester / Spandex blend',
                            'Fully lined interior for comfort',
                            'Dry clean only • Imported'
                        ]
                    }
                ]
            },
            {
                id: 'the-standard',
                name: 'The Standard',
                epithet: 'The idealized norm of casual attire.',
                price: '910',
                colors: ['Chalk Grey', 'Zenith Blue', 'Agate Grey', 'Dark Sea Blue', 'Jet Black'],
                suitSizing: {
                    fits: ['Extra Slim', 'Slim', 'Classic', 'Relaxed'],
                    jacketFits: ['Short', 'Regular', 'Long'],
                    jacketSizes: ['36', '38', '39', '40', '42', '44', '48'],
                    pantWaist: ['28', '29', '30', '31', '32', '33', '34', '36', '38'],
                    pantLength: ['28', '30', '32', '34', '36']
                },
                specsColumns: [
                    {
                        header: 'Blazer',
                        items: [
                            'Easy care and easy wear with wrinkle-resistant fabric containing just enough stretch for all-day comfort',
                            'Cut in an extra slim fit, narrow through the shoulders and slimmer through the chest',
                            'Notch lapels, 2 button front, long sleeves with button cuffs, flap hand pockets, center back vent',
                            'Lined for added durability',
                            'Virgin Wool / Polyester / Spandex',
                            'Dry clean only • Imported'
                        ]
                    },
                    {
                        header: 'Pants',
                        items: [
                            'Easy care with wrinkle-resistant fabric and comfortable stretch',
                            'Extra slim fit, sits low on the waist, more fitted through the thigh',
                            'Hook and bar closure, zip fly, buttoned back welt pockets, slant hand pockets',
                            'Virgin Wool / Polyester / Spandex',
                            'Dry clean only • Imported'
                        ]
                    }
                ]
            },
            {
                id: 'the-statesman',
                name: 'The Statesman',
                epithet: 'Distinction tailored in layers.',
                price: '1100',
                colors: ['Chalk Grey', 'Dark Sea Blue', 'Jet Black'],
                suitSizing: {
                    fits: ['Extra Slim', 'Slim', 'Classic', 'Relaxed'],
                    jacketFits: ['Short', 'Regular', 'Long'],
                    jacketSizes: ['36', '38', '39', '40', '42', '44', '48'],
                    vestSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                    pantWaist: ['28', '29', '30', '31', '32', '33', '34', '36', '38'],
                    pantLength: ['28', '30', '32', '34', '36']
                },
                specsColumns: [
                    {
                        header: 'Blazer',
                        items: [
                            'Wrinkle-resistant wool blend with controlled stretch for uncompromised form',
                            'Notch lapels, two-button front, flap pockets, and center-back vent',
                            'Virgin Wool / Polyester / Spandex blend',
                            'Dry clean only • Imported'
                        ]
                    },
                    {
                        header: 'Vest',
                        items: [
                            'Slim fit through the shoulders and chest for a defined silhouette',
                            'Full button front, slant x  welt pockets, and adjustable slide-back tab',
                            'Fully lined interior for durability and structure',
                            'Virgin Wool / Polyester / Spandex blend',
                            'Dry clean only • Imported'
                        ]
                    },
                    {
                        header: 'Pants',
                        items: [
                            'Coordinating trousers designed for structured comfort and streamlined motion',
                            'Low-rise waist, tapered thigh, hook-and-bar closure, buttoned welt pockets',
                            'Fully lined for comfort and longevity',
                            'Virgin Wool / Polyester / Spandex blend',
                            'Dry clean only • Imported'
                        ]
                    }
                ]
            }
        ]
    }
];

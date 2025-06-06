
export enum SectionType {
    NORMAL = 'normal',
    ITEM = 'item'
}

export interface IHomeItem {
    id: number;
    [key: string]: any;
}

export interface IHomeSection {
    title: string;
    data: IHomeItem[];
    type: SectionType;
    [key: string]: any;
}

export const HomeData: IHomeSection[] = [
    {
        title: 'Featured Products',
        id: 1,
        type: SectionType.NORMAL,
        data: [],
    },
    {
        id: 2,
        icon: require('../assets/images/fund.png'),
        title: 'Super Savings',
        detail: 'build savings overtime, withdraw anytime, low min. deposits',
        precent: '5.60%',
        unit: 'p.a.',
        type: SectionType.ITEM,

        data: []
    },
    {
        id: 3,
        icon: require('../assets/images/growth.png'),
        title: 'Super Growth',
        detail: 'grow savings with premium and passive income, withdraw anytime',
        precent: '13.2%',
        unit: 'p.a.',
        type: SectionType.ITEM,

        data: []

    },
    {
        id: 4,
        icon: require('../assets/images/deposite.png'),
        title: 'Term Deposit',
        detail: 'locked in interest rate, 1 year fixed term',
        precent: '23%',
        unit: 'p.a.',
        type: SectionType.ITEM,
        data: []

    },
    {
        title: 'Coming Soon',
        id: 5,
        type: SectionType.NORMAL,
        data: [
            {
                id: 6,
                icon: require('../assets/images/remittence.png'),
                title: 'Remittence'
            },
            {
                id: 7,
                icon: require('../assets/images/insurance.png'),
                title: 'Insurance'
            },
            {
                id: 8,
                icon: require('../assets/images/micro.png'),
                title: 'Micro-lending'
            },
            {
                id: 9,
                icon: require('../assets/images/remittence.png'),
                title: 'Remittence'
            },
            {
                id: 10,
                icon: require('../assets/images/insurance.png'),
                title: 'Insurance'
            },
            {
                id: 11,
                icon: require('../assets/images/micro.png'),
                title: 'Micro-lending'
            },
            {
                id: 12,
                icon: require('../assets/images/remittence.png'),
                title: 'Remittence'
            },
            {
                id: 13,
                icon: require('../assets/images/insurance.png'),
                title: 'Insurance'
            },
            {
                id: 14,
                icon: require('../assets/images/micro.png'),
                title: 'Micro-lending'
            },
        ]
    }
]


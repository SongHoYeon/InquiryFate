import { useState } from "react/cjs/react.development";
import fateDB from '../../assets/fate_.json'

export const numberPad = (n, width) => {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

export const yearArr = new Array();
for (var step = 1900; step <= new Date().getFullYear(); step++) {
    yearArr.push(step);
}

export const monthArr = new Array();
for (var step = 1; step <= 12; step++) {
    monthArr.push(step);
}

export const dayArr = new Array();
for (var step = 1; step <= 31; step++) {
    dayArr.push(step);
}

export const timeArr = [
    {
        time: '23:30 ~ 01:30',
        hz: '子時'
    },
    {
        time: '01:30 ~ 03:30',
        hz: '丑時'
    },
    {
        time: '03:30 ~ 05:30',
        hz: '寅時'
    },
    {
        time: '05:30 ~ 07:30',
        hz: '卯時'
    },
    {
        time: '07:30 ~ 09:30',
        hz: '辰時'
    },
    {
        time: '09:30 ~ 11:30',
        hz: '巳時'
    },
    {
        time: '11:30 ~ 13:30',
        hz: '午時'
    },
    {
        time: '13:30 ~ 15:30',
        hz: '未時'
    },
    {
        time: '15:30 ~ 17:30',
        hz: '申時'
    },
    {
        time: '17:30 ~ 19:30',
        hz: '酉時'
    },
    {
        time: '19:30 ~ 21:30',
        hz: '戌時'
    },
    {
        time: '21:30 ~ 23:30',
        hz: '亥時'
    },
    {
        time: '출생시 불명',
        hz: '-'
    }
]
export const fateTimeArr = [
    {
        key: '甲己',
        value: [
            {
                key: '子',
                fate: '甲子'
            },
            {
                key: '丑',
                fate: '乙丑'
            },
            {
                key: '寅',
                fate: '丙寅'
            },
            {
                key: '卯',
                fate: '丁卯'
            },
            {
                key: '辰',
                fate: '戊辰'
            },
            {
                key: '巳',
                fate: '己巳'
            },
            {
                key: '午',
                fate: '庚午'
            },
            {
                key: '未',
                fate: '辛未'
            },
            {
                key: '申',
                fate: '壬申'
            },
            {
                key: '酉',
                fate: '癸酉'
            },
            {
                key: '戌',
                fate: '甲戌'
            },
            {
                key: '亥',
                fate: '乙亥'
            },
        ]
    },
    {
        key: '乙庚',
        value: [
            {
                key: '子',
                fate: '丙子'
            },
            {
                key: '丑',
                fate: '丁丑'
            },
            {
                key: '寅',
                fate: '戊寅'
            },
            {
                key: '卯',
                fate: '己卯'
            },
            {
                key: '辰',
                fate: '庚辰'
            },
            {
                key: '巳',
                fate: '辛巳'
            },
            {
                key: '午',
                fate: '壬午'
            },
            {
                key: '未',
                fate: '癸未'
            },
            {
                key: '申',
                fate: '甲申'
            },
            {
                key: '酉',
                fate: '乙酉'
            },
            {
                key: '戌',
                fate: '丙戌'
            },
            {
                key: '亥',
                fate: '丁亥'
            },
        ]
    },
    {
        key: '丙辛',
        value: [
            {
                key: '子',
                fate: '戊子'
            },
            {
                key: '丑',
                fate: '己丑'
            },
            {
                key: '寅',
                fate: '庚寅'
            },
            {
                key: '卯',
                fate: '辛卯'
            },
            {
                key: '辰',
                fate: '壬辰'
            },
            {
                key: '巳',
                fate: '癸巳'
            },
            {
                key: '午',
                fate: '甲午'
            },
            {
                key: '未',
                fate: '乙未'
            },
            {
                key: '申',
                fate: '丙申'
            },
            {
                key: '酉',
                fate: '丁酉'
            },
            {
                key: '戌',
                fate: '戊戌'
            },
            {
                key: '亥',
                fate: '己亥'
            },
        ]
    },
    {
        key: '丁壬',
        value: [
            {
                key: '子',
                fate: '庚子'
            },
            {
                key: '丑',
                fate: '辛丑'
            },
            {
                key: '寅',
                fate: '壬寅'
            },
            {
                key: '卯',
                fate: '癸卯'
            },
            {
                key: '辰',
                fate: '甲辰'
            },
            {
                key: '巳',
                fate: '乙巳'
            },
            {
                key: '午',
                fate: '丙午'
            },
            {
                key: '未',
                fate: '丁未'
            },
            {
                key: '申',
                fate: '戊申'
            },
            {
                key: '酉',
                fate: '己酉'
            },
            {
                key: '戌',
                fate: '庚戌'
            },
            {
                key: '亥',
                fate: '辛亥'
            },
        ]
    },
    {
        key: '戊癸',
        value: [
            {
                key: '子',
                fate: '壬子'
            },
            {
                key: '丑',
                fate: '癸丑'
            },
            {
                key: '寅',
                fate: '甲寅'
            },
            {
                key: '卯',
                fate: '乙卯'
            },
            {
                key: '辰',
                fate: '丙辰'
            },
            {
                key: '巳',
                fate: '丁巳'
            },
            {
                key: '午',
                fate: '戊午'
            },
            {
                key: '未',
                fate: '己未'
            },
            {
                key: '申',
                fate: '庚申'
            },
            {
                key: '酉',
                fate: '辛酉'
            },
            {
                key: '戌',
                fate: '壬戌'
            },
            {
                key: '亥',
                fate: '癸亥'
            },
        ]
    },
]
export const onlyTimeArr = timeArr.map(item => {
    return item.hz + " " + item.time
})

export const hzArr = [
    {
        hz: '甲',
        korea : '갑',
        attr : '목',
        lightness : 'light'
    },
    {
        hz: '乙',
        korea : '을',
        attr : '목',
        lightness : 'dark'
    },
    {
        hz: '丙',
        korea : '병',
        attr : '화',
        lightness : 'light'
    },
    {
        hz: '丁',
        korea : '정',
        attr : '화',
        lightness : 'dark'
    },
    {
        hz: '戊',
        korea : '무',
        attr : '토',
        lightness : 'light'
    },
    {
        hz: '己',
        korea : '기',
        attr : '토',
        lightness : 'dark'
    },
    {
        hz: '庚',
        korea : '경',
        attr : '금',
        lightness : 'light'
    },
    {
        hz: '辛',
        korea : '신',
        attr : '금',
        lightness : 'dark'
    },
    {
        hz: '壬',
        korea : '임',
        attr : '수',
        lightness : 'light'
    },
    {
        hz: '癸',
        korea : '계',
        attr : '수',
        lightness : 'dark'
    },
    {
        hz: '子',
        korea : '자',
        attr : '수',
        lightness : 'dark'
    },
    {
        hz: '丑',
        korea : '축',
        attr : '토',
        lightness : 'dark'
    },
    {
        hz: '寅',
        korea : '인',
        attr : '목',
        lightness : 'light'
    },
    {
        hz: '卯',
        korea : '묘',
        attr : '목',
        lightness : 'dark'
    },
    {
        hz: '辰',
        korea : '진',
        attr : '토',
        lightness : 'light'
    },
    {
        hz: '巳',
        korea : '사',
        attr : '화',
        lightness : 'light'
    },
    {
        hz: '午',
        korea : '오',
        attr : '화',
        lightness : 'dark'
    },
    {
        hz: '未',
        korea : '미',
        attr : '토',
        lightness : 'dark'
    },
    {
        hz: '申',
        korea : '신',
        attr : '금',
        lightness : 'light'
    },
    {
        hz: '酉',
        korea : '유',
        attr : '금',
        lightness : 'dark'
    },
    {
        hz: '戌',
        korea : '술',
        attr : '토',
        lightness : 'light'
    },
    {
        hz: '亥',
        korea : '해',
        attr : '수',
        lightness : 'light'
    },
]

export const attrArr = ['목', '화', '토', '금', '수'];

export const sixChinArr = [
    {
        same : "비견",
        different : "겁재",
    },
    {
        same : "식신",
        different : "상관",
    },
    {
        same : "편재",
        different : "정재",
    },
    {
        same : "편관",
        different : "정관",
    },
    {
        same : "편인",
        different : "정인",
    },
];

export const jijangArr = [
    {
        hz: '子',
        jijang : '壬癸'
    },
    {
        hz: '丑',
        jijang : '癸辛己'
    },
    {
        hz: '寅',
        jijang : '戊丙甲'
    },
    {
        hz: '卯',
        jijang : '甲乙'
    },
    {
        hz: '辰',
        jijang : '乙癸戊'
    },
    {
        hz: '巳',
        jijang : '戊庚丙'
    },
    {
        hz: '午',
        jijang : '丙己丁'
    },
    {
        hz: '未',
        jijang : '丙乙己'
    },
    {
        hz: '申',
        jijang : '戊壬庚'
    },
    {
        hz: '酉',
        jijang : '庚辛'
    },
    {
        hz: '戌',
        jijang : '辛丁戊'
    },
    {
        hz: '亥',
        jijang : '戊甲壬'
    },
]

export const skyArr = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
export const earthArr = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
export const allYears = fateDB.fate.filter(fate => fate.cd_sm === (3).toString() && fate.cd_sd === (1).toString()).reverse();

// export const globalUserDBArr = new Array();
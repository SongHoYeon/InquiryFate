import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import { DefaultModalPopup } from '../components/etc/ModalPopup';
import { useRef } from 'react/cjs/react.development';
import holidayKR from "holiday-kr";
import SocketInstance from '../components/Socket/Socket';
import * as utils from "../components/etc/Util"
import fateDB from '../assets/fate_.json'
import Animated, { Easing, max } from 'react-native-reanimated';

const FateResultScreen = ({ route, navigation }) => {
    let { usersData } = route.params;
    // const [userDBArr, setUserDBArr] = useState([]);
    // const onlyOneCall = useRef(false);
    // if (!onlyOneCall.current) {
    //     setUserDBArr(utils.globalUserDBArr);
    //     onlyOneCall.current = true
    // }
    const [defaultModalPopupVisible, setDefaultModalPopupVisible] = useState(false);
    const defaultPopupMessage = useRef("");
    const fateCard = [
        {
            name: '乙',
            path: require('../assets/FateCard/乙.png')
        },
        {
            name: '甲',
            path: require('../assets/FateCard/甲.png')
        },
        {
            name: '庚',
            path: require('../assets/FateCard/庚.png')
        },
        {
            name: '己',
            path: require('../assets/FateCard/己.png')
        },
        {
            name: '戊',
            path: require('../assets/FateCard/戊.png')
        },
        {
            name: '丙',
            path: require('../assets/FateCard/丙.png')
        },
        {
            name: '辛',
            path: require('../assets/FateCard/辛.png')
        },
        {
            name: '壬',
            path: require('../assets/FateCard/壬.png')
        },
        {
            name: '丁',
            path: require('../assets/FateCard/丁.png')
        },
        {
            name: '癸',
            path: require('../assets/FateCard/癸.png')
        },
        {
            name: '子',
            path: require('../assets/FateCard/子.png')
        },
        {
            name: '丑',
            path: require('../assets/FateCard/丑.png')
        },
        {
            name: '寅',
            path: require('../assets/FateCard/寅.png')
        },
        {
            name: '卯',
            path: require('../assets/FateCard/卯.png')
        },
        {
            name: '辰',
            path: require('../assets/FateCard/辰.png')
        },
        {
            name: '巳',
            path: require('../assets/FateCard/巳.png')
        },
        {
            name: '午',
            path: require('../assets/FateCard/午.png')
        },
        {
            name: '未',
            path: require('../assets/FateCard/未.png')
        },
        {
            name: '申',
            path: require('../assets/FateCard/申.png')
        },
        {
            name: '酉',
            path: require('../assets/FateCard/酉.png')
        },
        {
            name: '戌',
            path: require('../assets/FateCard/戌.png')
        },
        {
            name: '亥',
            path: require('../assets/FateCard/亥.png')
        },
        {
            name: 'back',
            path: require('../assets/FateCard/back.png')
        }
    ];

    const fateChangeArr = ['丑', '寅', '申', '辰', '未', '戌'];
    const fateChangeTimeKeysArr = [
        ['亥', '丑', '子'],
        ['亥', '丑', '子', '寅'],
        ['申', '巳', '午', '未'],
        ['寅', '辰', '卯'],
        ['巳', '午', '未'],
        ['申', '酉', '戌'],
    ]
    const fateChangeMonthCard = [
        {
            name: '未',
            path: require('../assets/FateCard/未_c.png')
        },
        {
            name: '丑',
            path: require('../assets/FateCard/丑_c.png')
        },
        {
            name: '寅',
            path: require('../assets/FateCard/寅_c.png')
        },
        {
            name: '申',
            path: require('../assets/FateCard/申_c.png')
        },
        {
            name: '戌',
            path: require('../assets/FateCard/戌_h.png')
        },
        {
            name: '辰',
            path: require('../assets/FateCard/辰_h.png')
        },
    ];
    const fateChangetimeCard = [
        {
            name: '未',
            path: require('../assets/FateCard/未_c.png')
        },
        {
            name: '丑',
            path: require('../assets/FateCard/丑_c.png')
        },
        {
            name: '寅',
            path: require('../assets/FateCard/寅_c.png')
        },
        {
            name: '申',
            path: require('../assets/FateCard/申_c.png')
        },
        {
            name: '戌',
            path: require('../assets/FateCard/戌_c.png')
        },
        {
            name: '辰',
            path: require('../assets/FateCard/辰_c.png')
        },
    ];
    const bigFateAgeArr = Array.from(Array(13).keys());
    const currentDate = new Date();
    const threeYears = fateDB.fate.filter(fate => fate.cd_sy >= currentDate.getFullYear() - 1 && fate.cd_sy <= currentDate.getFullYear() + 1 && fate.cd_sd === (15).toString()).reverse();

    const flipAnimationArr = useRef(new Array());
    const currentFlipCardIdx = useRef(-1);
    const interpolateFrontArr = new Array();
    const interpolateBackArr = new Array();
    const RotateFrontArr = new Array();
    const RotateBackArr = new Array();
    for (let i = 0; i < 8; i++) {
        flipAnimationArr.current[i] = new Animated.Value(0);
        interpolateFrontArr[i] = flipAnimationArr.current[i].interpolate({
            inputRange: [0, 180],
            outputRange: ["0deg", "180deg"],
        })
        interpolateBackArr[i] = flipAnimationArr.current[i].interpolate({
            inputRange: [0, 180],
            outputRange: ["180deg", "360deg"],
        })
        RotateFrontArr[i] = {
            transform: [
                {
                    rotateY: interpolateFrontArr[i],
                },
            ],
        };
        RotateBackArr[i] = {
            transform: [
                {
                    rotateY: interpolateBackArr[i],
                },
            ],
        };
    }
    const doAFlip = (idx) => {
        currentFlipCardIdx.current = idx;
        Animated.timing(flipAnimationArr.current[currentFlipCardIdx.current], {
            duration: 500,
            toValue: 180,
            easing: Easing.bounce,
            useNativeDriver: true,
        }).start();
    };

    const userDataItem = (user, fate, bigFate) => {
        let skyStartIdx_big = 0
        let earthStartIdx_big = 0;
        utils.skyArr.map((item, i) => {
            if (item === fate.cd_hmganjee[0])
                skyStartIdx_big = i;
        });
        utils.earthArr.map((item, i) => {
            if (item === fate.cd_hmganjee[1])
                earthStartIdx_big = i;
        });
        const getBornText = () => {
            if (user.solar === 0) {
                const lunarDate = holidayKR.getLunar(user.bornDate.year, user.bornDate.month, user.bornDate.day);
                return (
                    <View style={styles.uib_bornDate_area}>
                        <Text style={styles.uib_bornDate}>(양){user.bornDate.year}-{utils.numberPad(user.bornDate.month, 2)}-{utils.numberPad(user.bornDate.day, 2)}</Text>
                        <Text style={styles.uib_bornDate}>(음){lunarDate.year}-{utils.numberPad(lunarDate.month, 2)}-{utils.numberPad(lunarDate.day, 2)}</Text>
                    </View>
                )
            }
            else {
                const solarDate = holidayKR.getSolar(user.bornDate.year, user.bornDate.month, user.bornDate.day);
                return (
                    <View style={styles.uib_bornDate_area}>
                        <Text style={styles.uib_bornDate}>(양){solarDate.year}-{utils.numberPad(solarDate.month, 2)}-{utils.numberPad(solarDate.day, 2)}</Text>
                        <Text style={styles.uib_bornDate}>(음){user.bornDate.year}-{utils.numberPad(user.bornDate.month, 2)}-{utils.numberPad(user.bornDate.day, 2)}</Text>
                    </View>
                )
            }
        }
        const getSixChin = (target) => {
            let keyData, targetData, sixChinData;
            utils.hzArr.map(item => {
                if (item.hz === fate.cd_hdganjee[0])
                    keyData = item
                if (item.hz === target)
                    targetData = item;
            })
            const targetAttrIdx = utils.attrArr.indexOf(targetData.attr);
            const keyAttrIdx = utils.attrArr.indexOf(keyData.attr);

            if (targetAttrIdx === keyAttrIdx)
                sixChinData = utils.sixChinArr[0]
            else if (targetAttrIdx > keyAttrIdx)
                sixChinData = utils.sixChinArr[utils.attrArr.indexOf(targetData.attr) - utils.attrArr.indexOf(keyData.attr)];
            else
                sixChinData = utils.sixChinArr[utils.attrArr.indexOf(targetData.attr) - utils.attrArr.indexOf(keyData.attr) + 5];

            if (keyData.lightness === targetData.lightness)
                return sixChinData.same;
            else
                return sixChinData.different

        }
        const getAttrCount = (targetAttr) => {
            let count = 0;
            if (fate.hasOwnProperty("time")) {
                utils.hzArr.map(hzItem => {
                    if (hzItem.hz === fate.time[0] && hzItem.attr === targetAttr)
                        count++
                    if (hzItem.hz === fate.time[1] && hzItem.attr === targetAttr)
                        count++
                })
            }
            utils.hzArr.map(hzItem => {
                if (hzItem.hz === fate.cd_hdganjee[0] && hzItem.attr === targetAttr)
                    count++
                if (hzItem.hz === fate.cd_hdganjee[1] && hzItem.attr === targetAttr)
                    count++
                if (hzItem.hz === fate.cd_hmganjee[0] && hzItem.attr === targetAttr)
                    count++
                if (hzItem.hz === fate.cd_hmganjee[1] && hzItem.attr === targetAttr)
                    count++
                if (hzItem.hz === fate.cd_hyganjee[0] && hzItem.attr === targetAttr)
                    count++
                if (hzItem.hz === fate.cd_hyganjee[1] && hzItem.attr === targetAttr)
                    count++
            })
            return count;
        }
        const getJijange = (target) => {
            return utils.jijangArr.map(item => {
                if (item.hz === target)
                    return item.jijang;
            })
        }
        const getBigFateList = (idx) => {
            let skyHzIdx = 0;
            let earthHzIdx = 0;
            if (bigFate.isLinear) {
                skyHzIdx = skyStartIdx_big + idx + 1;
                earthHzIdx = earthStartIdx_big + idx + 1;
                if (skyHzIdx >= 10) {
                    if (skyHzIdx - 10 >= 10)
                        skyHzIdx -= 20;
                    else
                        skyHzIdx -= 10;
                }
                if (earthHzIdx >= 12) {
                    if (earthHzIdx - 12 >= 12)
                        earthHzIdx -= 24;
                    else
                        earthHzIdx -= 12;
                }
            }
            else {
                skyHzIdx = skyStartIdx_big - idx - 1;
                earthHzIdx = earthStartIdx_big - idx - 1;
                if (skyHzIdx < 0) {
                    if (skyHzIdx + 10 < 0)
                        skyHzIdx += 20;
                    else
                        skyHzIdx += 10;
                }
                if (earthHzIdx < 0) {
                    if (earthHzIdx + 12 < 0)
                        earthHzIdx += 24;
                    else
                        earthHzIdx += 12;
                }
            }
            const skyHz = utils.skyArr[skyHzIdx];
            const earthHz = utils.earthArr[earthHzIdx];
            return (
                <View key={idx} style={styles.uibf_box}>
                    <View style={styles.uibf_age}>
                        <Text style={styles.uibf_age_text}>{
                            idx == 0 ? bigFate.startAge.toFixed(1) : Math.round(bigFate.startAge) + idx * 10
                        }</Text>
                    </View>
                    <View style={styles.uibf_hz_box}>
                        <Text style={styles.uibf_hz_text}>{skyHz}</Text>
                    </View>
                    <View style={styles.uibf_hz_box}>
                        <Text style={styles.uibf_hz_text}>{earthHz}</Text>
                    </View>
                </View>
            )
        }
        const getYearFateList = (yearData) => {
            return (
                <View key={yearData.cd_sy} style={styles.uiyf_box}>
                    <View style={styles.uiyf_age}>
                        <Text style={styles.uiyf_age_text}>{yearData.cd_sy}</Text>
                    </View>
                    <View style={styles.uiyf_hz_box}>
                        <Text style={styles.uiyf_hz_text}>{yearData.cd_hyganjee[0]}</Text>
                    </View>
                    <View style={styles.uiyf_hz_box}>
                        <Text style={styles.uiyf_hz_text}>{yearData.cd_hyganjee[1]}</Text>
                    </View>
                    <View style={styles.uiyf_age}>
                        <Text style={styles.uiyf_age_text}>{yearData.cd_sy - user.bornDate.year + 1}</Text>
                    </View>
                </View>
            )
        }
        const getMonthFateList = (monthData) => {
            return (
                <View key={monthData.cd_hmganjee} style={[styles.uimf_box, monthData.cd_sy === currentDate.getFullYear() && monthData.cd_sm === (currentDate.getMonth() + 1).toString() ? { backgroundColor: 'red' } : {}]}>
                    <View style={styles.uimf_hz_box}>
                        <Text style={styles.uimf_hz_text}>{monthData.cd_hmganjee[0]}</Text>
                    </View>
                    <View style={styles.uimf_hz_box}>
                        <Text style={styles.uimf_hz_text}>{monthData.cd_hmganjee[1]}</Text>
                    </View>
                    <View style={styles.uimf_age}>
                        <Text style={styles.uimf_age_text}>{monthData.cd_sm}</Text>
                    </View>
                </View>
            )
        }
        const renderRemoveDB = () => {
            // if (userDBArr.includes(user.name)) {
            //     return (
            //         <TouchableOpacity style={styles.ab_btn} onPress={() => {
            //             setUserDBArr(userDBArr.filter(item => item !== user.name));
            //             SocketInstance.getInstance().send('RequestRemoveUser', user.name);
            //             utils.globalUserDBArr = utils.globalUserDBArr.filter(item=> item !== user.name)
            //         }}>
            //             <Text style={styles.ab_btn_text}>삭제</Text>
            //         </TouchableOpacity>
            //     )
            // }
        }
        return (
            <View key={JSON.stringify(user)} style={styles.user_info_wrap}>
                <Text style={styles.ui_header_name}>{user.name} ({new Date().getFullYear() + 1 - user.bornDate.year}세)</Text>
                <View style={styles.ui_base_group}>
                    <View style={styles.uib_box}><Text style={styles.uib_gender}>{user.gender === 0 ? "남자" : "여자"}</Text></View>
                    {getBornText()}
                    <View style={styles.uib_box}>
                        <Text style={styles.uib_bornTime}>{user.bornTime === '-' ? "" :
                            utils.timeArr.map(item => {
                                return item.hz === user.bornTime ? item.hz + "\n" + item.time : "";
                            })}
                        </Text>
                    </View>
                    <View style={styles.uib_box}><Text style={styles.uib_koreaTime}>대한민국{"\n"}(-30분)</Text></View>
                </View>
                <View style={styles.ui_fategroup}>
                    <View style={styles.uif_box}>
                        <View style={styles.uif_text_area}>
                            <Text style={styles.uif_text}>{fate.hasOwnProperty("time") ? getSixChin(fate.time[0]) : ""}</Text>
                        </View>
                        <View style={styles.uif_card_area}>
                            <TouchableOpacity style={styles.uif_btn_card} onPress={() => {
                                doAFlip(0);
                            }}>
                                {
                                    fate.hasOwnProperty("time") ?
                                        fateCard.map(item => {
                                            return (item.name === fate.time[0] ?
                                                (
                                                    <View key={item.name}>
                                                        <Animated.View style={[RotateFrontArr[0], { backfaceVisibility: 'hidden' }]}>
                                                            <Image style={styles.uif_card_img} source={require('../assets/FateCard/back.png')} />
                                                        </Animated.View>
                                                        <Animated.View style={[{ position: 'absolute', top: 0 }, { backfaceVisibility: 'hidden' }, RotateBackArr[0]]}>
                                                            <Image style={styles.uif_card_img} source={item.path} />
                                                        </Animated.View>
                                                    </View>
                                                )
                                                : null)
                                        }) : null
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.uif_card_area}>
                            <TouchableOpacity style={styles.uif_btn_card} onPress={() => {
                                doAFlip(1);
                            }}>
                                {
                                    fate.hasOwnProperty("time") ?
                                        fateChangeArr.indexOf(fate.time[1]) !== -1 ?
                                            fateChangeTimeKeysArr[fateChangeArr.indexOf(fate.time[1])].includes(fate.cd_hmganjee[1]) ?
                                                fateChangetimeCard.map(item => {
                                                    if (item.name === fate.time[1]) {
                                                        return (
                                                            <View key={item.name}>
                                                                <Animated.View style={[RotateFrontArr[1], { backfaceVisibility: 'hidden' }]}>
                                                                    <Image style={styles.uif_card_img} source={require('../assets/FateCard/back.png')} />
                                                                </Animated.View>
                                                                <Animated.View style={[{ position: 'absolute', top: 0 }, { backfaceVisibility: 'hidden' }, RotateBackArr[1]]}>
                                                                    <Image style={styles.uif_card_img} source={item.path} />
                                                                </Animated.View>
                                                            </View>
                                                        )
                                                    }
                                                })
                                                :
                                                fateCard.map(item => {
                                                    if (item.name === fate.time[1]) {
                                                        return (
                                                            <View key={item.name}>
                                                                <Animated.View style={[RotateFrontArr[1], { backfaceVisibility: 'hidden' }]}>
                                                                    <Image style={styles.uif_card_img} source={require('../assets/FateCard/back.png')} />
                                                                </Animated.View>
                                                                <Animated.View style={[{ position: 'absolute', top: 0 }, { backfaceVisibility: 'hidden' }, RotateBackArr[1]]}>
                                                                    <Image style={styles.uif_card_img} source={item.path} />
                                                                </Animated.View>
                                                            </View>
                                                        )
                                                    }
                                                })
                                            :
                                            fateCard.map(item => {
                                                if (item.name === fate.time[1]) {
                                                    return (
                                                        <View key={item.name}>
                                                            <Animated.View style={[RotateFrontArr[1], { backfaceVisibility: 'hidden' }]}>
                                                                <Image style={styles.uif_card_img} source={require('../assets/FateCard/back.png')} />
                                                            </Animated.View>
                                                            <Animated.View style={[{ position: 'absolute', top: 0 }, { backfaceVisibility: 'hidden' }, RotateBackArr[1]]}>
                                                                <Image style={styles.uif_card_img} source={item.path} />
                                                            </Animated.View>
                                                        </View>
                                                    )
                                                }
                                            })
                                        : null
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.uif_text_area}>
                            <Text style={styles.uif_text}>{fate.hasOwnProperty("time") ? getSixChin(fate.time[1]) : ""}</Text>
                        </View>
                    </View>
                    <View style={styles.uif_box}>
                        <View style={styles.uif_text_area}>
                            <Text style={styles.uif_text}>일원</Text>
                        </View>
                        <View style={styles.uif_card_area}>
                            <TouchableOpacity style={styles.uif_btn_card} onPress={() => {
                                doAFlip(2);
                            }}>
                                {
                                    fateCard.map(item => {
                                        return (item.name === fate.cd_hdganjee[0] ?
                                            (
                                                <View key={item.name}>
                                                    <Animated.View style={[RotateFrontArr[2], { backfaceVisibility: 'hidden' }]}>
                                                        <Image style={styles.uif_card_img} source={require('../assets/FateCard/back.png')} />
                                                    </Animated.View>
                                                    <Animated.View style={[{ position: 'absolute', top: 0 }, { backfaceVisibility: 'hidden' }, RotateBackArr[2]]}>
                                                        <Image style={styles.uif_card_img} source={item.path} />
                                                    </Animated.View>
                                                </View>
                                            )
                                            : null)
                                    })
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.uif_card_area}>
                            <TouchableOpacity style={styles.uif_btn_card} onPress={() => {
                                doAFlip(3);
                            }}>
                                {
                                    fateCard.map(item => {
                                        return (item.name === fate.cd_hdganjee[1] ?
                                            (
                                                <View key={item.name}>
                                                    <Animated.View style={[RotateFrontArr[3], { backfaceVisibility: 'hidden' }]}>
                                                        <Image style={styles.uif_card_img} source={require('../assets/FateCard/back.png')} />
                                                    </Animated.View>
                                                    <Animated.View style={[{ position: 'absolute', top: 0 }, { backfaceVisibility: 'hidden' }, RotateBackArr[3]]}>
                                                        <Image style={styles.uif_card_img} source={item.path} />
                                                    </Animated.View>
                                                </View>
                                            )
                                            : null)
                                    })
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.uif_text_area}>
                            <Text style={styles.uif_text}>{getSixChin(fate.cd_hdganjee[1])}</Text>
                        </View>
                    </View>
                    <View style={styles.uif_box}>
                        <View style={styles.uif_text_area}>
                            <Text style={styles.uif_text}>{getSixChin(fate.cd_hmganjee[0])}</Text>
                        </View>
                        <View style={styles.uif_card_area}>
                            <TouchableOpacity style={styles.uif_btn_card} onPress={() => {
                                doAFlip(4);
                            }}>
                                {
                                    fateCard.map(item => {
                                        return (item.name === fate.cd_hmganjee[0] ?
                                            (
                                                <View key={item.name}>
                                                    <Animated.View style={[RotateFrontArr[4], { backfaceVisibility: 'hidden' }]}>
                                                        <Image style={styles.uif_card_img} source={require('../assets/FateCard/back.png')} />
                                                    </Animated.View>
                                                    <Animated.View style={[{ position: 'absolute', top: 0 }, { backfaceVisibility: 'hidden' }, RotateBackArr[4]]}>
                                                        <Image style={styles.uif_card_img} source={item.path} />
                                                    </Animated.View>
                                                </View>
                                            )
                                            : null)
                                    })
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.uif_card_area}>
                            <TouchableOpacity style={styles.uif_btn_card} onPress={() => {
                                doAFlip(5);
                            }}>
                                {
                                    fateChangeArr.includes(fate.cd_hmganjee[1]) ?
                                        fateChangeMonthCard.map(item => {
                                            if (item.name === fate.cd_hmganjee[1]) {
                                                return (
                                                    <View key={item.name}>
                                                        <Animated.View style={[RotateFrontArr[5], { backfaceVisibility: 'hidden' }]}>
                                                            <Image style={styles.uif_card_img} source={require('../assets/FateCard/back.png')} />
                                                        </Animated.View>
                                                        <Animated.View style={[{ position: 'absolute', top: 0 }, { backfaceVisibility: 'hidden' }, RotateBackArr[5]]}>
                                                            <Image style={styles.uif_card_img} source={item.path} />
                                                        </Animated.View>
                                                    </View>
                                                )
                                            }
                                        }) :
                                        fateCard.map(item => {
                                            if (item.name === fate.cd_hmganjee[1]) {
                                                return (
                                                    <View key={item.name}>
                                                        <Animated.View style={[RotateFrontArr[5], { backfaceVisibility: 'hidden' }]}>
                                                            <Image style={styles.uif_card_img} source={require('../assets/FateCard/back.png')} />
                                                        </Animated.View>
                                                        <Animated.View style={[{ position: 'absolute', top: 0 }, { backfaceVisibility: 'hidden' }, RotateBackArr[5]]}>
                                                            <Image style={styles.uif_card_img} source={item.path} />
                                                        </Animated.View>
                                                    </View>
                                                )
                                            }
                                        })
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.uif_text_area}>
                            <Text style={styles.uif_text}>{getSixChin(fate.cd_hmganjee[1])}</Text>
                        </View>
                    </View>
                    <View style={styles.uif_box}>
                        <View style={styles.uif_box}>
                            <View style={styles.uif_text_area}>
                                <Text style={styles.uif_text}>{getSixChin(fate.cd_hyganjee[0])}</Text>
                            </View>
                            <View style={styles.uif_card_area}>
                                <TouchableOpacity style={styles.uif_btn_card} onPress={() => {
                                    doAFlip(6);
                                }}>
                                    {
                                        fateCard.map(item => {
                                            return (item.name === fate.cd_hyganjee[0] ?
                                                (
                                                    <View key={item.name}>
                                                        <Animated.View style={[RotateFrontArr[6], { backfaceVisibility: 'hidden' }]}>
                                                            <Image style={styles.uif_card_img} source={require('../assets/FateCard/back.png')} />
                                                        </Animated.View>
                                                        <Animated.View style={[{ position: 'absolute', top: 0 }, { backfaceVisibility: 'hidden' }, RotateBackArr[6]]}>
                                                            <Image style={styles.uif_card_img} source={item.path} />
                                                        </Animated.View>
                                                    </View>
                                                )
                                                : null)
                                        })
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={styles.uif_card_area}>
                                <TouchableOpacity style={styles.uif_btn_card} onPress={() => {
                                    doAFlip(7);
                                }}>
                                    {
                                        fateCard.map(item => {
                                            return (item.name === fate.cd_hyganjee[1] ?
                                                (
                                                    <View key={item.name}>
                                                        <Animated.View style={[RotateFrontArr[7], { backfaceVisibility: 'hidden' }]}>
                                                            <Image style={styles.uif_card_img} source={require('../assets/FateCard/back.png')} />
                                                        </Animated.View>
                                                        <Animated.View style={[{ position: 'absolute', top: 0 }, { backfaceVisibility: 'hidden' }, RotateBackArr[7]]}>
                                                            <Image style={styles.uif_card_img} source={item.path} />
                                                        </Animated.View>
                                                    </View>
                                                )
                                                : null)
                                        })
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={styles.uif_text_area}>
                                <Text style={styles.uif_text}>{getSixChin(fate.cd_hyganjee[1])}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.ui_attr_list}>
                    <View style={styles.uia_box}>
                        <Text style={styles.uia_text}>木({getAttrCount('목')})</Text>
                    </View>
                    <View style={styles.uia_box}>
                        <Text style={styles.uia_text}>火({getAttrCount('화')})</Text>
                    </View>
                    <View style={styles.uia_box}>
                        <Text style={styles.uia_text}>土({getAttrCount('토')})</Text>
                    </View>
                    <View style={styles.uia_box}>
                        <Text style={styles.uia_text}>金({getAttrCount('금')})</Text>
                    </View>
                    <View style={styles.uia_box}>
                        <Text style={styles.uia_text}>水({getAttrCount('수')})</Text>
                    </View>
                </View>
                <View style={styles.ui_jijang_list}>
                    <View style={styles.uij_box}>
                        <Text style={styles.uij_text}>{fate.hasOwnProperty("time") ? getJijange(fate.time[1]) : "-"}</Text>
                    </View>
                    <View style={styles.uij_box}>
                        <Text style={styles.uij_text}>{getJijange(fate.cd_hdganjee[1])}</Text>
                    </View>
                    <View style={styles.uij_box}>
                        <Text style={styles.uij_text}>{getJijange(fate.cd_hmganjee[1])}</Text>
                    </View>
                    <View style={styles.uij_box}>
                        <Text style={styles.uij_text}>{getJijange(fate.cd_hyganjee[1])}</Text>
                    </View>
                </View>
                <ScrollView horizontal={true} style={styles.ui_bigfate_list}>
                    {
                        bigFateAgeArr.map((item, i) => {
                            return getBigFateList(12 - i)
                        })
                    }
                </ScrollView>
                <ScrollView horizontal={true} style={styles.ui_yearfate_list}>
                    {
                        utils.allYears.map((item) => {
                            if (item.cd_sy >= user.bornDate.year && item.cd_sy < user.bornDate.year + 110) {
                                return getYearFateList(item);
                            }
                        })
                    }
                </ScrollView>
                <ScrollView horizontal={true} style={styles.ui_monthfate_list}>
                    {
                        threeYears.map((item) => {
                            return getMonthFateList(item);
                        })
                    }
                </ScrollView>
                <View style={styles.action_btn_group}>
                    <TouchableOpacity style={styles.ab_btn}
                    // onPress={() => {
                    //     if (user.solar === 1) {
                    //         const solarDate = holidayKR.getSolar(user.bornDate.year, user.bornDate.month, user.bornDate.day);
                    //         const newUser = {
                    //             name: user.name,
                    //             solar: user.solar,
                    //             gender: user.gender,
                    //             job: user.job,
                    //             bornTime: user.bornTime,
                    //             bornDate: {
                    //                 year: solarDate.year,
                    //                 month: solarDate.month,
                    //                 day: solarDate.day
                    //             }
                    //         }
                    //         SocketInstance.getInstance().send('RequestAddUser', newUser);
                    //     }
                    //     else {
                    //         SocketInstance.getInstance().send('RequestAddUser', user);
                    //     }
                    //     SocketInstance.getInstance().send('RequestUserDB', "");
                    //     SocketInstance.getInstance().setResponseUserDBCallback((res) => {
                    //         let newArr = [...userDBArr];
                    //         utils.globalUserDBArr = [];
                    //         res.map(item => {
                    //             if (!userDBArr.includes(item.name)) {
                    //                 newArr.push(item.name)
                    //             } else {
                    //                 newArr.map(naItem => {
                    //                     naItem = item.name
                    //                 })
                    //             }
                    //             utils.globalUserDBArr.push(item.name);
                    //         })
                    //         setUserDBArr(newArr);
                    //     })
                    // }}
                    >
                        <Text style={styles.ab_btn_text}>저장</Text>
                    </TouchableOpacity>
                    {renderRemoveDB()}
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.contents}>
                {


                    usersData.map((item, i) => {
                        let targetDay = new Date(item.bornDate.year, item.bornDate.month - 1, item.bornDate.day);

                        // 자시 처리
                        if (item.bornTime[0] === '子') {
                            if (targetDay.getDate() + 1 > new Date(targetDay.getFullYear(), (targetDay.getMonth() + 1), 0).getDate()) {
                                if (targetDay.getMonth() + 1 === 12)
                                    targetDay = new Date(targetDay.getFullYear() + 1, 0, 1);
                                else
                                    targetDay = new Date(targetDay.getFullYear(), targetDay.getMonth() + 1, 1);
                            }
                            else {
                                targetDay = new Date(targetDay.setDate(targetDay.getDate() + 1))
                            }
                        }

                        // 사주 뽑기
                        const fate = fateDB.fate.filter(fate => fate.cd_sy === targetDay.getFullYear() && fate.cd_sm === (targetDay.getMonth() + 1).toString() && fate.cd_sd === (targetDay.getDate()).toString())[0]
                        utils.fateTimeArr.map(fta => {
                            if (fta.key.includes(fate.cd_hdganjee[0])) {
                                fta.value.map(value => {
                                    if (item.bornTime[0] === value.key)
                                        fate.time = value.fate;
                                })
                            }
                        })

                        // 대운수 뽑기
                        let bigFate;
                        let bigFate_isLinear;
                        let bigFate_startAge = 0;
                        if (item.gender === 0) {
                            utils.hzArr.map(hzItem => {
                                if (hzItem.hz === fate.cd_hyganjee[0]) {
                                    if (hzItem.lightness === 'light')
                                        bigFate_isLinear = true;
                                    else
                                        bigFate_isLinear = false
                                }
                            })
                        }
                        else {
                            utils.hzArr.map(hzItem => {
                                if (hzItem.hz === fate.cd_hyganjee[0]) {
                                    if (hzItem.lightness === 'light')
                                        bigFate_isLinear = false;
                                    else
                                        bigFate_isLinear = true;
                                }
                            })
                        }
                        // 순행
                        if (bigFate_isLinear) {
                            let nextYear = targetDay.getFullYear();
                            let nextMonth = targetDay.getMonth() + 1;
                            if (nextMonth === 12) {
                                nextYear = targetDay.getFullYear() + 1;
                                nextMonth = 0;
                            }
                            bigFate = fateDB.fate.filter(fate => (fate.cd_sy === targetDay.getFullYear() && fate.cd_sm === (targetDay.getMonth() + 1).toString()) || (fate.cd_sy === nextYear && fate.cd_sm === (nextMonth + 1).toString()))

                            bigFate.map(brItem => {
                                if (brItem.cd_hmganjee === fate.cd_hmganjee) {
                                    if (brItem.cd_sm == (targetDay.getMonth() + 1)) {
                                        if (brItem.cd_sd >= targetDay.getDate())
                                            bigFate_startAge++;
                                    }
                                    else
                                        bigFate_startAge++;

                                }
                            })
                            bigFate = { isLinear: true, startAge: (bigFate_startAge / 3) }
                        }
                        else { //역행
                            let prevYear = targetDay.getFullYear();
                            let prevMonth = targetDay.getMonth() - 1;
                            if (prevMonth === -1) {
                                prevYear = targetDay.getFullYear() - 1;
                                prevMonth = 11;
                            }
                            bigFate = fateDB.fate.filter(fate => (fate.cd_sy === targetDay.getFullYear() && fate.cd_sm === (targetDay.getMonth() + 1).toString()) || (fate.cd_sy === prevYear && fate.cd_sm === (prevMonth + 1).toString()))
                            bigFate.map(brItem => {
                                if (brItem.cd_hmganjee === fate.cd_hmganjee) {
                                    if (brItem.cd_sm == (targetDay.getMonth() + 1)) {
                                        if (brItem.cd_sd < targetDay.getDate())
                                            bigFate_startAge++;
                                    }
                                    else
                                        bigFate_startAge++;
                                }

                            })
                            bigFate = { isLinear: false, startAge: (bigFate_startAge / 3) }
                        }
                        return userDataItem(item, fate, bigFate);
                    })
                }
            </ScrollView>
            <DefaultModalPopup text={defaultPopupMessage.current} isVisible={defaultModalPopupVisible} onPressConfirm={() => { setDefaultModalPopupVisible(false); }} />
        </SafeAreaView>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contents: {
        flex: 1,
    },
    user_info_wrap: {
        backgroundColor: '#fff',
        color: '#000',
        alignItems: 'center',
        marginBottom: 5,
    },
    action_btn_group: {
        flexDirection: 'row',
        backgroundColor: '#aaa',
    },
    ab_btn: {
        flex: 1,
        padding: 10,
        borderLeftColor: '#7d7f85',
        borderLeftWidth: 1,
    },
    ab_btn_text: {
        textAlign: 'center',
    },
    ui_header_name: {
        paddingVertical: 10,
        fontSize: 22,
        fontWeight: '600',
    },
    ui_base_group: {
        flexDirection: 'row',
        backgroundColor: '#03c75a',
    },
    uib_box: {
        flex: 1,
        borderLeftWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uib_bornDate_area: {
        borderLeftWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    uib_bornTime: {
        textAlign: 'center',
    },
    ui_fategroup: {
        flexDirection: 'row',
    },
    uif_box: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#555',
        width: '100%',
    },
    uif_text_area: {
        backgroundColor: 'yellow',
        width: '100%',
        borderLeftColor: '#7d7f85',
        borderLeftWidth: 1,
    },
    uif_text: {
        textAlign: 'center',
        fontWeight: '600',
        paddingVertical: 3,
    },
    uif_card_area: {
        flex: 1,
    },
    uif_btn_card: {
        marginVertical: 5,
    },
    uif_card_img: {
        width: 93,
        height: 150.
    },
    ui_attr_list: {
        flexDirection: 'row',
    },
    uia_box: {
        flex: 1,
        borderLeftColor: '#7d7f85',
        borderLeftWidth: 1,
        borderTopColor: '#7d7f85',
        borderTopWidth: 1,
        borderBottomColor: '#7d7f85',
        borderBottomWidth: 1,
        paddingVertical: 3,
    },
    uia_text: {
        textAlign: 'center',
    },
    ui_jijang_list: {
        flexDirection: 'row',
    },
    uij_box: {
        flex: 1,
        borderLeftColor: '#7d7f85',
        borderLeftWidth: 1,
        borderBottomColor: '#7d7f85',
        borderBottomWidth: 1,
        paddingVertical: 3,
    },
    uij_text: {
        textAlign: 'center',
    },
    ui_bigfate_list: {
        backgroundColor: '#ddd',
    },
    uibf_box: {
        borderLeftColor: '#7d7f85',
        borderLeftWidth: 1,
    },
    uibf_age: {
        paddingHorizontal: 10,
        borderBottomColor: '#7d7f85',
        borderBottomWidth: 1,
    },
    uibf_hz_box: {
        borderLeftColor: '#7d7f85',
        borderLeftWidth: 1,
        borderBottomColor: '#7d7f85',
        borderBottomWidth: 1,
        padding: 5,
    },
    uibf_hz_text: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 15,
    },
    ui_yearfate_list: {
        backgroundColor: '#bbb',
    },
    uiyf_box: {
        borderLeftColor: '#7d7f85',
        borderLeftWidth: 1,
    },
    uiyf_age: {
        paddingHorizontal: 10,

        borderBottomColor: '#7d7f85',
        borderBottomWidth: 1,
    },
    uiyf_age_text: {
        textAlign: 'center',
    },
    uiyf_hz_box: {
        borderLeftColor: '#7d7f85',
        borderLeftWidth: 1,
        borderBottomColor: '#7d7f85',
        borderBottomWidth: 1,
        padding: 5,
    },
    uiyf_hz_text: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 15,
    },
    ui_monthfate_list: {
        backgroundColor: '#999',
    },
    uimf_box: {
        borderLeftColor: '#7d7f85',
        borderLeftWidth: 1,
    },
    uimf_age: {
        paddingHorizontal: 10,

        borderBottomColor: '#7d7f85',
        borderBottomWidth: 1,
    },
    uimf_age_text: {
        textAlign: 'center',
    },
    uimf_hz_box: {
        borderLeftColor: '#7d7f85',
        borderLeftWidth: 1,
        borderBottomColor: '#7d7f85',
        borderBottomWidth: 1,
        padding: 5,
    },
    uimf_hz_text: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 15,
    },
});
export default FateResultScreen;


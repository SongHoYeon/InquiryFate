import React from 'react';
import { BannerAd, BannerAdSize, TestIds  } from '@react-native-firebase/admob';

const adUnitId =
Platform.OS === 'ios'
? 'ca-app-pub-5944513374071873/5575844204'
: 'ca-app-pub-5944513374071873/6451867639';


export const BottomBannerAd = () => (
    <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.BANNER}
        requestOptions={{
            requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
            console.log('Advert loaded');
        }}
        onAdFailedToLoad={(error) => {
            console.error('Advert failed to load: ', error);
            console.log('Ad failed to load', arguments)
        }}
    />
)
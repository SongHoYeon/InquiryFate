import { Store } from '../components/Store';
import { Layout } from '../interfaces/Layout';
import { UniqueIdProvider } from 'react-native-navigation/adapters/UniqueIdProvider';
export declare class OptionsCrawler {
    readonly store: Store;
    readonly uniqueIdProvider: UniqueIdProvider;
    constructor(store: Store, uniqueIdProvider: UniqueIdProvider);
    crawl(api?: Layout): void;
    private topTabs;
    private sideMenu;
    private bottomTabs;
    private stack;
    private splitView;
    private component;
    private applyComponentId;
    private isComponentWithOptions;
    private applyStaticOptions;
    private staticOptionsIfPossible;
}

import React from 'react';
import { FlatListProps, ListRenderItem, StyleProp, ViewStyle } from 'react-native';

export interface InfiniteScrollProps<T> extends FlatListProps<T> {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  loadMore: () => Promise<void>;
  hasMore: boolean;
  loaderComponent?: React.ReactNode;
  listEmptyComponent?: React.ReactNode;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  error?: string | null;
  errorComponent?: React.ReactNode;
}
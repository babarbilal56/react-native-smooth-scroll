import React, { useState, useCallback } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet, RefreshControl, Text } from 'react-native';

const InfiniteScroll = ({
  data,
  renderItem,
  keyExtractor,
  loadMore,
  hasMore,
  loaderComponent = <ActivityIndicator size="small" color="#0000ff" />,
  listEmptyComponent = null,
  onRefresh,
  isRefreshing = false,
  error = null,
  errorComponent = <Text style={styles.errorText}>Something went wrong. Please try again.</Text>,
  ...flatListProps
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = useCallback(async () => {
    if (!isLoading && hasMore && !error) {
      setIsLoading(true);
      await loadMore();
      setIsLoading(false);
    }
  }, [isLoading, hasMore, loadMore, error]);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isLoading ? loaderComponent : error ? errorComponent : null
      }
      ListEmptyComponent={listEmptyComponent}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      {...flatListProps}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    marginVertical: 20,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginVertical: 20,
  },
});

export default InfiniteScroll;
<View className="box-view  bg-slate-800 pl-5  pr-4 pt-5  border-blue-800 rounded-xl gap-[5px]  pb-4 mt-5">
  <View className="text-view gap-2">
    <View className="flex-row justify-between items-center">
      <Text className="text-blue-300 font-semi text-[21px]">
        I'm Working On:
      </Text>
      <MaterialCommunityIcons name="arrow-up-down" size={20} color="gray" />
    </View>

    <View className="h-[90px] ">
      <Animated.FlatList
        ref={scrollViewRef} // Attach the FlatList reference
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        data={challenges}
        keyExtractor={(item) => String(item.text)}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 5 }}
        scrollEventThrottle={10}
        decelerationRate={0.2}
        getItemLayout={(data, index) => ({
          length: ITEM_SIZE,
          offset: ITEM_SIZE * index,
          index,
        })}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const opacityRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 0.5),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: opacityRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={{
                transform: [{ scale }],
                opacity,
              }}
            >
              <View
                className="bg-blue-400 rounded-xl gap-3 p-[15px] mt-[8.3px] "
                style={{}}
              >
                <View className="flex-row justify-between ">
                  <Text className="text-[16px] font-semibold">{item.text}</Text>
                </View>

                <Text className="font-semibold opacity-[0.6px]">
                  {item.descr}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
    <TouchableOpacity onPress={() => router.push("/tabs/home/strategies")}>
      <Text className="text-center text-white font-semibold text-md bg-slate-700 rounded-lg p-5">
        SEE ALL
      </Text>
    </TouchableOpacity>
  </View>
</View>;





        <View className="flex-wrap flex-row gap-4 ">
          <TouchableOpacity
            className="bg-yellow-100 rounded-md h-[100px]  flex-col gap-4 pl-3  pt-[12px] flex-[0.7]  "
            onPress={() => router.push("/tabs/home/challenges")}
          >
            <Ionicons
              name="journal"
              size={30}
              color="rgba(0, 0, 0, 1)"
              style={{ opacity: 0.6 }}
            />
            <Text className="text-slate-800 font-bold text-[16px] opacity-[0.9] mt-3">
              Challenges
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-teal-300 rounded-md h-[100px]  flex-col gap-4 pl-3 pt-[12px]  flex-[0.3]"
            onPress={() => router.push("/tabs/train")}
          >
            <Ionicons
              name="tennisball"
              size={30}
              color="rgba(0, 0, 0, 0.9)"
              style={{ opacity: 0.6 }}
            />
            <Text className="text-slate-800 font-bold text-[16px]  mt-3 opacity-[0.9]">
              See All
            </Text>
          </TouchableOpacity>
        </View>;
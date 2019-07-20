<template>
  <div class="app">
    <div class="app__content">
      <div :class="'info ' + (isOpen ? 'is-open': '')" @click="isOpen =! isOpen">
        <div class="info__block">
          <p class="info__text">
            <span class="info__text-span info__text-span_h">Market Cap</span>
            <span class="info__text-span info__text-span_num">$287.66B</span>
          </p>
          <p class="info__text">
            <span class="info__text-span info__text-span_h">Exchange Vol</span>
            <span class="info__text-span info__text-span_num">$19.41B</span>
          </p>
          <p class="info__text">
            <span class="info__text-span info__text-span_h">Assets</span>
            <span class="info__text-span info__text-span_num">1,515</span>
          </p>
        </div>
        <div class="info__block">
          <p class="info__text">
            <span class="info__text-span info__text-span_h">Exchanges</span>
            <span class="info__text-span info__text-span_num">71</span>
          </p>
          <p class="info__text">
            <span class="info__text-span info__text-span_h">Markets</span>
            <span class="info__text-span info__text-span_num">6,290</span>
          </p>
          <p class="info__text">
            <span class="info__text-span info__text-span_h info__text-span_border">BTC Dom Index</span>
            <span class="info__text-span info__text-span_num info__text-span_border">66.2%</span>
          </p>
        </div>
      </div>
      <table 
      class="table" 
      @mouseenter="isHover = true" 
      @mouseleave="isHover = false">
        <tr class="table__header">
          <th class="table__header-column table__header-column_rank">Rank</th>
          <th class="table__header-column table__header-column_name">Name</th>
          <th class="table__header-column table__header-column_price">Price</th>
          <th class="table__header-column table__header-column_marcet-cap">Marcet Cap</th>
          <th class="table__header-column table__header-column_vwap">VWAP (24Hr)</th>
          <th class="table__header-column table__header-column_supply">Supply</th>
          <th class="table__header-column table__header-column_volume">Volume (24Hr)</th>
          <th class="table__header-column table__header-column_change">Change (24Hr)</th>
        </tr>
        <tr 
        :class="'table__data ' + item.update" 
        v-for="(item, i) in $store.state.data" 
        v-bind:key="i">
          <td class="table__column table__column_rank">{{item.rank}}</td>
          <td class="table__column table__column_name">{{item.name}}</td>
          <td class="table__column table__column_price">{{parseNum(item.priceUsd)}}</td>
          <td class="table__column table__column_marcet-cap">{{parseNum(item.marketCapUsd)}}</td>
          <td class="table__column table__column_vwap">{{parseNum(item.vwap24Hr)}}</td>
          <td class="table__column table__column_supply">{{parseNum(item.supply)}}</td>
          <td class="table__column table__column_volume">{{parseNum(item.volumeUsd24Hr)}}</td>
          <td :class="'table__column table__column_change ' + (parseNum2(item.changePercent24Hr) > 0 ? 'is-up' : 'is-down')">{{parseNum2(item.changePercent24Hr) + '%'}}</td>
        </tr>
      </table>
      <div :class="isHover ? 'is-none' : 'scroll'" :style="isTouch ? 'display: none;' : ''"></div>
      <div :class="'button-get ' + (isLoad ? 'is-load' : '')" @click="add"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      limit: 15,
      isLoad: false,
      isHover: false,
      isTouch: false,
      isOpen: false
    }
  },
  methods: {
    parseNum(num) {
      if(num === null) return '-';
      if(num > 999999 && num < 999999999) return '$' + (num / 1000000).toFixed(2) + 'm';
      if(num > 999999999 && num < 999999999999) return '$' + (num / 1000000000).toFixed(2) + 'b';
      if(num < 1) return '$' + parseFloat(num).toFixed(8);
      if(num > 1) return '$' + parseFloat(num).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return '$' + num;
    },
    parseNum2(num) {
      if(num === null) return 'N';
      return parseFloat(num).toFixed(2);
    },
    add() {
      this.limit+=100;
      this.isLoad = true;
      axios.get(`https://api.coincap.io/v2/assets?limit=${this.limit}&offset=${this.limit-100}`, {})
      .then((response) => {
        this.$store.commit('addInfo', response.data.data);
        this.isLoad = false;
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
  created() {
    this.isTouch = 'ontouchstart' in document.documentElement;
    axios.get('https://api.coincap.io/v2/assets?limit=15', {})
    .then((response) => {
      this.$store.commit('setInfo', response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
</script>

<style lang="scss">
  .app {
    height: calc(100% - 60px);
    overflow-y: scroll;
  }

  .app__content {
    display: flex;
    flex-direction: column;
  }
</style>
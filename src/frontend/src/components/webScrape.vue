<template>
  <form action="/" method="post" v-on:submit.prevent="scrape">
    <table style="margin: auto;">
      <tr>
        <td>
          <label for="filter-method"> Scrape berdasarkan: </label>
        </td>
        <td>
          <label for="url"> Situs yang ingin di-<i>scrape</i> </label>
        </td>
        <td>
          <label for="filter"> tag/id/class yang ingin dijadikan filter: (pisahkan dgn koma)</label>
        </td>
      </tr>
      <tr>
        <td>
          <div class="select" style="width:inherit;">
            <select id="filter-method" v-model="filterMethod">
              <option
              v-bind:value="index"
              v-for="(option, index) in possibleFilterMethod"
              v-bind:key="index">
                {{ option }}
              </option>
              <option>Select Dropdown</option>
            </select>
          </div>
        </td>
        <td>
          <input type="text" class="input" style="width:100%;opacity=100%" placeholder="URL" id="url" v-model="url"/>
        </td>
        <td>
          <div class ="field">
            <input type="text" class="input" style="width:85%;opacity=100%" placeholder="Filter" id="filter" v-model="filter" />
            <button type="scrape">
              <span class="icon is-medium">
                <i class ="fas fa-search"></i>
              </span>
            </button>
          </div>
        </td>
      </tr>
    </table>
  </form>

  <div v-if="isScraped" style="margin 20px 50px 0px 50px; content-align:justify;">
    {{ scrapeRes }}
  </div>
</template>

<script>
export default {
  name: 'webScrape',
  data() {
    return {
      isScraped: false,
      scrapeRes: '',

      url: 'https://www.urbandictionary.com/define.php?term=Bruh',
      filter: 'meaning, def-header',
      filterMethod: 'class',

      possibleFilterMethod: {
        tag: 'tag',
        class: 'class',
        id: 'id',
      },
    };
  },

  methods: {
    async scrape() {
      console.log('aku mau mati');
      this.scrapeRes = '';

      const axios = require('axios');
      this.isScraped = false;

      try {
        const reqBody = {
          url: this.url,
          filter: this.filter,
          filterMethod: this.filterMethod,
        };
        console.log(reqBody);
        const body = await axios.post('http://localhost:42069/scraper', reqBody );

        this.scrapeRes = body.data;

        // console.log(this.scrapeRes);
        this.isScraped = true;
      } catch(e) {
        console.error(e);
      }
    }
  }
}
</script>

<style scoped>
td {
  padding: 0px 50px;
}

/* td input {
  width: 100% !important;
} */
/* .input{
  opacity: 70%;
} */
/* .select{
  opacity: 70%;
} */
</style>

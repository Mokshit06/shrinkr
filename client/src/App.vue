<template>
  <div id="app">
    <NotFound v-if="params" />
    <div v-else>
      <Header @add-url="addUrl" />
      <LinkList :data="linksData" @delete-url="deleteUrl" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./components/Header";
import LinkList from "./components/LinkList";
import NotFound from "./components/NotFound";

export default {
  name: "App",
  data() {
    return {
      linksData: [],
    };
  },
  components: {
    Header,
    LinkList,
    NotFound,
  },
  methods: {
    async fetchUrlData() {
      this.linksData = localStorage.getItem("hashes")
        ? JSON.parse(localStorage.getItem("hashes"))
        : [];
    },
    async addUrl(newUrl) {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const { data } = await axios.post("api/", newUrl, headers);

        this.linksData.push(data);

        localStorage.setItem("hashes", JSON.stringify(this.linksData));
      } catch (error) {
        console.error(error);
      }
    },
    async deleteUrl(urlID) {
      try {
        await axios.delete(`api/${urlID}`);

        this.linksData = this.linksData.filter((link) => link.urlID !== urlID);

        localStorage.setItem("hashes", JSON.stringify(this.linksData));
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    params() {
      const param = location.pathname.replace("/", "");
      return param;
    },
  },
  created() {
    this.fetchUrlData();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  height: 100%;
}

body {
  background-color: #1a1e22;
}
</style>

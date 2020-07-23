<template>
  <LinkItemWrapper>
    <Urls>
      <ShortURL :href="link.shortUrl">{{
        link.shortUrl | removeHTTP
      }}</ShortURL>
      <LongURL>{{ link.fullUrl }}</LongURL>
    </Urls>
    <EditRow>
      <button class="del" @click="$emit('delete-url', link.urlID)">
        Delete
      </button>
      <div class="copy">
        <button @click="copyUrl(link.shortUrl)" @focusout="showToolTip = false">
          Copy
        </button>
        <ToolTip v-if="showToolTip">Copied to clipboard!</ToolTip>
      </div>
      <div class="scan">
        <button @click="toggleQrCode" @focusout="isHidden = true">
          Scan
        </button>
        <QRCodeImg v-if="!isHidden" :src="QrCodeSrc" />
      </div>
    </EditRow>
  </LinkItemWrapper>
</template>

<script>
import styled from "vue-styled-components";
import QRCode from "qrcode";

const LinkItemWrapper = styled.div`
  background-color: #1d2227;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 4px;
  box-shadow: #0003 0px 10px 30px -15px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  justify-content: space-between;
`;

const Urls = styled.div`
  padding: 1.6em 2em 0;

  & a {
    text-decoration: none;
  }
`;

const ShortURL = styled.a`
  color: #eef5ff;
  font-size: 1.1em;
  display: flex;
  width: fit-content;
  align-items: center;
  margin-bottom: 0.3rem;
`;

const LongURL = styled.p`
  color: #586069;
  margin-bottom: 1.8em;
  display: block;
  width: fit-content;
`;

const EditRow = styled.div`
  display: flex;

  & button {
    width: 100%;
    border: none;
    border-radius: 0px;
    padding: 10px 0;
    color: #f8f8f8;
    cursor: pointer;
    outline: none;
  }

  & .del {
    background-color: #d8687c;
    border-radius: 0 0 0 4px !important;
  }

  & .copy {
    width: 100%;
    display: flex;
    justify-content: center;

    & button {
      background-color: #1c87ca;
    }
  }

  & .scan {
    width: 100%;
    display: flex;
    justify-content: center;

    & button {
      border-radius: 0 0 4px 0 !important;
      background-color: #2a3138;
    }
  }
`;

const QRCodeImg = styled.img`
  position: absolute;
  z-index: 10;
  width: 100px;
  height: 100px;
  margin-top: 3rem;
  background-color: #efefef;
  border-radius: 4px;
`;

const ToolTip = styled.p`
  position: absolute;
  z-index: 10;
  font-size: 0.9rem;
  margin-top: 3rem;
  background-color: #4c69fa;
  padding: 6px 10px;
  border-radius: 2px;
  color: #f8f8f8;
  width: unset;
  font-size: 0.9rem;

  &::before {
    content: " ";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #4c69fa transparent;
  }
`;

export default {
  name: "LinkItem",
  data() {
    return {
      isHidden: true,
      showToolTip: false,
      QrCodeSrc: "",
    };
  },
  components: {
    LinkItemWrapper,
    Urls,
    ShortURL,
    LongURL,
    EditRow,
    QRCodeImg,
    ToolTip,
  },
  props: {
    link: Object,
  },
  methods: {
    async copyUrl(shortUrl) {
      await navigator.clipboard.writeText(shortUrl);
      this.showToolTip = !this.showToolTip;
      setTimeout(() => {
        this.showToolTip = false;
      }, 2000);
    },
    async scanUrl() {
      const codeData = await QRCode.toDataURL(this.link.shortUrl);
      console.log(codeData);
      this.QrCodeSrc = codeData;
    },
    toggleQrCode() {
      this.isHidden = !this.isHidden;
    },
  },
  filters: {
    removeHTTP(url) {
      return url.replace(/(http:\/\/|https:\/\/)/, "");
    },
  },
  created() {
    this.scanUrl();
  },
};
</script>

<style>
</style>\z
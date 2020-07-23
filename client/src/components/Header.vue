<template>
  <HeadWrapper>
    <Heading>Shrinkr</Heading>
    <InputArea>
      <LabelArea>
        <span>Type in or paste the address to shorten:</span>
        <input
          @keyup.enter="addLink"
          v-model="url"
          type="text"
          placeholder="http://www.example.com"
        />
      </LabelArea>
      <transition
        name="error"
        enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
      >
        <Error v-if="error">{{ error }}</Error>
      </transition>
    </InputArea>
    <Info>Press enter to create link</Info>
  </HeadWrapper>
</template>

<script>
import styled from "vue-styled-components";
import { isURL } from "validator";

const HeadWrapper = styled.div`
  font-family: "Montserrat", sans-serif;
  background-color: #21262a;
  padding: 5vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Heading = styled.h1`
  color: #cdd5ff;
  font-size: 3.5rem;
  font-weight: 600;
  letter-spacing: 1px;
  margin: 0.7rem;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelArea = styled.label`
  display: flex;
  flex-direction: column;

  & input {
    padding: 1.08rem 1.28rem;
    font-size: 1.2rem;
    border-radius: 4px;
    color: #94a6ff;
    background-color: #292f35;
    border: none;
    outline: none;

    &::placeholder {
      color: #626da3;
    }
  }

  & span {
    font-weight: 400;
    color: #c8e1ff;
    font-size: 1.3rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    margin: 1rem;
  }
`;

const Info = styled.p`
  font-weight: 300;
  color: #c8e1ff;
  font-size: 1.12rem;
  letter-spacing: 0.6px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 0.9rem;
`;

const Error = styled.p`
  background-color: #4c69fa;
  margin: 0.6rem 0.1rem;
  padding: 6px 10px;
  border-radius: 2px;
  color: #f8f8f8;
  width: unset;
  font-size: 0.9rem;
`;

export default {
  name: "Header",
  data() {
    return {
      url: "",
      error: null,
    };
  },
  components: {
    HeadWrapper,
    Heading,
    InputArea,
    Info,
    LabelArea,
    Error,
  },
  methods: {
    addLink() {
      const fullUrl = this.url;
      if (isURL(fullUrl)) {
        this.$emit("add-url", { fullUrl });
        this.url = "";
        this.error = null;
      } else {
        this.error = "Please enter a valid URL";
      }
    },
  },
};
</script>

<style>
</style>
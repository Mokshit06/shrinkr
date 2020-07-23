<template>
  <NotFoundWrapper>
    <Heading>Shrinkr</Heading>
    <div>
      <Error>Something's wrong here.</Error>
      <ErrorText
        >The page you are looking for does not exist. Maybe what you wanted can
        be found at <a href="/">Shrinkr</a></ErrorText
      >
    </div>
  </NotFoundWrapper>
</template>

<script>
import styled from "vue-styled-components";

const NotFoundWrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  color: #f8f8f8;
`;

const Heading = styled.h1`
  width: 100%;
  font-size: 3.7rem;
  color: #cdd5ff;
  height: 33vh;
  background-color: #21262a;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 1.4rem;
`;

const Error = styled.h1`
  margin-top: 10vh;
  font-size: 3.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ErrorText = styled.p`
  font-size: 1.25rem;
  line-height: 28px;
  color: #c8e1ff;

  & a {
    color: #cdd5ff;
  }
`;

export default {
  name: "NotFound",
  components: {
    NotFoundWrapper,
    Heading,
    Error,
    ErrorText,
  },
};
</script>

<style>
</style>
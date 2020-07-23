<template>
  <div>
    <NoUrl v-if="data.length < 1">No short links created yet</NoUrl>
    <LinksWrapper v-else>
      <transition-group
        name="new-link"
        enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
      >
        <div v-for="link in data" :key="link._id">
          <LinkItem
            :link="link"
            @delete-url="$emit('delete-url', link.urlID)"
          />
        </div>
      </transition-group>
    </LinksWrapper>
  </div>
</template>

<script>
import styled from "vue-styled-components";
import LinkItem from "./LinkItem";

const LinksWrapper = styled.div`
  & span {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    gap: 1rem;
    margin: 3vh 3rem;
  }
`;

const NoUrl = styled.h2`
  color: #94a6ff;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  text-align: center;
  font-size: 1.6em;
  margin: 4rem;
`;

export default {
  name: "LinkList",
  components: {
    LinksWrapper,
    LinkItem,
    NoUrl,
  },
  props: {
    data: Array,
  },
};
</script>

<style>
</style>
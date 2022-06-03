<template>
  <transition-group tag="ul" name="list" class="render">
    <div
      v-for="item in items"
      :key="item.id"
      class="render__card"
      :class="{hidden: isHidden}"
    >
      <img :src="`${item.link}`" alt="photo" class="render__img">
      <div class="render__card-content">
        <h4 class="render__title">
          {{ item.title }}
        </h4>
        <p class="render__description">
          {{ item.description }}
        </p>
        <h3 class="render__price">
          {{ item.price }} руб.
        </h3>
      </div>
      <button class="render__card-delete" @click="deleteCard(item)">
        <IconDelete />
      </button>
    </div>
  </transition-group>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NuxtRender',
  data () {
    return {
      isHidden: true
    }
  },
  computed: {
    ...mapGetters({
      items: 'items/GET_ITEMS'
    })
  },
  mounted () {
    this.$store.dispatch('items/FETCH_ITEMS')
    if (this.items.length > 0) {
      this.isHidden = false
    }
  },
  updated () {
    if (this.items.length > 0) {
      this.isHidden = false
    } else {
      this.isHidden = true
    }
  },
  methods: {
    deleteCard (item) {
      this.$store.commit('items/REMOVE_ITEM', item)
      sessionStorage.setItem('items', JSON.stringify(this.items))
    }
  }
}
</script>

<style lang="scss" scoped>
.render {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  max-height: 100vh;
  margin-left: 348px;
  list-style: none;
  transition: .3s ease-in-out;

  &__card {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0 0 24px;
    border: none;
    border-radius: 4px;
    background-color: $white;
    opacity: 1;
    transform: scale(1);
    transition: .3s ease-in-out;
  }
  &__card.hidden {
    opacity: 0;
    transform: scale(0);
  }

  &__img {
    width: 100%;
    height: auto;
    margin-bottom: 16px;
    border-radius: 4px 4px 0 0;
  }

  &__card-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 16px;
  }

  &__title {
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
  }

  &__description {
    margin-bottom: 32px;
  }

  &__price {
    margin-top: auto;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
  }

  &__card-delete {
    position: absolute;
    top: -8px;
    right: -8px;
    z-index: 1;
    display: flex;
    border: none;
    background-color: transparent;
    opacity: 0;
    transition: .15s ease-in;
    cursor: pointer;
  }

  // focus & active states
  &__card-delete:focus {
    opacity: 1;
    outline: none;
  }
  &__card-delete:active {
    transform: scale(0.8);
  }
}

.list-enter-active,
.list-leave-active {
  transition: .3s ease-in-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0);
}

@media (hover: hover) {
  .render {
    &__card:hover &__card-delete {
      opacity: 1;
    }

    &__card-delete:hover {
      transform: scale(1.2);
    }
    &__card-delete:active {
      transform: scale(0.8);
    }
  }
}

@media (max-width: 1024px) {
  .render {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-left: 236px;
  }
}

@media (max-width: 768px) {
  .render {
    grid-template-columns: repeat(1, 1fr);
    gap: 8px;
    margin-left: 222px;

    &__card-content {
      padding: 0 12px;
    }

    &__title {
      margin-bottom: 8px;
      font-size: 18px;
      line-height: 22px;
    }

    &__description {
      margin-bottom: 16px;
      font-size: 14px;
      line-height: 17px;
    }

    &__price {
      font-size: 20px;
      line-height: 24px;
    }
  }
}
</style>

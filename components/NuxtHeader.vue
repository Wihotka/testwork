<template>
  <header class="header">
    <h2 class="header__heading">
      Добавление товара
    </h2>
    <div class="header__dropdown-container">
      <div tabindex="0" class="header__dropdown" @click="toggleDropdown">
        <span>{{ defaultOption }}</span>
        <div class="header__arrow" />
      </div>
      <ul class="header__dropdown-list" :class="{open: isDropdownOpen}">
        <li class="header__dropdown-item" @click="sortMin(options.min)">
          {{ options.min }}
        </li>
        <li class="header__dropdown-item" @click="sortMax(options.max)">
          {{ options.max }}
        </li>
        <li class="header__dropdown-item" @click="sortName(options.name)">
          {{ options.name }}
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NuxtHeader',
  data () {
    return {
      isDropdownOpen: false,
      defaultOption: 'По умолчанию',
      options: {
        min: 'По цене (по возрастанию)',
        max: 'По цене (по убыванию)',
        name: 'По наименованию'
      }
    }
  },
  computed: {
    ...mapGetters({
      items: 'items/GET_ITEMS'
    })
  },
  beforeMount () {
    window.addEventListener('click', this.closeDropdown)
  },
  beforeDestroy () {
    window.removeEventListener('click', this.closeDropdown)
  },
  methods: {
    toggleDropdown () {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    sortName (option) {
      this.isDropdownOpen = false
      this.defaultOption = option
      this.$store.commit('items/SORT_NAME_ITEMS', this.items)
    },
    sortMin (option) {
      this.isDropdownOpen = false
      this.defaultOption = option
      this.$store.commit('items/SORT_MIN_ITEMS', this.items)
    },
    sortMax (option) {
      this.isDropdownOpen = false
      this.defaultOption = option
      this.$store.commit('items/SORT_MAX_ITEMS', this.items)
    },
    closeDropdown (e) {
      if (this.isDropdownOpen) {
        const dropdownContainer = this.$el.children[1]
        if (!dropdownContainer.contains(e.target)) {
          this.isDropdownOpen = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  height: 83px;

  &__heading {
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
  }

  &__dropdown-container {
    position: relative;
    width: 180px;
    margin-left: auto;
    color: $grey;
    font-size: 12px;
    line-height: 15px;
  }

  &__dropdown {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    border: none;
    border-radius: 4px;
    background-color: $white;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    transition: box-shadow .15s ease-in;
    cursor: pointer;
  }

  &__arrow {
    width: 5px;
    height: 5px;
    margin-left: auto;
    border: 1px solid $grey;
    border-top: none;
    border-left: none;
    transform: rotateZ(45deg);
  }

  &__dropdown-list {
    position: absolute;
    top: 32px;
    z-index: 1;
    width: 100%;
    border-radius: 0 0 4px 4px;
    background-color: $white;
    visibility: hidden;
    list-style: none;
    transform-origin: top;
    transform: scaleY(0);
    transition: .15s ease-in;
  }
  &__dropdown-list.open {
    visibility: visible;
    transform: scaleY(1);
  }

  &__dropdown-item {
    padding: 8px 16px;
    transition: .15s ease-in;
    cursor: pointer;
  }

  // focus & active states
  &__dropdown:focus {
    outline: 1px solid $pink;
  }
}

@media (hover: hover) {
  .header {
    &__dropdown:hover {
      box-shadow: 0px 2px 5px $pink;
    }

    &__dropdown-item:hover {
      background-color: $greyLight;
    }
  }
}

@media (max-width: 768px) {
  .header {
    &__heading {
      font-size: 24px;
      line-height: 30px;
    }
  }
}
</style>

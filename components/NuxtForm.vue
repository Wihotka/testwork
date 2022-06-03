<template>
  <form action="/" class="form" :class="{scrolled: isScrolled}" @submit.prevent="submitHandler">
    <div class="form__input-container">
      <label for="form-name" class="form__label">Наименование товара<IconLabel class="form__icon" /></label>
      <input
        id="form-name"
        v-model="name.value"
        type="text"
        placeholder="Введите наименование товара"
        class="form__input"
        :class="{error: name.error}"
        @input="inputHandler(name)"
        @click="clickHandler(name)"
        @blur="blurHandler(name)"
      >
      <p v-show="name.error" class="form__input-error">
        Поле является обязательным
      </p>
    </div>
    <div class="form__input-container">
      <label for="form-description" class="form__label">Описание товара</label>
      <textarea
        id="form-description"
        v-model="description"
        placeholder="Введите описание товара"
        class="form__textarea"
      />
    </div>
    <div class="form__input-container">
      <label for="form-link" class="form__label">Ссылка на изображение товара<IconLabel class="form__icon" /></label>
      <input
        id="form-link"
        v-model="link.value"
        type="text"
        placeholder="Введите ссылку"
        class="form__input"
        :class="{error: link.error}"
        @input="inputHandler(link)"
        @click="clickHandler(link)"
        @blur="blurHandler(link)"
      >
      <p v-show="link.error" class="form__input-error">
        Поле является обязательным
      </p>
    </div>
    <div class="form__input-container">
      <label for="form-price" class="form__label">Цена товара<IconLabel class="form__icon" /></label>
      <input
        id="form-price"
        v-model="price.value"
        type="text"
        placeholder="Введите цену"
        class="form__input"
        :class="{error: price.error}"
        @input="priceMask(price)"
        @click="clickHandler(price)"
        @blur="blurHandler(price)"
      >
      <p v-show="price.error" class="form__input-error">
        Поле является обязательным
      </p>
    </div>
    <button :disabled="!(name.value && link.value && price.value)" class="form__submit-btn" @submit.prevent="submitHandler">
      Добавить товар
    </button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
// Unique ID generator
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'NuxtForm',
  data () {
    return {
      isScrolled: false,
      name: {
        value: '',
        touched: false,
        error: false
      },
      link: {
        value: '',
        touched: false,
        error: ''
      },
      price: {
        value: '',
        touched: false,
        error: ''
      },
      description: ''
    }
  },
  computed: {
    ...mapGetters({
      items: 'items/GET_ITEMS'
    })
  },
  beforeMount () {
    window.addEventListener('wheel', this.scrollDown)
  },
  beforeDestroy () {
    window.removeEventListener('wheel', this.scrollDown)
  },
  methods: {
    scrollDown () {
      if (window.scrollY > 59) { this.isScrolled = true } else { this.isScrolled = false }
    },
    setDefaultValues (input) {
      input.value = ''
      input.touched = false
      input.error = false
    },
    submitHandler () {
      this.$store.commit('items/ADD_ITEM', {
        id: uuidv4(),
        title: this.name.value,
        price: this.price.value,
        description: this.description,
        link: this.link.value
      })

      sessionStorage.setItem('items', JSON.stringify(this.items))

      this.setDefaultValues(this.name)
      this.setDefaultValues(this.link)
      this.setDefaultValues(this.price)
      this.description = ''
    },
    inputHandler (input) {
      if (!input.touched) {
        input.touched = true
      }
    },
    clickHandler (input) {
      if (!input.touched) {
        input.touched = true
      }
    },
    blurHandler (input) {
      if (input.touched && !input.value) {
        input.error = true
      }
      if (input.value) {
        input.error = false
      }
    },
    priceMask (input) {
      if (!input.touched) {
        input.touched = true
      }
      if (this.price.value.substring(0) === '0') {
        this.price.value = ''
      }
      if (this.price.value.length > 7) {
        this.price.value = this.price.value.substring(0, 7)
      }
      this.price.value = this.price.value
        .replace(/[^\dA-Z]/g, '')
        .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ')
        .trim()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/fonts.scss';

.form {
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  min-width: 332px;
  height: fit-content;
  padding: 24px;
  border: none;
  border-radius: 4px;
  color: $dark;
  background-color: $white;
  font-size: 12px;
  line-height: 15px;

  &__input-container {
    position: relative;
    width: 100%;
  }

  &__label {
    display: block;
    margin-bottom: 4px;
    font-size: 10px;
    line-height: 12px;
  }

  &__icon {
    margin-bottom: 6px;
  }

  &__input {
    width: 100%;
    margin-bottom: 16px;
    padding: 10px 16px;
    border: 1px solid $white;
    border-radius: 4px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    transition: .15s ease-in;
  }
  &__input::placeholder {
    color: $grey;
  }
  &__input:last-child {
    margin-bottom: 0;
  }
  &__input.error {
    border-color: $pink;
  }

  &__input-error {
    position: absolute;
    bottom: 2px;
    color: $pink;
    font-size: 8px;
    line-height: 10px;
    transition: .15s ease-in;
  }

  &__textarea {
    width: 100%;
    min-height: 108px;
    margin-bottom: 16px;
    padding: 10px 16px;
    border: 1px solid $white;
    border-radius: 4px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    resize: none;
    transition: box-shadow .15s ease-in;
  }
  &__textarea::placeholder {
    color: $grey;
  }

  &__submit-btn {
    width: 100%;
    padding: 10px;
    border: 1px solid $green;
    border-radius: 10px;
    color: $white;
    background-color: $green;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    transition: .15s ease-in;
    cursor: pointer;
  }
  &__submit-btn:disabled {
    border-color: $greyLight;
    color: $grey;
    background-color: $greyLight;
    cursor: auto;
  }

  // focus & active states
  &__input:focus,
  &__textarea:focus {
    border-color: $grey;
    outline: none;
  }
  &__input.error:focus {
    border-color: $pink;
  }

  &__submit-btn:focus {
    outline: 1px solid $black;
  }
  &__submit-btn:active {
    background-color: $greenLight;
  }
}
.form.scrolled {
  position: fixed;
  top: 24px;
}

@media (hover: hover) {
  .form {
    &__input:hover,
    &__textarea:hover {
      box-shadow: 0px 2px 5px $pink;
    }

    &__submit-btn:disabled:hover {
      background-color: $greyLight;
    }
    &__submit-btn:active {
      background-color: $greenLight;
    }
  }
}

@media (max-width: 1024px) {
  .form {
    min-width: 224px;

    &__input,
    &__textarea {
      font-size: 10px;
      line-height: 12px;
    }
    &__textarea {
      min-height: 90px;
    }
  }
}

@media (max-width: 1024px) {
  .form {
    min-width: 210px;

    &__input,
    &__textarea {
      padding: 5px 8px;
    }
    &__textarea {
      min-height: 72px;
    }
  }
}
</style>

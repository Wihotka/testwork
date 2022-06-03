// Unique ID generator
import { v4 as uuidv4 } from 'uuid'

export const state = () => ({
  items: [
    {
      id: uuidv4(),
      title: 'Фотокамера',
      price: '10 000',
      description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
      link: 'https://www.zenit.photo/upload/iblock/092/fotoapparat_zenit_m_silver_zenitar_1_35_1.jpg'
    }
  ]
})

export const mutations = {
  ADD_ITEM (state, item) {
    state.items = [{
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      link: item.link
    }, ...state.items]
  },
  REMOVE_ITEM (state, item) {
    state.items.splice(state.items.indexOf(item), 1)
  },
  UPDATE_ITEMS (state, items) {
    state.items = items
  },
  SORT_NAME_ITEMS (state, items) {
    state.items = items.sort((a, b) => {
      if (a.title < b.title) { return -1 }
      if (a.title > b.title) { return 1 }
      return 0
    })
  },
  SORT_MIN_ITEMS (state, items) {
    state.items = items.sort((a, b) => {
      const priceA = Number(a.price.replace(/[^\dA-Z]/g, '').trim())
      const priceB = Number(b.price.replace(/[^\dA-Z]/g, '').trim())

      if (priceA < priceB) { return -1 }
      if (priceA > priceB) { return 1 }
      return 0
    })
  },
  SORT_MAX_ITEMS (state, items) {
    state.items = items.sort((a, b) => {
      const priceA = Number(a.price.replace(/[^\dA-Z]/g, '').trim())
      const priceB = Number(b.price.replace(/[^\dA-Z]/g, '').trim())

      if (priceA > priceB) { return -1 }
      if (priceA < priceB) { return 1 }
      return 0
    })
  }
}

export const actions = {
  FETCH_ITEMS ({ commit }) {
    const items = JSON.parse(sessionStorage.getItem('items'))

    if (items) {
      commit('UPDATE_ITEMS', items)
    }
  }
}

export const getters = {
  GET_ITEMS: state => state.items
}

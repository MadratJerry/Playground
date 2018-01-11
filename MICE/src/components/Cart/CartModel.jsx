class CartModel {
  add(item) {
    let cart = this.getAll()
    cart = cart === null ? [] : cart
    cart.push(item)
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  getAll() {
    return JSON.parse(localStorage.getItem('cart'))
  }

  remove(index) {
    localStorage.setItem(
      'cart',
      JSON.stringify(this.getAll().filter((e, i) => i !== index)),
    )
  }
}

export default new CartModel()

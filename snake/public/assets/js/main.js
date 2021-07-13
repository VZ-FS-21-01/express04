
const allItems = document.querySelectorAll('.item')

allItems.forEach(item => item.addEventListener('mouseover', (event) => {
    // console.log(event)
    event.target.style.background = 'red'
    setTimeout(() => {
        event.target.style.background = ''
    }, 500)
}))
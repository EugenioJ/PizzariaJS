let modalQt = 1;
let cart = [];
let modalKey = 0;
pizzaJson.map((item, index)=>{
    let pizza = document.querySelector('.models .pizza-item').cloneNode(true) ;
    pizza.setAttribute('data-key', index);
    pizza.querySelector('.pizza-item--name').innerHTML =  item.name;
    pizza.querySelector('.pizza-item--price').innerHTML = item.price;
    pizza.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizza.querySelector('.pizza-item--img img').src= item.img;
    pizza.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        modalQt = 1
       
        document.querySelector('.pizzaWindowArea').style.display = 'flex';
        let key = e.target.closest('.pizza-item').getAttribute('data-key')
        console.log(pizzaJson[key])
        modalKey = key;
        document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        document.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = 'R$' +pizzaJson[key].price*modalQt+ ''
        document.querySelector('.pizzaBig img').src = pizzaJson[key].img
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected')
        document.querySelectorAll('.pizzaInfo--size').forEach((sizes, sizeIndex)=>{
            if(sizeIndex == 2){
                sizes.classList.add('selected')
            }
            sizes.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]

        
        
        })
       
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;
    }

    
    
    );
    document.querySelector('.pizza-area').append( pizza)
    
    console.log(pizza)
})
function updateCart() {
    if(cart.length > 0){
        document.querySelector('aside').classList.add('show');
        document.querySelector('.cart').innerHTML = '';
        let subtotal = 0;
        let desconto = 0;
        let total = 0;
        
        for(let i in cart) {
            let pizzaItem = pizzaJson.find((item)=>item.name == cart[i].name);
            console.log(cart)
            let cartItem = document.querySelector('.models .cart--item').cloneNode(true);
            subtotal += pizzaItem.price * cart[i].qt
            desconto = subtotal*10/100
            total = subtotal-desconto
            console.log(subtotal, desconto, total)
            
            document.querySelector('.subtotal span:last-child').innerHTML =`R$`+ subtotal.toFixed(2)
            document.querySelector('.desconto span:last-child').innerHTML = 'R$'+desconto.toFixed(2)
            document.querySelector('.total span:last-child').innerHTML = 'R$'+total.toFixed(2)
            
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = `${cart[i].name}  (${cart[i].sizeT})`;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--;
                }else{
                    cart.splice(i, 1)
                    
                }
                updateCart();
                
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            })
       
            document.querySelector('.cart').append(cartItem);
        }

    }else {
        document.querySelector('aside').classList.remove('show')
    }

}
function FecharModal(){
    document.querySelector('.pizzaWindowArea').style.display = 'none';

}
document.querySelectorAll('.pizzaInfo--cancelButton', 'pizzaInfo--CancelMobileButton').forEach((item)=>{
    item.addEventListener('click', FecharModal);
})
document.querySelector('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++
    document.querySelector('.pizzaInfo--qt').innerHTML = modalQt
    document.querySelector('.pizzaInfo--actualPrice').innerHTML = 'R$' +Math.round(pizzaJson[modalKey].price*modalQt)+ ''

})

document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt == 1){
        FecharModal()
    } else
        modalQt--
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQt
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = 'R$' +pizzaJson[modalKey].price.toFixed(2)*modalQt+ ''

})
document.querySelectorAll('.pizzaInfo--size').forEach((sizes, sizeIndex)=>{

    sizes.addEventListener('click', (e)=>{
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        sizes.classList.add('selected')
    }) 
})
document.querySelector('.pizzaInfo--addButton').addEventListener('click', ()=>{
    //pizza
        console.log('Pizza: '+pizzaJson[modalKey].name)
    //tamanho da pizza
        let size = document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key');
        console.log('Tamanho: '+pizzaJson[modalKey].sizes[size])
    //quantidade de pizzas
        console.log('Quantide: '+modalQt)
        let identifier = pizzaJson[modalKey].name+'@'+pizzaJson[modalKey].sizes[size]
        
        let key = cart.findIndex((item)=>item.identifier == identifier)
        if(key > -1) {
            cart[key].qt += modalQt;
        } else{

        
        
        cart.push({
            identifier,
            name:pizzaJson[modalKey].name,
            sizeT:pizzaJson[modalKey].sizes[size],
            qt: modalQt,

        }
        )}
        updateCart()
        FecharModal()
        
    }

)
    
    



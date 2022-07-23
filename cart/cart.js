

var data = JSON.parse(localStorage.getItem("cartdetail"))
console.log(data)
dispcart(data)

function dispcart(data) {
    document.querySelector("tbody").innerHTML = "";
    data.forEach(function(el, index) {
        var tbody = document.querySelector("tbody")
        var tr = document.createElement("tr")
        var td1 = document.createElement("td")
        var div1 = document.createElement("div")
        div1.setAttribute("id", "pimage")
        td1.append(div1)
        var avtar = document.createElement("img")
        avtar.setAttribute('src', el.image)
        var div2 = document.createElement("div")
        div2.setAttribute("id", "image")
        div2.append(avtar)
        var div3 = document.createElement("div")
        div3.setAttribute("id", "para")
        div1.append(div2, div3)
        var p = document.createElement("p")
        p.innerText = el.name
        var btn0 = document.createElement("button")
        btn0.innerText = "X Remove"
        btn0.addEventListener('click', function() {
            deleteProduct(el, index)
            total();
        })
        div3.append(p, btn0)
        var td2 = document.createElement("td")
        td2.innerText = el.price
        var td3 = document.createElement("td")

        var btn1 = document.createElement("button")
        btn1.innerText = "-"
        var span = document.createElement("span")
        span.innerText = "1"
        var btn3 = document.createElement("button")
        btn3.innerText = "+"
        td3.setAttribute("id", "btn")
        td3.append(btn1, span, btn3)
        var td4 = document.createElement("td")
        td4.innerText = el.price;
        tr.append(td1, td2, td3, td4)
        tbody.append(tr)
            // console.log(el.name)
        btn3.addEventListener('click', function() {
            let acutal = el.price;
            productQuantityPlus(span, td4, acutal)
        })
        btn1.addEventListener('click', function() {
            let acutal = el.price;
            productQuantityMinus(span, td4, acutal)
        })
    })
}
// increase Product quantity 
// let dataArray=[];
// let latestArray=[];
function productQuantityPlus(span, price, acutalPrice) {
    //   latestArray=dataArray;
    //   dataArray=[];
    let count = +span.innerText;
    let acutalData = +acutalPrice;
    count++;
    span.innerText = count;
    let prices = count * acutalData;
    price.innerText = prices;
    //   dataArray.push(prices);
    total();
}

// decrease product quantity 
function productQuantityMinus(span, price, acutalPrice) {
    let currentPrice = +price.innerText;
    let acutalData = +acutalPrice;
    let count = +span.innerText;
    if (count == 1) {
        count = 1;
        span.innerText = count;
    } else {
        count--;
    }
    span.innerText = count;

    if (currentPrice == acutalData) {
        price.innerText = acutalData;
    } else {
        price.innerText = currentPrice - acutalData;
    }
    total();
    console.log(count)
}

function total() {
    let totalData = document.querySelectorAll('tbody td:last-child');
    let totalPrice = 0;
    let priceTag = document.getElementById('subtotal')
    let priceTag1 = document.getElementById('grandtotal')
    totalData.forEach(function(el) {
        let data = +el.innerText
        console.log(el.innerText);
        totalPrice += data;
        priceTag.innerText = totalPrice;
        priceTag1.innerText = totalPrice
        // console.log(totalPrice);
        localStorage.setItem("pay" , totalPrice) ;
    })
}

// delete Product Page 
function deleteProduct(el, index) {
    data.splice(index, 1);
    localStorage.setItem('cartdetail', JSON.stringify(data));
    dispcart(data)
        //   document.getElementById('productLength').innerText=mencart.length;
}

//function for gtotal
function gtotal() {
    let total = document.querySelector("#subtotal").innerText
    document.querySelector("#grandtotal").innerText = total
}

document.querySelector("#code").addEventListener("click", promoCode)


//function for proceed to checkout
document.querySelector("#btn2").addEventListener("click", function() {
    let total = document.querySelector("#grandtotal").innerText

    let user = localStorage.getItem("permision");
    console.log(user);
    if (user == "allow") {
        if (data.length == 0) {
            alert("Your cart is empty")
        } else {
            localStorage.setItem("total", (total))
            // window.location.href = "/Payment Page/address.html"
        }
    } else {
        alert("Please login first")
        // window.location.href = ""
    }

})

//function for promocode
function promoCode() {
    event.preventDefault()
    let pcode = document.querySelector("#promo").value
    if (pcode == "masai30") {
        let total = +document.querySelector("#subtotal").innerText
        let subtotal = +document.querySelector("#grandtotal").innerText
        if (total == subtotal) {
            let dis = (total * 70) / 100
            document.querySelector("#grandtotal").innerText = dis ;
            alert('Promo code applied successfully');
        } else {
            alert("Promo code is already applied")
        }
    } else {
        gtotal()
        alert("Promo code is not valid")
    }
}
dispcart(data)
total();


